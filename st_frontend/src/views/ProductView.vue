<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="flex justify-center py-12">
      <Spinner />
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-12">
      {{ error }}
    </div>

    <template v-else-if="product">
      <ProductModal 
        :product="product"
        @close="$router.push('/')"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import useProducts from '@/composables/useProducts'
import ProductModal from '@/components/products/ProductModal.vue'
import Spinner from '@/components/ui/Spinner.vue'

const route = useRoute()
const { product, loading, error, fetchProduct } = useProducts()

watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      await fetchProduct(Number(newId))
    }
  },
  { immediate: true }
)
</script>