<template>
  <select
    :value="modelValue"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
  >
    <option 
      v-for="option in options" 
      :key="option.value" 
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
interface Option {
  value: string | number
  label: string
}

defineProps<{
  modelValue: string | number
  options: Option[]
}>()

defineEmits(['update:modelValue'])
</script>