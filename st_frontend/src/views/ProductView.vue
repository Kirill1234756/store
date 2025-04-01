<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Хлебные крошки -->
    <nav class="text-sm text-gray-500 dark:text-gray-400 mb-6">
      <ol class="flex items-center space-x-2">
        <li>
          <RouterLink to="/" class="hover:text-primary">Главная</RouterLink>
        </li>
        <li>/</li>
        <li>
          <RouterLink to="/catalog" class="hover:text-primary">Каталог</RouterLink>
        </li>
        <li>/</li>
        <li class="text-gray-700 dark:text-gray-300">{{ product.title }}</li>
      </ol>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <!-- Левая колонка - Галерея -->
      <div>
        <Gallery 
          :images="product.images" 
          :video="product.videoReview"
          class="sticky top-4"
        />
        
        <!-- Блок доверия -->
        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
          <div class="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div class="flex items-center text-orange-500">
              <EyeIcon class="h-4 w-4 mr-1" />
              <span>{{ randomViewers }} человек смотрят</span>
            </div>
            <div class="flex items-center text-green-500">
              <ShieldCheckIcon class="h-4 w-4 mr-1" />
              <span>Проверен экспертом</span>
            </div>
            <div class="flex items-center text-blue-500">
              <CheckBadgeIcon class="h-4 w-4 mr-1" />
              <span>Гарантия 14 дней</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Правая колонка - Информация -->
      <div>
        <!-- Заголовок и цена -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ product.title }}</h1>
          <div class="flex items-center space-x-4">
            <span class="text-2xl font-bold text-primary">{{ formattedPrice }} ₽</span>
            <span v-if="product.originalPrice" class="text-lg text-gray-500 line-through">
              {{ new Intl.NumberFormat('ru-RU').format(product.originalPrice) }} ₽
            </span>
            <span v-if="product.discount" class="bg-orange-500 text-white text-sm px-2 py-1 rounded">
              -{{ product.discount }}%
            </span>
          </div>
        </div>

        <!-- Индикаторы состояния -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-6">
          <h2 class="text-lg font-semibold mb-4">Состояние устройства</h2>
          <div class="space-y-4">
            <ConditionIndicator label="Корпус" :value="product.condition.body" />
            <ConditionIndicator label="Батарея" :value="product.condition.battery" />
            <ConditionIndicator label="Экран" :value="product.condition.screen" />
          </div>
        </div>

        <!-- Блок покупки -->
        <div class="sticky top-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <span class="font-medium">Доставка:</span>
          </div>
          
          <AppButton 
            class="w-full bg-orange-500 hover:bg-orange-600 text-white mb-4 py-3"
            @click="addToCart"
          >
            Купить сейчас
          </AppButton>
          
          <div class="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div class="flex items-center">
              <TruckIcon class="h-4 w-4 mr-1" />
              <span>Доставка {{ deliveryDate }}</span>
            </div>
            <div class="flex items-center">
              <ArrowPathIcon class="h-4 w-4 mr-1" />
              <span>Возврат 14 дней</span>
            </div>
          </div>
        </div>


        <!-- Вкладки -->
        <Tabs :tabs="tabs" class="mb-8" />

        <!-- Характеристики -->
        <div v-if="activeTab === 'specs'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(value, key) in product.specifications" :key="key" class="flex">
            <span class="text-gray-500 dark:text-gray-400 w-1/2">{{ specificationsLabels[key] || key }}:</span>
            <span class="font-medium">{{ value }}</span>
          </div>
        </div>

        <!-- Отзывы -->
        <div v-if="activeTab === 'reviews'">
          <ReviewList :reviews="product.reviews" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { 
  EyeIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  TruckIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'
import Gallery from '@/components/product/Gallery.vue'
import ConditionIndicator from '@/components/product/ConditionIndicator.vue'
import Tabs from '@/components/ui/Tabs.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ReviewList from '@/components/reviews/ReviewList.vue'

const route = useRoute()
const productId = route.params.id
const activeTab = ref('description')
const randomViewers = ref(Math.floor(Math.random() * 15) + 5)

// Заглушка данных (замените на реальный API-запрос)
const product = ref({
  id: productId,
  title: 'iPhone 13 Pro 256GB (Б/У)',
  price: 69990,
  originalPrice: 89990,
  discount: 22,
  images: [
    '/images/products/iphone-1.jpg',
    '/images/products/iphone-2.jpg',
    '/images/products/iphone-3.jpg',
    '/images/products/iphone-4.jpg'
  ],
  videoReview: '/videos/iphone-review.mp4',
  condition: {
    body: 85,
    battery: 92,
    screen: 88
  },
  specifications: {
    model: 'iPhone 13 Pro',
    storage: '256GB',
    color: 'Графитовый',
    processor: 'A15 Bionic',
    camera: 'Тройная 12 МП',
    os: 'iOS 16',
    network: '5G',
    warranty: '12 месяцев'
  },
  description: 'iPhone 13 Pro в отличном состоянии. Корпус без царапин, экран без повреждений, аккумулятор 92% от оригинальной емкости. Полная комплектация: телефон, кабель, документация. Гарантия 12 месяцев.',
  reviews: [
    {
      id: 1,
      author: 'Алексей',
      rating: 5,
      date: '2023-05-15',
      text: 'Отличный телефон, как новый. Продавец честно указал состояние.'
    },
    // Другие отзывы...
  ],
  stock: 3
})

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('ru-RU').format(product.value.price)
})

const deliveryDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 3)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
})

const tabs = [
  { id: 'description', title: 'Описание' },
  { id: 'specs', title: 'Характеристики' },
  { id: 'reviews', title: 'Отзывы' }
]

const specificationsLabels = {
  model: 'Модель',
  storage: 'Память',
  color: 'Цвет',
  processor: 'Процессор',
  camera: 'Камера',
  os: 'Операционная система',
  network: 'Связь',
  warranty: 'Гарантия'
}

const addToCart = () => {
  // Логика добавления в корзину
  console.log('Добавлено в корзину:', product.value.title)
}

onMounted(() => {
  // Здесь можно добавить загрузку данных товара по ID
})
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style>