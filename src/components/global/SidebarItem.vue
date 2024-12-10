<template>
  <div 
    class="flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer group hover:bg-violet-50 hover:text-violet-600"
    :class="[
      isActive ? 'bg-violet-50 text-violet-600' : 'text-gray-600'
    ]">
    <svg :class="[isExpanded && !isMobile ? 'mr-3' : 'mx-auto', isMobile ? 'h-6 w-6' : 'h-6 w-6']" fill="none"
      stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
    </svg>
    <span v-if="isExpanded" :class="[
      'transition-all duration-300',
    ]">
      {{ item.label }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AppLink from './AppLink.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isExpanded: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

const isMobile = computed(() => {
  return window.innerWidth < 640
})
</script>