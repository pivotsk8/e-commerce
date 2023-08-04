<script setup>
  import { useCouponStore } from '../stores/coupons';
  const store = useCouponStore();
</script>

<template>
  <p class="mt-5 py-5 font-bold boder-t border-gray-200">Agrega tu Cupon</p>

  <div class="flex">
    <input
      type="text"
      placeholder="Ingresa tu cupon"
      class="p-2 bg-white border-gray-300 w-full uppercase"
      v-model="store.couponInput" />

    <button class="bg-green-400 font-bold p-3" @click="store.applyCoupon">
      Aplicar
    </button>
  </div>

  <p class="spy-2 text-center text-sm font-extrabold">
    {{ store.couponValidationMessage }}
  </p>
</template>
