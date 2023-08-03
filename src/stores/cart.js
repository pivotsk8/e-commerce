import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStore', () => {
  const items = ref([]);
  const subTotal = ref(0);
  const taxe = ref(0);

  const MAX_PRODUCTS = 5;
  const TAX_RATE = 0.19;

  watch(
    items,
    () => {
      subTotal.value = items.value.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
      );

      taxe.value = subTotal.value * TAX_RATE;
    },
    { deep: true },
  );

  function addItem(item) {
    items.value.push({ ...item, quantity: 1, id: item.id });
  }

  function updateQuantity(id, quantity) {
    items.value = items.value.map((item) =>
      item.id === id ? { ...item, quantity } : item,
    );
  }

  const isEmpty = computed(() => items.value.length === 0);

  const checkProductAvailability = computed(() => {
    return (product) =>
      product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS;
  });
  return {
    items,
    subTotal,
    taxe,
    addItem,
    updateQuantity,
    isEmpty,
    checkProductAvailability,
  };
});
