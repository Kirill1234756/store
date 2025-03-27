<template>
  <transition name="fade">
    <div 
      v-if="message"
      class="fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white"
      :class="{
        'bg-green-500': type === 'success',
        'bg-red-500': type === 'error',
        'bg-blue-500': type === 'info'
      }"
    >
      {{ message }}
      <button 
        @click="hide"
        class="ml-2"
      >
        ✕
      </button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useToastStore } from '@/stores/toast.store'
import { storeToRefs } from 'pinia'

const toastStore = useToastStore()
const { message, type } = storeToRefs(toastStore)

const hide = () => {
  toastStore.hide()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>