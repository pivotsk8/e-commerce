<script setup>
  import useImage from '../../composobles/useImage';
  import Link from '@/components/Link.vue';

  const { onFileChange, url, isImageUploaded } = useImage();
</script>

<template>
  <div>
    <Link to="products">Volver</Link>

    <h1 class="text-4xl font-black my-10">Nuevo Producto</h1>

    <div class="flex justify-center bg-white shadow">
      <div class="mt-10 p-10 w-full 2xl:w-2/4">
        <FormKit
          type="form"
          submit-label="Agregar Producto"
          incomplete-message="Verifica que todos los campos esten llenos">
          <FormKit
            type="text"
            label="Nombre"
            name="name"
            placeholder="Nombre de Producto"
            validation="required"
            :validation-messages="{
              required: 'El Nombre del Producto es Obligatorio',
            }" />

          <FormKit
            type="file"
            label="Imagen Producto"
            name="image"
            validation="required"
            :validation-messages="{
              required: 'La Imagen del Producto es Obligatorio',
            }"
            accept=".jpg"
            multiple="true"
            @change="onFileChange" />

          <div v-if="isImageUploaded">
            <p class="font-black">Imagen Producto:</p>
            <img :src="url" alt="image not found" class="w-32" />
          </div>

          <FormKit
            type="select"
            label="Categoria"
            name="category"
            validation="required"
            :validation-messages="{
              required: 'La Categoria es Obligatorio',
            }"
            :options="[1, 2, 3]" />

          <FormKit
            type="number"
            label="Precio"
            name="price"
            placeholder="Precio de Producto"
            validation="required"
            :validation-messages="{
              required: 'El Precio del Producto es Obligatorio',
            }"
            min="1" />

          <FormKit
            type="number"
            label="Disponible"
            name="availability"
            placeholder="Cantidad Diponible"
            validation="required"
            :validation-messages="{
              required: 'La Cantidad es Obligatoria',
            }"
            min="1" />
        </FormKit>
      </div>
    </div>
  </div>
</template>
