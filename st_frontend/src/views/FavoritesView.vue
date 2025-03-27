<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-8">Избранное</h1>

    <div v-if="loading" class="flex justify-center py-12">
      <Spinner />
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-12">
      {{ error }}
    </div>

    <div v-else-if="favorites.length === 0" class="text-center py-12">
      <p class="text-gray-500 mb-4">В избранном пока ничего нет</p>
      <RouterLink 
        to="/" 
        class="text-blue-600 hover:underline"
      >
        Вернуться к товарам
      </RouterLink>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard 
        v-for="product in favorites" 
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'
import ProductCard from '@/components/products/ProductCard.vue'
import Spinner from '@/components/ui/Spinner.vue'

const favoritesStore = useFavoritesStore()
const loading = ref(false)
const error = ref<string | null>(null)

const favorites = computed(() => favoritesStore.favorites)

onMounted(async () => {
  try {
    loading.value = true
    await favoritesStore.loadFavorites()
  } catch (err) {
    error.value = 'Ошибка загрузки избранного'
  } finally {
    loading.value = false
  }
})
</script>