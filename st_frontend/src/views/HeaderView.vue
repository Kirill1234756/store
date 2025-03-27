<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Логотип -->
      <div class="flex items-center">
        <img src="" alt="Логотип магазина" class="h-10" />
        <span class="ml-2 text-xl font-bold text-gray-800">iRefurb</span>
      </div>

      <!-- Навигация -->
      <nav class="hidden md:flex space-x-8">
        <a href="/" class="text-gray-700 hover:text-blue-500">Главная</a>
        <a href="/catalog" class="text-gray-700 hover:text-blue-500">Каталог</a>
        <a href="/about" class="text-gray-700 hover:text-blue-500">О нас</a>
        <a href="/guarantee" class="text-gray-700 hover:text-blue-500">Гарантия</a>
      </nav>

      <!-- Поиск и корзина -->
      <div class="flex items-center space-x-6">
        <!-- Поиск -->
        <div class="relative">
          <input
            type="text"
            placeholder="Поиск..."
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            class="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>

        <!-- Корзина -->
        <div class="relative">
          <button @click="toggleCart" class="text-gray-700 hover:text-blue-500">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <span
              v-if="cartItemsCount > 0"
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5"
            >
              {{ cartItemsCount }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Header',
  setup() {
    const cartItemsCount = ref(3) // Пример количества товаров в корзине
    const toggleCart = () => {
      // Логика открытия/закрытия корзины
      console.log('Корзина открыта')
    }

    return {
      cartItemsCount,
      toggleCart,
    }
  },
})
</script>

