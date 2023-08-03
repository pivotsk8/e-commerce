import { ref, computed, watchEffect } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStore', () => {
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

    taxe.value = subTotal.value * TAX_RATE;
    total.value = subTotal.value + taxe.value;
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
    isEmpty,
    checkProductAvailability,
  };
});
