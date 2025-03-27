<template>
  <nav class="bg-white shadow-sm">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <RouterLink to="/" class="text-xl font-bold text-blue-600">
        iRefurb
      </RouterLink>
      
      <div class="flex items-center space-x-4">
        <RouterLink 
          to="/favorites" 
          class="flex items-center text-gray-700 hover:text-blue-600"
        >
          <span class="text-red-500 mr-1">♥</span>
          Избранное
        </RouterLink>
        
        <template v-if="isAuthenticated">
          <RouterLink 
            to="/profile" 
            class="flex items-center text-gray-700 hover:text-blue-600"
          >
            Профиль
          </RouterLink>
          <button 
            @click="logout"
            class="text-gray-700 hover:text-blue-600"
          >
            Выйти
          </button>
        </template>
        <template v-else>
          <RouterLink 
            to="/auth?type=login" 
            class="text-gray-700 hover:text-blue-600"
          >
            Войти
          </RouterLink>
          <RouterLink 
            to="/auth?type=register" 
            class="text-gray-700 hover:text-blue-600"
          >
            Регистрация
          </RouterLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isAuthenticated = computed(() => authStore.isAuthenticated)

const logout = async () => {
  await authStore.logout()
  router.push('/')
}
</script>