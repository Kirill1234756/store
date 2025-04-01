<template>
  <div class="flex items-center justify-between mb-6">
    <div class="text-sm text-gray-500 dark:text-gray-400">
      Найдено товаров: {{ totalCount }}
    </div>
    
    <div class="flex items-center space-x-2">
      <span class="text-sm text-gray-500 dark:text-gray-400">Сортировка:</span>
      <select
        v-model="selectedOption"
        @change="emitChange"
        class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
      >
        <option 
          v-for="option in sortOptions" 
          :key="option.value"
          :value="option.value"
          class="bg-white dark:bg-gray-800"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: 'price_asc'
  },
  totalCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const selectedOption = ref(props.modelValue)

const sortOptions = [
  { value: 'price_asc', label: 'По возрастанию цены' },
  { value: 'price_desc', label: 'По убыванию цены' },
  { value: 'date_desc', label: 'Сначала новые' },
  { value: 'date_asc', label: 'Сначала старые' },
  { value: 'rating_desc', label: 'По рейтингу' }
]

const emitChange = () => {
  emit('update:modelValue', selectedOption.value)
  emit('change', selectedOption.value)
}

watch(() => props.modelValue, (newVal) => {
  selectedOption.value = newValё
})
</script>