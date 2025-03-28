<template>
  <div class="product-card">
    <img :src="product.main_image || '/placeholder-product.jpg'" :alt="product.title">
    <h3>{{ product.title }}</h3>
    <p>{{ formattedPrice }} ₽</p>
    <button 
      @click="toggleFavorite"
      :class="['favorite-btn', { 'active': isFavorite }]"
      :disabled="loading"
    >
      <HeartIcon v-if="isFavorite" class="h-5 w-5 text-red-500" />
      <HeartOutlineIcon v-else class="h-5 w-5 text-gray-500" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { HeartIcon, HeartOutlineIcon } from '@heroicons/vue/24/outline'
import { useFavoritesStore } from '@/stores/favorites.store'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const favoritesStore = useFavoritesStore()
const authStore = useAuthStore()
const loading = ref(false)

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('ru-RU').format(props.product.price)
})

const isFavorite = computed(() => {
  return favoritesStore.isFavorite(props.product.id)
})

const toggleFavorite = async () => {
  if (!authStore.isAuthenticated) {
    router.push('/auth?type=login')
    return
  }

  try {
    loading.value = true
    await favoritesStore.toggleFavorite(props.product.id)
  } catch (error) {
    console.error('Error toggling favorite:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.favorite-btn {
  @apply p-2 rounded-full hover:bg-gray-100 transition-colors;
}
.favorite-btn.active {
  @apply text-red-500;
}
.favorite-btn:disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>