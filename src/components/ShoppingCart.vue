<script setup>
  import Amount from './Amount.vue';
  import ShoppingCartItem from './ShoppingCartItem.vue';
  import CouponForm from './CouponForm.vue';
  import { useCartStore } from '../stores/cart';
  import { useCouponStore } from '../stores/coupons';
  import { formatCurrency } from '../helpers';

  const cart = useCartStore();
  const coupon = useCouponStore();
</script>

<template>
  <p v-if="cart.isEmpty" class="text-xl text-center text-gry-900">
    El Carrito esta vacio
  </p>

  <div v-else>
    <p class="text-4xl font-bold text-gray-900">Resumen de Ventas</p>
    <ul rol="list" class="mt-6 divide-y divide-gray-200">
      <ShoppingCartItem
        v-for="item in cart.items"
        :key="item.id"
        :item="item" />
    </ul>

    <dl
      class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
      <Amount>
        <template #label>Subtotal:</template>
        {{ formatCurrency(cart.subTotal) }}
      </Amount>
      <Amount>
        <template #label>Impuestos:</template>
        {{ formatCurrency(cart.taxe) }}
      </Amount>
      <Amount v-if="coupon.isValidCoupon">
        <template #label>Descuanto:</template>
        {{ formatCurrency(coupon.discount) }}
      </Amount>
      <Amount>
        <template #label>Total a pagar:</template>
        {{ formatCurrency(cart.total) }}
      </Amount>
    </dl>

    <CouponForm />

    <button
      type="button"
      class="w-full bg-indigo-600 mt-10 hover:bg-indigo-700 text-white uppercase font-bold p-3"
      @click="cart.checkOut">
      Confirmar Compra
    </button>
  </div>
</template>
