import { defineStore } from 'pinia'
import api from '@/utils/api'
import type { Product } from '@/types'

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        favorites: [] as Product[],
        loading: false
    }),

    actions: {
        async loadFavorites() {
            try {
                this.loading = true
                const { data } = await api.get('/favorites/')
                this.favorites = data
            } catch (error) {
                console.error('Failed to load favorites:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async addFavorite(product: Product) {
            try {
                await api.post(`/favorites/${product.id}/`)
                this.favorites.push(product)
            } catch (error) {
                console.error('Failed to add favorite:', error)
                throw error
            }
        },

        async removeFavorite(productId: number) {
            try {
                await api.delete(`/favorites/${productId}/`)
                this.favorites = this.favorites.filter(fav => fav.id !== productId)
            } catch (error) {
                console.error('Failed to remove favorite:', error)
                throw error
            }
        }
    },

    getters: {
        isFavorite: (state) => (productId: number) => {
            return state.favorites.some(fav => fav.id === productId)
        }
    }
})