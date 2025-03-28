import { defineStore } from 'pinia'
import api from '@/utils/api'
import type { Product } from '@/types'
import { useAuthStore } from './auth.store'
import { useToastStore } from './toast.store'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as Product[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchFavorites() {
      const authStore = useAuthStore()
      const toastStore = useToastStore()
      
      if (!authStore.isAuthenticated) {
        this.error = 'Требуется авторизация'
        return
      }

      try {
        this.loading = true
        this.error = null
        const { data } = await api.get('/products/my_favorites/')
        this.favorites = data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Ошибка загрузки избранного'
        toastStore.show(this.error, 'error')
        console.error('Failed to load favorites:', error)
      } finally {
        this.loading = false
      }
    },

    async toggleFavorite(product: Product) {
      const authStore = useAuthStore()
      const toastStore = useToastStore()

      if (!authStore.isAuthenticated) {
        this.error = 'Требуется авторизация'
        toastStore.show('Войдите, чтобы добавлять в избранное', 'info')
        return false
      }

      try {
        this.loading = true
        this.error = null
        
        if (this.isFavorite(product.id)) {
          await api.delete(`/products/${product.id}/favorite/`)
          this.favorites = this.favorites.filter(fav => fav.id !== product.id)
          toastStore.show('Удалено из избранного', 'success')
          return false
        } else {
          await api.post(`/products/${product.id}/favorite/`)
          this.favorites.push(product)
          toastStore.show('Добавлено в избранное', 'success')
          return true
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Ошибка при изменении избранного'
        toastStore.show(this.error, 'error')
        console.error('Failed to toggle favorite:', error)
        return false
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    isFavorite: (state) => (productId: number) => {
      return state.favorites.some(fav => fav.id === productId)
    },
    favoritesCount: (state) => state.favorites.length
  }
})