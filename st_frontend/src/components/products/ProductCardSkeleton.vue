<template>
  <div class="animate-pulse bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
    <div class="aspect-square bg-gray-200 dark:bg-gray-700"></div>
    <div class="p-4 space-y-3">
      <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      <div class="flex justify-between items-center pt-2">
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
      </div>
    </div>
  </div>
</template>

<style>
/* Оптимизация анимации для prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .animate-pulse {
    animation: none;
    opacity: 0.6;
  }
}
</style>