// src/stores/productStore.ts
import { defineStore } from 'pinia'
import api from '@/utils/api'
import type { Product } from '@/types'
import { useToastStore } from './toast.store'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    filteredProducts: [] as Product[],
    loading: false,
    error: null as string | null,
    currentPage: 1,
    hasMore: true
  }),

  actions: {
    async fetchProducts(params = {}) {
      const toastStore = useToastStore()
      try {
        this.loading = true
        const { data } = await api.get('/products/', { params })
        
        if (params.page && params.page > 1) {
          this.products = [...this.products, ...data.results]
        } else {
          this.products = data.results
        }
        
        this.filteredProducts = this.applyFilters(params)
        this.hasMore = !!data.next
      } catch (error) {
        this.error = 'Ошибка загрузки товаров'
        toastStore.show(this.error, 'error')
      } finally {
        this.loading = false
      }
    },

    applyFilters(filters: any) {
      return this.products.filter(product => {
        // Фильтрация по цене
        if (filters.priceRange) {
          const [min, max] = filters.priceRange
          if (product.price < min || product.price > max) return false
        }
        
        // Фильтрация по состоянию
        if (filters.conditions?.length && !filters.conditions.includes(product.condition)) {
          return false
        }
        
        // Фильтрация по памяти
        if (filters.storage?.length && !filters.storage.includes(product.storage)) {
          return false
        }
        
        // Поиск по названию
        if (filters.search && !product.title.toLowerCase().includes(filters.search.toLowerCase())) {
          return false
        }
        
        return true
      })
    }
  }
})