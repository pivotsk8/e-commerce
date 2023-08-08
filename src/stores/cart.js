import { ref, computed, watchEffect } from 'vue';
import { defineStore } from 'pinia';
import { collection, addDoc, runTransaction, doc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import { useCouponStore } from './coupons';
import { getCurrentDate } from '../helpers';

export const useCartStore = defineStore('cartStore', () => {
  const coupon = useCouponStore();
  const db = useFirestore();

  const items = ref([]);
  const subTotal = ref(0);
  const taxe = ref(0);
  const total = ref(0);

  const MAX_PRODUCTS = 5;
  const TAX_RATE = 0.19;

  watchEffect(() => {
    subTotal.value = items.value.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );

    taxe.value = Number((subTotal.value * TAX_RATE).toFixed(2));
    total.value = subTotal.value + taxe.value - coupon.discount;
  });

  function addItem(item) {
    const index = isItemInCart(item.id);
    index >= 0
      ? isProductAvailable(item, index)
        ? alert('Haz alcanzado el limite')
        : items.value[index].quantity++
      : items.value.push({ ...item, quantity: 1, id: item.id });
  }

  function updateQuantity(id, quantity) {
    items.value = items.value.map((item) =>
      item.id === id ? { ...item, quantity } : item,
    );
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id);
  }

  async function checkOut() {
    try {
      await addDoc(collection(db, 'sales'), {
        items: items.value.map((item) => {
          const { availability, category, ...data } = item;
          return data;
        }),
        subtotal: subTotal.value,
        taxes: taxe.value,
        discounts: coupon.discount,
        total: total.value,
        date: getCurrentDate(),
      });

      //Sustraer la cantidad de lo disponible
      items.value.forEach(async (item) => {
        const productRef = doc(db, 'products', item.id);

        await runTransaction(db, async (transaction) => {
          const currentProduct = await transaction.get(productRef);
          const availability =
            currentProduct.data().availability - item.quantity;
          transaction.update(productRef, { availability });
        });
      });

      //reset state
      $reset();
      coupon.$reset();
    } catch (error) {
      console.log(error);
    }
  }

  function $reset() {
    //reiniciar  el state
    (items.value = []),
      (subTotal.value = 0),
      (taxe.value = 0),
      (total.value = 0);
  }

  const isItemInCart = (id) => items.value.findIndex((item) => item.id === id);

  const isProductAvailable = (item, index) => {
    return (
      items.value[index].quantity >= item.availability ||
      items.value[index].quantity >= MAX_PRODUCTS
    );
  };

  const isEmpty = computed(() => items.value.length === 0);

  const checkProductAvailability = computed(() => {
    return (product) =>
      product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS;
  });

  return {
    items,
    subTotal,
    taxe,
    total,
    addItem,
    updateQuantity,
    removeItem,
    checkOut,
    isEmpty,
    checkProductAvailability,
  };
});
