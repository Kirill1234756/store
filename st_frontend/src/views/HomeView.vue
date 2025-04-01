<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- Навигация -->
    <!-- <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <RouterLink to="/" class="text-2xl font-bold text-blue-800 dark:text-blue-200">
        iRefurb
      </RouterLink>
      <div class="flex items-center space-x-4">
        <AppButton 
          @click="navigateToAuth"
          variant="secondary"
          class="border-blue-800 text-blue-800 dark:border-blue-200 dark:text-blue-200"
        >
          Войти
        </AppButton>
        <AppButton 
          @click="navigateToSell"
          class="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700"
        >
          Продать
        </AppButton>
      </div>
    </nav> -->

    <!-- Hero-баннер с lazy loading видео -->
    <section class="relative h-[80vh] overflow-hidden bg-blue-900 dark:bg-blue-950">
      <video 
        autoplay 
        loop 
        muted 
        playsinline
        preload="none"
        class="absolute inset-0 w-full h-full object-cover opacity-30 dark:opacity-20"
        aria-label="Вращающийся iPhone"
      >
        <!-- <source src="@/assets/videos/iphone-rotate.webm" type="video/webm">
        <source src="@/assets/videos/iphone-rotate.mp4" type="video/mp4"> -->
      </video>
      
      <div class="relative z-10 flex flex-col justify-center h-full px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Продай iPhone за 5 минут.<br>
          Купи как новый — экономь!
        </h1>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <AppButton 
            variant="primary"
            class="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-lg px-8 py-3"
            @click="navigateToCatalog"
          >
            Смотреть каталог
          </AppButton>
        </div>
      </div>
    </section>

    <!-- Топ-5 предложений -->
    <section class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center text-blue-800 dark:text-blue-200 mb-12">
        Топ-5 предложений
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <ProductCardSkeleton v-if="loading" v-for="i in 5" :key="'skeleton-'+i" />
        <ProductCard 
          v-else
          v-for="product in topProducts"
          :key="product.id"
          :product="product"
          @click="openProduct(product.id)"
        />
      </div>
    </section>

    <!-- Блок доверия -->
    <section class="bg-blue-50 dark:bg-blue-950/50 py-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-6">
              Почему покупают у нас
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-8">
              Безопасные сделки и гарантия качества на все устройства
            </p>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <TrustItem 
              icon="CheckBadgeIcon"
              title="5000+ сделок"
              description="Проверенных покупателей"
            />
            <TrustItem 
              icon="ShieldCheckIcon"
              title="14 дней"
              description="Гарантия возврата"
            />
            <TrustItem 
              icon="DevicePhoneMobileIcon"
              title="100% проверка"
              description="Каждого устройства"
            />
            <TrustItem 
              icon="BanknotesIcon"
              title="Безопасная оплата"
              description="Разными способами"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Блог -->
    <section class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center text-blue-800 dark:text-blue-200 mb-12">
        Полезные статьи
      </h2>
      <div class="max-w-3xl mx-auto">
        <BlogCard 
          title="Как проверить iPhone перед покупкой"
          excerpt="Полное руководство по проверке б/у iPhone на оригинальность и работоспособность"
          image=""
          date="15 мая 2023"
          url="/blog/iphone-check"
        />
      </div>
    </section>

    <!-- <AppFooter /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDark } from '@vueuse/core'
import AppButton from '@/components/ui/AppButton.vue'
// import ProductCard from '@/components/products/ProductCard.vue'
import ProductCardSkeleton from '@/components/products/ProductCardSkeleton.vue'
import TrustItem from '@/components/ui/TrustItem.vue'
import BlogCard from '@/components/blog/BlogCard.vue'
import AppFooter from '@/components/layout/Footer.vue'

const router = useRouter()
const isDark = useDark()
const loading = ref(true)
const topProducts = ref([])

// Оптимизация: Загружаем только необходимые данные
const fetchTopProducts = async () => {
  try {
    loading.value = true
    const response = await fetch('/api/products/top?limit=5')
    topProducts.value = await response.json()
  } catch (error) {
    console.error('Error loading top products:', error)
  } finally {
    loading.value = false
  }
}

const navigateToAuth = () => router.push('/auth')
const navigateToSell = () => router.push('/sell')
const navigateToCatalog = () => router.push('/catalog')
const openProduct = (id: number) => router.push(`/products/${id}`)

// Оптимизация: Загружаем данные после гидратации
onMounted(() => {
  fetchTopProducts()
  
  // Ленивая загрузка тяжелых компонентов
  import('@heroicons/vue/24/outline').then(icons => {
    // Иконки будут доступны для динамических компонентов
  })
})
</script>

<style>
/* Оптимизация анимаций */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Оптимизация рендеринга шрифтов */
body {
  font-display: swap;
}
</style>
