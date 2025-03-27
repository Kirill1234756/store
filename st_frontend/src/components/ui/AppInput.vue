<template>
  <div class="relative">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :type="type"
      :placeholder="placeholder"
      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      :class="{ 'border-red-500': error }"
    />
    <span v-if="error" class="absolute -bottom-5 left-0 text-red-500 text-xs">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: string
  type?: string
  placeholder?: string
  error?: string
}>(), {
  type: 'text',
  placeholder: '',
  error: ''
})

defineEmits(['update:modelValue'])
</script>