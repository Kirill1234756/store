<template>
  <div class="condition-indicator">
    <div class="flex justify-between items-center mb-1">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ label }}
      </span>
      <span class="text-xs font-semibold" :class="percentageColor">
        {{ value }}%
      </span>
    </div>
    
    <div class="h-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
      <div 
        class="h-full rounded-full transition-all duration-500"
        :class="barColor"
        :style="{ width: `${value}%` }"
      ></div>
    </div>
    
    <div class="flex justify-between mt-1">
      <span class="text-xs text-gray-500">0%</span>
      <span class="text-xs text-gray-500">100%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true,
    validator: (value: number) => value >= 0 && value <= 100
  }
})

const percentageColor = computed(() => {
  if (props.value >= 80) return 'text-green-500'
  if (props.value >= 50) return 'text-yellow-500'
  return 'text-red-500'
})

const barColor = computed(() => {
  if (props.value >= 80) return 'bg-gradient-to-r from-green-400 to-green-600'
  if (props.value >= 50) return 'bg-gradient-to-r from-yellow-400 to-yellow-600'
  return 'bg-gradient-to-r from-red-400 to-red-600'
})
</script>

<style scoped>
.condition-indicator {
  @apply w-full mb-4;
}
</style>