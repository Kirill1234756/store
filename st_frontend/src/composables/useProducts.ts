import { ref } from 'vue'
import api from '@/utils/api'
import type { Product } from '@/types'
import { useToastStore } from '@/stores/toast.store'

export default function useProducts() {
    const products = ref<Product[]>([])
    const currentProduct = ref<Product | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const toastStore = useToastStore()

    /**
     * Загружает список товаров с сервера
     * @param filters - Объект с параметрами фильтрации
     */
    const fetchProducts = async (filters: Record<string, any> = {}) => {
        try {
            loading.value = true
            error.value = null

            const { data } = await api.get('/products/', {
                params: filters,
                paramsSerializer: {
                    indexes: null // Отключаем индексацию массивов в URL
                }
            })

            // Обрабатываем пагинацию (если API возвращает {results: [], count: N})
            products.value = data.results || (Array.isArray(data) ? data : [data])

        } catch (err: any) {
            error.value = err.message || 'Ошибка загрузки товаров'
            console.error('API Error:', {
                url: err.config?.url,
                status: err.response?.status,
                data: err.response?.data
            })
            toastStore.show(error.value, 'error')
        } finally {
            loading.value = false
        }
    }

    /**
     * Загружает конкретный товар по ID
     * @param id - ID товара
     * @returns Promise с данными товара или undefined при ошибке
     */
    const fetchProduct = async (id: number): Promise<Product | undefined> => {
        try {
            loading.value = true
            error.value = null

            const { data } = await api.get(`/products/${id}/`)

            if (data && typeof data === 'object' && data.id) {
                currentProduct.value = data
                return data
            }
            throw new Error('Неверный формат данных товара')

        } catch (err: any) {
            error.value = err.message || 'Не удалось загрузить товар'
            toastStore.show(error.value, 'error')
            console.error(`Ошибка загрузки товара ${id}:`, err)
            return undefined
        } finally {
            loading.value = false
        }
    }

    /**
     * Создает новый товар
     * @param productData - Данные для создания товара
     */
    const createProduct = async (productData: Omit<Product, 'id'>) => {
        try {
            loading.value = true
            const { data } = await api.post('/products/', productData)
            products.value.unshift(data)
            toastStore.show('Товар успешно создан', 'success')
            return data
        } catch (err: any) {
            error.value = err.message || 'Ошибка создания товара'
            toastStore.show(error.value, 'error')
            console.error('Ошибка создания товара:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        // Реактивные данные
        products,
        currentProduct,
        loading,
        error,

        // Методы
        fetchProducts,
        fetchProduct,
        createProduct
    }
}