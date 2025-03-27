<template>
  <div class="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
    <img 
      :src="product.main_image" 
      :alt="product.title"
      class="w-full h-48 object-cover cursor-pointer"
      @click="openModal"
    >
    <div class="p-4">
      <div class="flex justify-between items-start">
        <h3 class="font-bold text-lg">{{ product.title }}</h3>
        <button 
          @click.stop="toggleFavorite"
          class="text-2xl transition-colors duration-200"
          :class="isFavorite ? 'text-red-500' : 'text-gray-300 hover:text-red-400'"
          aria-label="Добавить в избранное"
        >
          ♥
        </button>
      </div>
      <p class="text-gray-600 mt-2">{{ product.price }} ₽</p>
      <div class="flex items-center mt-3 text-sm text-gray-500">
        <span>{{ product.condition_display }}</span>
        <span class="mx-2">•</span>
        <span>{{ product.storage }}</span>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue' // Добавьте этот импорт
import { useFavoritesStore } from '@/stores/favorites.store'  // Исправленный путь
import type { Product } from '@/types'

const props = defineProps<{
  product: Product
}>()

const favoritesStore = useFavoritesStore()

const isFavorite = computed(() => 
  favoritesStore.isFavorite(props.product.id)
)

const toggleFavorite = async () => {
  if (isFavorite.value) {
    await favoritesStore.removeFavorite(props.product.id)
  } else {
    await favoritesStore.addFavorite(props.product)
  }
}
</script>

<!-- <script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'
import type { Product } from '@/types'

const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const favoritesStore = useFavoritesStore()

const isFavorite = computed(() => 
  favoritesStore.favorites.some(fav => fav.id === props.product.id)
)

const toggleFavorite = () => {
  if (isFavorite.value) {
    favoritesStore.removeFavorite(props.product.id)
  } else {
    favoritesStore.addFavorite(props.product)
  }
}

const openModal = () => {
  router.push(`/products/${props.product.id}`)
}
</script> -->