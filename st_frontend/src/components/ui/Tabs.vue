<template>
  <div class="tabs">
    <div class="flex border-b border-gray-200 dark:border-gray-700">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="selectTab(tab.id)"
        class="px-4 py-2 font-medium text-sm relative"
        :class="{
          'text-primary': activeTab === tab.id,
          'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300': activeTab !== tab.id
        }"
      >
        {{ tab.title }}
        <span 
          v-if="activeTab === tab.id"
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
        ></span>
      </button>
    </div>
    
    <div class="mt-4">
      <slot v-if="$slots[activeTab]" :name="activeTab"></slot>
      <div v-else>
        {{ getTabContent(activeTab) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  tabs: {
    type: Array as () => {
      id: string;
      title: string;
      content?: string;
    }[],
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const activeTab = ref(props.tabs[0]?.id || '')

watch(() => props.modelValue, (newVal) => {
  if (newVal) activeTab.value = newVal
})

const selectTab = (tabId: string) => {
  activeTab.value = tabId
  emit('update:modelValue', tabId)
}

const getTabContent = (tabId: string) => {
  return props.tabs.find(tab => tab.id === tabId)?.content || ''
}
</script>

<style scoped>
.tabs {
  @apply w-full;
}
</style>