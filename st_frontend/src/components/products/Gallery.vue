<template>
  <div class="product-gallery">
    <!-- Главное изображение с возможностью zoom -->
    <div class="main-image-container" ref="mainImageContainer">
      <img 
        :src="activeImage" 
        @click="openZoom" 
        class="main-image cursor-zoom-in"
        :class="{ 'cursor-grab': isDragging }"
        @mousedown="startDrag"
        @mousemove="handleDrag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
      />
      
      <!-- Кнопка воспроизведения видео -->
      <button 
        v-if="video" 
        @click="showVideoModal = true"
        class="video-play-button"
        aria-label="Play video"
      >
        <PlayCircleIcon class="h-12 w-12 text-white/90 hover:text-white" />
      </button>
    </div>

    <!-- Миниатюры -->
    <div class="thumbnails">
      <button
        v-for="(img, index) in images"
        :key="index"
        @click="setActiveImage(img)"
        class="thumbnail"
        :class="{ 'thumbnail-active': activeImage === img }"
      >
        <img :src="img" class="thumbnail-image" />
      </button>
    </div>

    <!-- Модальное окно zoom -->
    <Modal v-if="showZoom" @close="closeZoom">
      <div class="zoom-container">
        <img 
          :src="activeImage" 
          ref="zoomedImage"
          class="zoomed-image"
          :style="zoomImageStyle"
        />
      </div>
    </Modal>

    <!-- Модальное окно видео -->
    <Modal v-if="showVideoModal" @close="showVideoModal = false" size="xl">
      <video 
        controls 
        autoplay
        class="w-full"
      >
        <source :src="video" type="video/mp4">
        Ваш браузер не поддерживает видео.
      </video>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { PlayCircleIcon } from '@heroicons/vue/24/outline'
import Modal from '@/components/ui/Modal.vue'

const props = defineProps({
  images: {
    type: Array as () => string[],
    required: true,
    default: () => []
  },
  video: {
    type: String,
    default: ''
  }
})

const activeImage = ref(props.images[0])
const showZoom = ref(false)
const showVideoModal = ref(false)
const isDragging = ref(false)
const startPos = ref({ x: 0, y: 0 })
const currentPos = ref({ x: 0, y: 0 })
const zoomedImage = ref<HTMLImageElement | null>(null)

// Zoom логика
const zoomImageStyle = computed(() => ({
  transform: `translate(${currentPos.value.x}px, ${currentPos.value.y}px)`
}))

const setActiveImage = (img: string) => {
  activeImage.value = img
}

const openZoom = () => {
  showZoom.value = true
  currentPos.value = { x: 0, y: 0 }
}

const closeZoom = () => {
  showZoom.value = false
}

// Drag логика для zoom
const startDrag = (e: MouseEvent) => {
  if (!showZoom.value) return
  isDragging.value = true
  startPos.value = {
    x: e.clientX - currentPos.value.x,
    y: e.clientY - currentPos.value.y
  }
}

const handleDrag = (e: MouseEvent) => {
  if (!isDragging.value || !zoomedImage.value) return
  
  const img = zoomedImage.value
  const imgRect = img.getBoundingClientRect()
  const containerRect = img.parentElement?.getBoundingClientRect()
  
  if (!containerRect) return

  const maxX = (imgRect.width - containerRect.width) / 2
  const maxY = (imgRect.height - containerRect.height) / 2
  
  let x = e.clientX - startPos.value.x
  let y = e.clientY - startPos.value.y
  
  // Ограничение перемещения
  x = Math.min(Math.max(x, -maxX), maxX)
  y = Math.min(Math.max(y, -maxY), maxY)
  
  currentPos.value = { x, y }
}

const endDrag = () => {
  isDragging.value = false
}

// Обработчик клавиатуры для zoom
const handleKeyDown = (e: KeyboardEvent) => {
  if (!showZoom.value) return
  
  const step = 50
  
  switch (e.key) {
    case 'ArrowLeft':
      currentPos.value.x += step
      break
    case 'ArrowRight':
      currentPos.value.x -= step
      break
    case 'ArrowUp':
      currentPos.value.y += step
      break
    case 'ArrowDown':
      currentPos.value.y -= step
      break
    case 'Escape':
      closeZoom()
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.product-gallery {
  @apply relative;
}

.main-image-container {
  @apply relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-4;
}

.main-image {
  @apply w-full h-full object-contain transition-transform duration-300;
}

.thumbnails {
  @apply grid grid-cols-5 gap-2;
}

.thumbnail {
  @apply aspect-square rounded border-2 overflow-hidden transition-all;
}

.thumbnail-active {
  @apply border-primary dark:border-primary-light;
}

.thumbnail-image {
  @apply w-full h-full object-cover;
}

.video-play-button {
  @apply absolute bottom-4 right-4 bg-black/50 rounded-full p-2 
         hover:bg-black/70 transition-colors;
}

.zoom-container {
  @apply relative w-full h-full max-h-[80vh] overflow-hidden;
}

.zoomed-image {
  @apply max-w-none cursor-grab;
}
</style>