<template>
  <div class="relative mb-6">
    <AppInput
      v-model="query"
      placeholder="Поиск iPhone..."
      @update:modelValue="handleInput"
      @keyup.enter="emitSearch"
    >
      <template #suffix>
        <button @click="emitSearch">
          <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
        </button>
      </template>
    </AppInput>
    
    <AppSelect
      v-if="suggestions.length > 0 && showSuggestions"
      :options="suggestions"
      @select="selectSuggestion"
      class="absolute z-10 mt-1 w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'

const query = ref('')
const suggestions = ref<string[]>([])
const showSuggestions = ref(false)

const emit = defineEmits(['update:modelValue', 'search'])

const handleInput = () => {
  emit('update:modelValue', query.value)
  showSuggestions.value = true
  // Здесь должен быть вызов API для автодополнения
}

const selectSuggestion = (item: string) => {
  query.value = item
  showSuggestions.value = false
  emitSearch()
}

const emitSearch = () => {
  showSuggestions.value = false
  emit('search', query.value)
}
</script>