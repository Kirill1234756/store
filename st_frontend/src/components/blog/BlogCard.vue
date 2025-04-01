<template>
  <article class="overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02]">
    <RouterLink :to="url" class="block focus:outline-none focus-visible:ring-2 ring-blue-500">
      <div class="relative pb-[56.25%] bg-gray-100 dark:bg-gray-700">
        <img
          :src="image"
          :alt="`Изображение для статьи: ${title}`"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover"
          width="600"
          height="338"
        >
      </div>
      <div class="bg-white dark:bg-gray-800 p-6">
        <time 
          :datetime="new Date(date).toISOString()" 
          class="text-sm text-gray-500 dark:text-gray-400"
        >
          {{ formatDate(date) }}
        </time>
        <h3 class="mt-2 text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
          {{ title }}
        </h3>
        <p class="mt-3 text-gray-600 dark:text-gray-300 line-clamp-3">
          {{ excerpt }}
        </p>
        <div class="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium">
          Читать статью
          <ArrowRightIcon class="ml-1 h-4 w-4" />
        </div>
      </div>
    </RouterLink>
  </article>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

defineProps({
  title: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>