<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-8">Каталог iPhone</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Боковая панель фильтров -->
      <div class="lg:col-span-1">
        <CatalogSearch 
          v-model="searchQuery"
          @search="applyFilters"
        />
        <CatalogFilters
          :filters="activeFilters"
          @update="handleFilterUpdate"
        />
      </div>
      
      <!-- Основной контент -->
      <div class="lg:col-span-3">
        <CatalogSort 
          v-model="sortOption"
          @change="applyFilters"
        />
        
        <ProductGrid
          :products="productStore.filteredProducts"
          :loading="productStore.loading"
          :has-more="productStore.hasMore"
          @load-more="loadMore"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import CatalogSearch from '@/components/catalog/CatalogSearch.vue'
import CatalogFilters from '@/components/catalog/CatalogFilters.vue'
import CatalogSort from '@/components/catalog/CatalogSort.vue'
import ProductGrid from '@/components/products/ProductGrid.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

// Состояние фильтров
const activeFilters = ref({
  priceRange: [0, 100000],
  conditions: [] as string[],
  storage: [] as string[],
})

const searchQuery = ref('')
const sortOption = ref('price_asc')

// Загрузка параметров из URL
onMounted(() => {
  if (route.query) {
    activeFilters.value = {
      priceRange: route.query.priceRange 
        ? JSON.parse(route.query.priceRange as string) 
        : [0, 100000],
      conditions: route.query.conditions 
        ? (route.query.conditions as string).split(',') 
        : [],
      storage: route.query.storage 
        ? (route.query.storage as string).split(',') 
        : [],
    }
    searchQuery.value = route.query.search as string || ''
    sortOption.value = route.query.sort as string || 'price_asc'
  }
  fetchProducts()
})

// Применение фильтров
const applyFilters = () => {
  productStore.currentPage = 1
  updateUrl()
  fetchProducts()
}

// Обновление URL
const updateUrl = () => {
  router.replace({
    query: {
      search: searchQuery.value || undefined,
      priceRange: JSON.stringify(activeFilters.value.priceRange),
      conditions: activeFilters.value.conditions.join(',') || undefined,
      storage: activeFilters.value.storage.join(',') || undefined,
      sort: sortOption.value,
    }
  })
}

// Загрузка товаров
const fetchProducts = async () => {
  await productStore.fetchProducts({
    page: productStore.currentPage,
    search: searchQuery.value,
    ...activeFilters.value,
    sort: sortOption.value,
  })
}

// Подгрузка дополнительных товаров
const loadMore = async () => {
  productStore.currentPage++
  await fetchProducts()
}

// Обновление фильтров
const handleFilterUpdate = (newFilters: any) => {
  activeFilters.value = { ...activeFilters.value, ...newFilters }
  applyFilters()
}
</script>