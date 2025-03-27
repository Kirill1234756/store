<template>
  <div class="container mx-auto px-4 py-8">
    <ProductFilters @update-filters="handleFilterUpdate" />
    
    <div v-if="loading" class="flex justify-center py-12">
      <AppSpinner />
    </div>
    
    <div v-else-if="error" class="text-red-500 text-center py-12">
      {{ error }}
    </div>
    
    <template v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @open="openProduct(product.id)"
        />
      </div>
      
      <ProductModal
        v-if="selectedProduct"
        :product="selectedProduct"
        @close="selectedProduct = null"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import useProducts from '@/composables/useProducts'
import useFilters from '@/composables/useFilters'
import ProductFilters from '@/components/products/ProductFilters.vue'
import ProductCard from '@/components/products/ProductCard.vue'
import ProductModal from '@/components/products/ProductModal.vue'
import AppSpinner from '@/components/ui/AppSpinner.vue'
import type { Product } from '@/types'

const { products, loading, error, fetchProducts, fetchProduct } = useProducts()
const { filters, updateFilters } = useFilters()
const selectedProduct = ref<Product | null>(null)

// Добавляем проверку на массив и опциональную цепочку
const filteredProducts = computed(() => {
  return Array.isArray(products.value) 
    ? products.value.filter(product => 
        product?.title?.toLowerCase().includes(filters.search?.toLowerCase() || ''))
    : []
})

const handleFilterUpdate = (newFilters: any) => {
  updateFilters(newFilters)
  fetchProducts(newFilters)
}

const openProduct = async (id: number) => {
  const product = await fetchProduct(id)
  if (product) {
    selectedProduct.value = product
  }
}

onMounted(() => {
  fetchProducts(filters)
})
</script>