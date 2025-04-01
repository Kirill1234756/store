<template>
  <div>
    <!-- Сетка товаров -->
    <div 
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      v-if="products.length > 0"
    >
      <!-- <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        class="hover:shadow-lg transition-shadow duration-300"
      /> -->
    </div>

    <!-- Сообщение при отсутствии товаров -->
    <div 
      v-else
      class="text-center py-12 text-gray-500"
    >
      Товары не найдены. Попробуйте изменить параметры поиска.
    </div>

    <!-- Кнопка "Показать еще" -->
    <div class="mt-8 text-center" v-if="hasMore && products.length > 0">
      <AppButton
        @click="$emit('load-more')"
        :loading="loading"
        class="w-full sm:w-auto"
      >
        Показать еще
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
// import ProductCard from '@/components/products/ProductCard.vue'
import AppButton from '@/components/ui/AppButton.vue'

defineProps({
  products: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  hasMore: {
    type: Boolean,
    default: true
  }
})
</script>