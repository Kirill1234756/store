import { ref } from 'vue'
import api from '@/utils/api'
import type { Product } from '@/types'

export default function useFavorites() {
    const favorites = ref<Product[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchFavorites = async () => {
        try {
            loading.value = true
            const { data } = await api.get('/favorites/')
            favorites.value = data
        } catch (err) {
            error.value = 'Failed to load favorites'
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    const addFavorite = async (productId: number) => {
        try {
            await api.post(`/favorites/${productId}/`)
            await fetchFavorites()
        } catch (err) {
            error.value = 'Failed to add favorite'
            console.error(err)
        }
    }

    const removeFavorite = async (productId: number) => {
        try {
            await api.delete(`/favorites/${productId}/`)
            await fetchFavorites()
        } catch (err) {
            error.value = 'Failed to remove favorite'
            console.error(err)
        }
    }

    return {
        favorites,
        loading,
        error,
        fetchFavorites,
        addFavorite,
        removeFavorite
    }
}