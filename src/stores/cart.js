import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStore', () => {
  const items = ref([]);

  function addItem(item) {
    items.value.push(item);
  }

  const isEmpty = computed(() => items.value.length === 0);
  return {
    items,
    addItem,
    isEmpty,
  };
});
