<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <h1 class="text-2xl font-bold mb-8">Профиль пользователя</h1>
    
    <div v-if="loading" class="flex justify-center py-12">
      <AppSpinner />
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-12">
      {{ error }}
    </div>

    <div v-else class="bg-white rounded-lg shadow p-6">
      <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/3">
          <div class="bg-gray-100 rounded-lg h-48 w-full flex items-center justify-center">
            <span class="text-gray-400">Аватар</span>
          </div>
        </div>
        
        <div class="md:w-2/3 space-y-4">
          <div>
            <h2 class="text-xl font-semibold">{{ user.username }}</h2>
            <p class="text-gray-600">{{ user.email }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 class="font-medium text-gray-900">Телефон</h3>
              <p>{{ user.phone || 'Не указан' }}</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-900">Дата регистрации</h3>
              <p>{{ formatDate(user.date_joined) }}</p>
            </div>
          </div>

          <button 
            @click="logout"
            class="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'
import AppSpinner from '@/components/ui/AppSpinner.vue'

const authStore = useAuthStore()
const router = useRouter()

const user = ref({
  username: '',
  email: '',
  phone: '',
  date_joined: ''
})
const loading = ref(true)
const error = ref<string | null>(null)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const logout = async () => {
  await authStore.logout()
  router.push('/')
}

onMounted(async () => {
  try {
    loading.value = true
    await authStore.fetchUser()
    user.value = {
      username: authStore.user?.username || '',
      email: authStore.user?.email || '',
      phone: authStore.user?.phone || '',
      date_joined: authStore.user?.date_joined || ''
    }
  } catch (err) {
    error.value = 'Ошибка загрузки профиля'
  } finally {
    loading.value = false
  }
})
</script>