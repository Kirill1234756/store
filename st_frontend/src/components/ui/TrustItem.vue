<template>
  <div class="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div class="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
      <component 
        :is="iconComponent" 
        class="h-6 w-6 text-blue-600 dark:text-blue-300"
        aria-hidden="true"
      />
    </div>
    <div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ title }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

// Ленивая загрузка иконок
const iconComponent = computed(() => 
  defineAsyncComponent(() =>
    import(`@heroicons/vue/24/outline`).then(module => module[props.icon])
  )
)
</script>