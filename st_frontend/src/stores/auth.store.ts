import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface User {
    id: number
    email: string
    username: string
    is_active: boolean
}

interface LoginCredentials {
    email: string
    password: string
}

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const user = ref<User | null>(null)
    const token = ref<string | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const isAuthenticated = computed(() => !!token.value)
    const userEmail = computed(() => user.value?.email ?? '')
    const username = computed(() => user.value?.username ?? '')

    async function login(credentials: LoginCredentials) {
        try {
            isLoading.value = true
            error.value = null

            const response = await fetch('/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.detail || 'Login failed')
            }

            token.value = data.access
            user.value = data.user

            localStorage.setItem('token', data.access)
            router.push('/')
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'An error occurred'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    async function logout() {
        try {
            isLoading.value = true
            error.value = null

            await fetch('/api/auth/logout/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token.value}`,
                },
            })
        } catch (err) {
            console.error('Logout error:', err)
        } finally {
            token.value = null
            user.value = null
            localStorage.removeItem('token')
            router.push('/login')
            isLoading.value = false
        }
    }

    async function checkAuth() {
        const storedToken = localStorage.getItem('token')
        if (!storedToken) return

        try {
            isLoading.value = true
            error.value = null

            const response = await fetch('/api/auth/me/', {
                headers: {
                    'Authorization': `Bearer ${storedToken}`,
                },
            })

            if (!response.ok) {
                throw new Error('Authentication failed')
            }

            const data = await response.json()
            token.value = storedToken
            user.value = data
        } catch (err) {
            token.value = null
            user.value = null
            localStorage.removeItem('token')
            throw err
        } finally {
            isLoading.value = false
        }
    }

    return {
        user,
        token,
        isLoading,
        error,
        isAuthenticated,
        userEmail,
        username,
        login,
        logout,
        checkAuth,
    }
})
