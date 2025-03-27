import { ref, computed } from 'vue'
import api from '@/utils/api'
import type { Product } from '@/types'

export default function useProducts() {
    const products = ref<Product[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchProducts = async (filters = {}) => {
        try {
            loading.value = true
            const { data } = await api.get('/products/', { params: filters })
            products.value = data
        } catch (err) {
            error.value = 'Ошибка загрузки товаров'
        } finally {
            loading.value = false
        }
    }

    const fetchProduct = async (id: number) => {
        try {
            loading.value = true
            const { data } = await api.get(`/products/${id}/`)
            return data
        } catch (err) {
            error.value = 'Ошибка загрузки товара'
        } finally {
            loading.value = false
        }
    }

    return {
        products,
        loading,
        error,
        fetchProducts,
        fetchProduct
    }
}