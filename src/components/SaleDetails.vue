<script setup>
  import Amount from '@/components/Amount.vue';
  import { formatCurrency } from '../helpers';
  defineProps({
    sale: {
      type: Object,
    },
  });
</script>

<template>
  <div class="border-t border-gray-200 space-y-6 py-6">
    <h2 class="text-2xl font-black">Detalles Venta:</h2>

    <p class="text-xl font-black text-gray-500">Productos Venta</p>
    <ul
      class="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500">
      <li v-for="item in sale.items" :key="item.id" class="flex space-x-6 py-6">
        <img
          :src="item.image"
          :alt="item.name"
          class="h-24 w-24 flex-none rounded-lg" />

        <div class="felx-auto space-y-2">
          <h3 class="text-gray-900">{{ item.name }}</h3>
          <p>{{ formatCurrency(item.price) }}</p>
          <p>Cantidad: {{ item.quantity }}</p>
        </div>
      </li>
    </ul>

    <dl
      class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
      <Amount>
        <template #label>Subtotal:</template>
        {{ formatCurrency(sale.subtotal) }}
      </Amount>
      <Amount>
        <template #label>Impuestos:</template>
        {{ formatCurrency(sale.taxes) }}
      </Amount>
      <Amount v-if="sale.discounts" class="bg-green-200 p-2">
        <template #label>Descuanto:</template>
        {{ formatCurrency(sale.discounts) }}
      </Amount>
      <Amount>
        <template #label>Total Pagado:</template>
        {{ formatCurrency(sale.total) }}
      </Amount>
    </dl>
  </div>
</template>
