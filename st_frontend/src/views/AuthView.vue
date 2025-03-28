<template>
  <div class="container mx-auto px-4 py-12 max-w-md">
    <div class="bg-white rounded-lg shadow-md p-8">
      <h1 class="text-2xl font-bold mb-6 text-center">
        {{ isLogin ? 'Вход' : 'Регистрация' }}
      </h1>

      <form @submit.prevent="submitForm">
        <div class="space-y-4">
          <AppInput 
            v-model="form.username" 
            label="Имя пользователя" 
            required
            :error="errors.username"
          />

          <AppInput 
            v-if="!isLogin" 
            v-model="form.email" 
            type="email" 
            label="Email" 
            required
            :error="errors.email"
            @blur="validateEmail"
          />

          <AppInput 
            v-model="form.password" 
            :type="showPassword ? 'text' : 'password'" 
            label="Пароль" 
            required
            :error="errors.password"
          >
            <template #suffix>
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="text-gray-500 hover:text-gray-700"
              >
                <EyeIcon v-if="showPassword" class="h-5 w-5" />
                <EyeSlashIcon v-else class="h-5 w-5" />
              </button>
            </template>
          </AppInput>

          <AppInput 
            v-if="!isLogin" 
            v-model="form.passwordConfirm" 
            :type="showPassword ? 'text' : 'password'" 
            label="Подтверждение пароля" 
            required
            :error="errors.passwordConfirm"
          />

          <PasswordStrengthMeter 
            v-if="!isLogin" 
            :password="form.password" 
            class="mb-2"
          />

          <div v-if="error" class="text-red-500 text-sm">
            {{ error }}
          </div>

          <AppButton 
            type="submit" 
            class="w-full" 
            :loading="loading"
            :disabled="!isFormValid"
          >
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
import { ref, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import PasswordStrengthMeter from '@/components/auth/PasswordStrengthMeter.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  username: '',
  email: '',
  password: '',
  passwordConfirm: ''
})

const errors = reactive({
  username: '',
  email: '',
  password: '',
  passwordConfirm: ''
})

const loading = ref(false)
const error = ref<string | null>(null)
const showPassword = ref(false)

const isLogin = computed(() => route.query.type === 'login')

// Валидация email
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email) {
    errors.email = 'Email обязателен'
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Введите корректный email'
  } else {
    errors.email = ''
  }
}

// Валидация пароля
const validatePassword = () => {
  if (!form.password) {
    errors.password = 'Пароль обязателен'
  } else if (form.password.length < 8) {
    errors.password = 'Пароль должен содержать минимум 8 символов'
  } else {
    errors.password = ''
  }
}

// Проверка совпадения паролей
const validatePasswordConfirm = () => {
  if (form.password !== form.passwordConfirm) {
    errors.passwordConfirm = 'Пароли не совпадают'
  } else {
    errors.passwordConfirm = ''
  }
}

// Проверка валидности всей формы
const isFormValid = computed(() => {
  if (isLogin.value) {
    return form.username && form.password && !errors.username && !errors.password
  } else {
    return (
      form.username && 
      form.email && 
      form.password && 
      form.passwordConfirm &&
      !errors.username &&
      !errors.email &&
      !errors.password &&
      !errors.passwordConfirm &&
      form.password === form.passwordConfirm
    )
  }
})

const toggleMode = () => {
  router.push({
    path: '/auth',
    query: { type: isLogin.value ? 'register' : 'login' },
  })
}

const submitForm = async () => {
  // Валидация перед отправкой
  validateEmail()
  validatePassword()
  if (!isLogin.value) {
    validatePasswordConfirm()
  }

  if (!isFormValid.value) return

  try {
    loading.value = true
    error.value = null

    if (isLogin.value) {
      await authStore.login({
        username: form.username,
        password: form.password,
      })
    } else {
      await authStore.register(form)
    }

    const redirect = route.query.redirect
    router.push(redirect ? String(redirect) : '/')
  } catch (err) {
    error.value = isLogin.value 
      ? 'Неверные имя пользователя или пароль' 
      : 'Ошибка регистрации'
  } finally {
    loading.value = false
  }
}
</script>