<template>
  <div class="flex flex-col md:flex-row gap-4 mb-8">
    <AppInput
      v-model="searchQuery"
      placeholder="Поиск по названию"
      class="flex-1"
    />
    <div class="flex gap-4">
      <AppSelect
        v-model="sortField"
        :options="SORT_FIELDS"
        class="w-40"
      />
      <AppSelect
        v-model="sortDirection"
        :options="SORT_DIRECTIONS"
        class="w-32"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { SORT_FIELDS, SORT_DIRECTIONS } from '@/utils/constants'
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'

const emit = defineEmits(['update-filters'])

const searchQuery = ref('')
const sortField = ref(SORT_FIELDS[0].value)
const sortDirection = ref(SORT_DIRECTIONS[0].value)

watch([searchQuery, sortField, sortDirection], () => {
  emit('update-filters', {
    search: searchQuery.value,
    sort_by: sortField.value,
    sort_dir: sortDirection.value
  })
})
</script>