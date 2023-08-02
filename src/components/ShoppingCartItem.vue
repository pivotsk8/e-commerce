<script setup>
  import { formatCurrency } from '../helpers';
  defineProps({
    item: {
      type: Object,
    },
  });
</script>

<template>
  <li class="flex space-x-6 py-6">
    <img
      class="h-24 w-24 flex-none rounded-md"
      :src="item.image"
      :alt="item.name" />

    <div class="flex-auto space-y-2">
      <h3 class="text-gary-900">{{ item.name }}</h3>
      <p>{{ formatCurrency(item.price) }}</p>
    </div>
  </li>
</template>
