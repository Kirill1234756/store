<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
      <div class="grid md:grid-cols-2 gap-8 p-6">
        <!-- Изображения -->
        <div class="space-y-4">
          <img 
            :src="product.main_image" 
            :alt="product.title"
            class="w-full rounded-lg border"
          >
          <div class="grid grid-cols-3 gap-2" v-if="product.images?.length">
            <img 
              v-for="(img, index) in product.images" 
              :key="index"
              :src="img"
              class="h-24 object-cover rounded cursor-pointer border"
              @click="currentImage = img"
            >
          </div>
        </div>

        <!-- Информация -->
        <div>
          <div class="flex justify-between items-start">
            <h2 class="text-2xl font-bold">{{ product.title }}</h2>
            <button 
              @click="toggleFavorite"
              class="text-3xl"
              :class="isFavorite ? 'text-red-500' : 'text-gray-300'"
            >
              ♥
            </button>
          </div>

          <p class="text-xl font-semibold my-4">{{ product.price }} ₽</p>

          <div class="space-y-4">
            <div>
              <h3 class="font-medium text-gray-900">Описание</h3>
              <p class="text-gray-600">{{ product.description }}</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <h3 class="font-medium text-gray-900">Состояние</h3>
                <p>{{ product.condition_display }}</p>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Память</h3>
                <p>{{ product.storage }}</p>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Цвет</h3>
                <p>{{ product.color }}</p>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Аккумулятор</h3>
                <p>{{ product.battery_health }}%</p>
              </div>
            </div>

            <button 
              class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              @click="contactSeller"
            >
              Связаться с продавцом
            </button>
          </div>
        </div>
      </div>
      <button 
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites.store'  // Исправленный путь
import type { Product } from '@/types'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits(['close'])

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