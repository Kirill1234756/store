<template>
  <button
    :type="type"
    :disabled="disabled"
    class="px-6 py-2 rounded-lg font-medium transition-colors"
    :class="[
      variant === 'primary' 
        ? 'bg-blue-600 text-white hover:bg-blue-700' 
        : 'border border-gray-300 hover:bg-gray-50',
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}>(), {
  type: 'button',
  variant: 'primary',
  disabled: false
})

defineEmits(['click'])
</script>