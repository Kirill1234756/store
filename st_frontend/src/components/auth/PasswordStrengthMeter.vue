<template>
  <div class="password-strength">
    <div class="strength-bar">
      <div 
        class="strength-segment" 
        :class="strengthClass(0)"
      ></div>
      <div 
        class="strength-segment" 
        :class="strengthClass(1)"
      ></div>
      <div 
        class="strength-segment" 
        :class="strengthClass(2)"
      ></div>
      <div 
        class="strength-segment" 
        :class="strengthClass(3)"
      ></div>
    </div>
    <div class="text-xs mt-1" :class="strengthTextColor">
      {{ strengthText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  password: {
    type: String,
    default: ''
  }
})

const strength = computed(() => {
  if (!props.password) return 0
  
  let score = 0
  // Длина пароля
  if (props.password.length > 10) score += 1
  // Наличие цифр
  if (/\d/.test(props.password)) score += 1
  // Наличие спецсимволов
  if (/[!@#$%^&*(),.?":{}|<>]/.test(props.password)) score += 1
  // Наличие букв разного регистра
  if (/[a-z]/.test(props.password) && /[A-Z]/.test(props.password)) score += 1
  
  return Math.min(score, 4)
})

const strengthClass = (index: number) => {
  if (index < strength.value) {
    return `strength-${strength.value}`
  }
  return ''
}

const strengthText = computed(() => {
  const texts = [
    'Очень слабый',
    'Слабый',
    'Средний',
    'Сильный',
    'Очень сильный'
  ]
  return texts[strength.value]
})

const strengthTextColor = computed(() => {
  const colors = [
    'text-red-500',
    'text-orange-500',
    'text-yellow-500',
    'text-blue-500',
    'text-green-500'
  ]
  return colors[strength.value]
})
</script>

<style scoped>
.password-strength {
  @apply mt-1;
}

.strength-bar {
  @apply flex gap-1 h-1;
}

.strength-segment {
  @apply flex-1 bg-gray-200 rounded-full;
}

.strength-1 {
  @apply bg-red-500;
}

.strength-2 {
  @apply bg-orange-500;
}

.strength-3 {
  @apply bg-blue-500;
}

.strength-4 {
  @apply bg-green-500;
}
</style>