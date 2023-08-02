import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire';
import {
  collection,
  addDoc,
  where,
  query,
  limit,
  orderBy,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';
import { ref as storageRef, deleteObject } from 'firebase/storage';

export const useProductsStore = defineStore('products', () => {
  const db = useFirestore();
  const storage = useFirebaseStorage();

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

  async function updateProduct(docRef, product) {
    const { image, url, ...values } = product;

    image.length
      ? await updateDoc(docRef, { ...values, image: url.value })
      : await updateDoc(docRef, values);
  }

  async function deleteProduct(id) {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    //borrar imagen
    const { image } = docSnap.data();
    const imageRef = storageRef(storage, image);

    confirm('¿Eliminar Producto?')
      ? await Promise.all[(deleteDoc(docRef), deleteObject(imageRef))]
      : null;
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

  const noResults = computed(() => productsCollection.value.length === 0);

  const filteredProducts = computed(() => {
    return productsCollection.value;
  });

  return {
    noResults,
    updateProduct,
    deleteProduct,
    productsCollection,
    createProduct,
    categoriesOptions,
    filteredProducts,
  };
});
