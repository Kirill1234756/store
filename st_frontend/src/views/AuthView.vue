<template>
  <div class="container mx-auto px-4 py-12 max-w-md">
    <div class="bg-white rounded-lg shadow-md p-8">
      <h1 class="text-2xl font-bold mb-6 text-center">
        {{ isLogin ? 'Вход' : 'Регистрация' }}
      </h1>

      <form @submit.prevent="submitForm">
        <div class="space-y-4">
          <AppInput v-model="form.username" label="Имя пользователя" required />

          <AppInput v-if="!isLogin" v-model="form.email" type="email" label="Email" required />

          <AppInput v-model="form.password" type="password" label="Пароль" required />

          <div v-if="error" class="text-red-500 text-sm">
            {{ error }}
          </div>

          <AppButton type="submit" class="w-full" :loading="loading">
            {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
          </AppButton>
        </div>
      </form>

      <div class="mt-6 text-center">
        <button @click="toggleMode" class="text-blue-600 hover:underline">
          {{ isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  username: '',
  email: '',
  password: '',
})

const loading = ref(false)
const error = ref<string | null>(null)

const isLogin = computed(() => route.query.type === 'login')

const toggleMode = () => {
  router.push({
    path: '/auth',
    query: { type: isLogin.value ? 'register' : 'login' },
  })
}

const submitForm = async () => {
  try {
    loading.value = true
    error.value = null

    if (isLogin.value) {
      await authStore.login({
        username: form.value.username,
        password: form.value.password,
      })
    } else {
      await authStore.register(form.value)
    }

    const redirect = route.query.redirect
    router.push(redirect ? String(redirect) : '/')
  } catch (err) {
    error.value = isLogin.value ? 'Неверные имя пользователя или пароль' : 'Ошибка регистрации'
  } finally {
    loading.value = false
  }
}
</script>