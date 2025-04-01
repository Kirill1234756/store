import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useToastStore } from '@/stores/toast.store' // Добавляем импорт
import './assets/main.css' // Подключение Tailwind CSS
// import './assets/color.scss'

// Инициализация API
import api from '@/utils/api'
import { useAuthStore } from '@/stores/auth.store'

// Инициализация приложения
const app = createApp(App)

// Подключаем Pinia для управления состоянием
const pinia = createPinia()
app.use(pinia)

// Подключаем роутер
app.use(router)

// Устанавливаем глобальные обработчики ошибок
app.config.errorHandler = (err) => {
    console.error('Global error:', err)
    const toastStore = useToastStore()
    toastStore.show('Произошла ошибка', 'error')
}

// Функция инициализации приложения
const initApp = async () => {
    // Восстанавливаем токен из localStorage
    const token = localStorage.getItem('token')

    if (token) {
        try {
            // Устанавливаем токен в axios
            api.defaults.headers.common['Authorization'] = `Token ${token}`

            // Загружаем данные пользователя
            const authStore = useAuthStore()
            await authStore.fetchUser()
        } catch (error) {
            console.error('Failed to initialize app:', error)
            // Если не удалось загрузить пользователя - очищаем токен
            localStorage.removeItem('token')
            delete api.defaults.headers.common['Authorization']
        }
    }
}

// Запускаем инициализацию и монтируем приложение
initApp().finally(() => {
    app.mount('#app')
})

// Опционально: глобальные компоненты
// app.component('AppButton', AppButton)