import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useFirestore, useCollection } from 'vuefire';
import {
  collection,
  addDoc,
  where,
  query,
  limit,
  orderBy,
} from 'firebase/firestore';

export const useProductsStore = defineStore('products', () => {
  const db = useFirestore();

  const categories = [
    { id: 1, name: 'Sudaderas' },
    { id: 2, name: 'Tenis' },
    { id: 3, name: 'Lentes' },
  ];

  const q = query(collection(db, 'products'));
  const productsCollection = useCollection(q);

  async function createProduct(product) {
    await addDoc(collection(db, 'products'), product);
  }

  const categoriesOptions = computed(() => {
    const options = [
      { label: 'Selecciona', value: '', attrs: { disabled: true } },
      ...categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
      ,
    ];
    return options;
  });

  return {
    productsCollection,
    createProduct,
    categoriesOptions,
  };
});
