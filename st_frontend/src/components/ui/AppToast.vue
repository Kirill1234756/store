<template>
  <transition name="fade">
    <div 
      v-if="show"
      class="fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg text-white"
      :class="{
        'bg-green-500': type === 'success',
        'bg-red-500': type === 'error',
        'bg-blue-500': type === 'info'
      }"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToastStore } from '@/stores/toast.store'

const toastStore = useToastStore()
const { message, type, show } = storeToRefs(toastStore)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>