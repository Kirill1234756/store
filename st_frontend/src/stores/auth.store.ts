import { defineStore } from 'pinia'
import api from '@/utils/api'
import router from '@/router'

interface User {
    id: number
    username: string
    email: string
}

interface AuthState {
    user: User | null
    token: string | null
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        token: localStorage.getItem('token')
    }),

    getters: {
        isAuthenticated: state => !!state.token
    },

    actions: {
        async login(credentials: { username: string; password: string }) {
            try {
                const { data } = await api.post('/auth/login/', credentials)
                this.token = data.token
                this.user = data.user
                localStorage.setItem('token', data.token)
                api.defaults.headers.common['Authorization'] = `Token ${data.token}`

                const redirect = router.currentRoute.value.query.redirect
                router.push(redirect ? String(redirect) : '/')
            } catch (error) {
                throw new Error('Invalid credentials')
            }
        },

        async register(userData: { username: string; email: string; password: string }) {
            try {
                const { data } = await api.post('/auth/register/', userData)
                this.token = data.token
                this.user = data.user
                localStorage.setItem('token', data.token)
                api.defaults.headers.common['Authorization'] = `Token ${data.token}`
                router.push('/')
            } catch (error) {
                throw new Error('Registration failed')
            }
        },

        async logout() {
            try {
                await api.post('/auth/logout/')
                this.token = null
                this.user = null
                localStorage.removeItem('token')
                delete api.defaults.headers.common['Authorization']
                router.push('/')
            } catch (error) {
                console.error('Logout failed:', error)
            }
        },

        async fetchUser() {
            if (!this.token) return

            try {
                const { data } = await api.get('/auth/user/')
                this.user = data
            } catch (error) {
                console.error('Failed to fetch user:', error)
                throw error
            }
        }
    }
})