<script setup>
  import VueTailWindDatePicker from 'vue-tailwind-datepicker';
</script>

<template>
  <h1 class="text-4xl font-black my-10">Resumen de Ventas</h1>

  <div class="md:flex md:items-start gap-5">
    <div class="md:w-1/2 lg:w-1/3 bg-white flex justify-center">
      <VueTailWindDatePicker />
    </div>
    <div class="md:w-1/2 lg:w-2/3 pace-y-5 lg:overflow-y-scroll p-5 pb-32">
      <p>Ventas aqui</p>
    </div>
  </div>
</template>
