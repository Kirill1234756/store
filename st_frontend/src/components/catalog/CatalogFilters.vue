<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
    <!-- Ползунок цены -->
    <div>
      <h3 class="font-medium text-lg mb-4">Цена, ₽</h3>
      <div class="px-2">
        <input 
          type="range" 
          v-model="localFilters.priceRange[0]"
          min="0"
          max="100000"
          step="1000"
          @change="updateFilters"
          class="w-full"
        >
        <div class="flex justify-between mt-2 text-sm text-gray-500">
          <span>{{ localFilters.priceRange[0] }} ₽</span>
          <span>{{ localFilters.priceRange[1] }} ₽</span>
        </div>
      </div>
    </div>

    <!-- Состояние -->
    <div>
      <h3 class="font-medium text-lg mb-4">Состояние</h3>
      <div class="space-y-2">
        <label 
          v-for="option in conditionOptions" 
          :key="option.value"
          class="flex items-center"
        >
          <input
            type="checkbox"
            :value="option.value"
            v-model="localFilters.conditions"
            @change="updateFilters"
            class="rounded text-primary focus:ring-primary"
          >
          <span class="ml-2">{{ option.label }}</span>
        </label>
      </div>
    </div>

    <!-- Память -->
    <div>
      <h3 class="font-medium text-lg mb-4">Объем памяти</h3>
      <div class="grid grid-cols-2 gap-2">
        <label
          v-for="size in storageOptions"
          :key="size"
          class="flex items-center"
        >
          <input
            type="checkbox"
            :value="size"
            v-model="localFilters.storage"
            @change="updateFilters"
            class="rounded text-primary focus:ring-primary"
          >
          <span class="ml-2">{{ size }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  filters: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update'])

const localFilters = ref({ ...props.filters })

const conditionOptions = [
  { value: 'new', label: 'Как новый' },
  { value: 'good', label: 'Хорошее' },
  { value: 'satisfactory', label: 'Удовлетворительное' },
]

const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB']

watch(
  () => props.filters,
  (newVal) => {
    localFilters.value = { ...newVal }
  },
  { deep: true }
)

const updateFilters = () => {
  emit('update', { ...localFilters.value })
}
</script>