<script setup lang="ts">
import { ShoppingCart, Rocket, AlertTriangle } from "lucide-vue-next"

defineProps<{
  activeTab: string
}>()

const emit = defineEmits<{
  "update:activeTab": [value: string]
}>()

const tabs = [
  { key: "all", label: "All", icon: null },
  { key: "post-raise", label: "Post-raise", icon: ShoppingCart },
  { key: "fundraising", label: "Fundraising", icon: Rocket },
  { key: "failed", label: "Failed", icon: AlertTriangle },
] as const
</script>

<template>
  <div class="flex items-center gap-6">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      :class="cn(
        'flex items-center gap-1 px-4 py-[9px] text-xl font-medium leading-[1.5] transition-colors',
        activeTab === tab.key
          ? 'border-b-2 border-brand-secondary-50 text-brand-secondary-50'
          : 'text-[#666] hover:text-white',
      )"
      @click="emit('update:activeTab', tab.key)"
    >
      <component :is="tab.icon" v-if="tab.icon" class="size-6" />
      {{ tab.label }}
    </button>
  </div>
</template>
