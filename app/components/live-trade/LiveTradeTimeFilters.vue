<script setup lang="ts">
const TIME_FILTERS = ["1m", "5m", "15m", "30m", "1h", "6h", "24h", "2D", "1W", "all"] as const
type TimeFilter = (typeof TIME_FILTERS)[number]

defineProps<{ active: string }>()
const emit = defineEmits<{ "update:active": [filter: string] }>()
</script>

<template>
  <div class="flex gap-2 items-center w-full">
    <button
      v-for="filter in TIME_FILTERS"
      :key="filter"
      :class="['flex-1 flex items-center justify-center py-2 px-2 text-sm rounded border transition-colors', active === filter ? 'border-white text-white' : 'border-[#d9d8d8] text-[#d9d8d8] hover:border-white/60 hover:text-white/60']"
      @click="emit('update:active', filter)"
    >
      {{ filter }}
    </button>
  </div>
</template>
