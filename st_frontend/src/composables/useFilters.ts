import { ref } from 'vue'

interface ProductFilters {
    search?: string
    sort_by?: string
    sort_dir?: 'asc' | 'desc'
}

export default function useFilters() {
    const filters = ref<ProductFilters>({
        search: '',
        sort_by: 'created_at',
        sort_dir: 'desc'
    })

    const updateFilters = (newFilters: ProductFilters) => {
        filters.value = { ...filters.value, ...newFilters }
    }

    return {
        filters,
        updateFilters
    }
}