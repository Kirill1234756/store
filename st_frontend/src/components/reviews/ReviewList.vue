<template>
  <div class="review-list">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold">
        Отзывы ({{ reviews.length }})
      </h3>
      <AppButton 
        variant="secondary"
        @click="openReviewModal"
      >
        Написать отзыв
      </AppButton>
    </div>
    
    <div class="space-y-6">
      <div 
        v-for="review in reviews"
        :key="review.id"
        class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
      >
        <div class="flex items-start justify-between mb-3">
          <div>
            <h4 class="font-medium">{{ review.author }}</h4>
            <div class="flex items-center mt-1">
              <StarIcon 
                v-for="star in 5"
                :key="star"
                class="h-4 w-4"
                :class="star <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
              />
            </div>
          </div>
          <span class="text-sm text-gray-500">
            {{ formatDate(review.date) }}
          </span>
        </div>
        <p class="text-gray-700 dark:text-gray-300">
          {{ review.text }}
        </p>
      </div>
      
      <div v-if="reviews.length === 0" class="text-center py-8 text-gray-500">
        Пока нет отзывов. Будьте первым!
      </div>
    </div>
    
    <ReviewModal 
      v-if="showReviewModal"
      :product-id="productId"
      @close="showReviewModal = false"
      @submit="addReview"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { StarIcon } from '@heroicons/vue/24/solid'
import AppButton from '@/components/ui/AppButton.vue'
import ReviewModal from '@/components/reviews/ReviewModal.vue'

const props = defineProps({
  reviews: {
    type: Array as () => {
      id: number;
      author: string;
      rating: number;
      date: string;
      text: string;
    }[],
    default: () => []
  },
  productId: {
    type: String,
    required: true
  }
})

const showReviewModal = ref(false)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const openReviewModal = () => {
  showReviewModal.value = true
}

const addReview = (newReview: any) => {
  props.reviews.unshift({
    id: Math.max(...props.reviews.map(r => r.id), 0) + 1,
    ...newReview,
    date: new Date().toISOString()
  })
}
</script>

<style scoped>
.review-list {
  @apply space-y-4;
}
</style>