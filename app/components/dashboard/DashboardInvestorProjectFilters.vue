<script setup lang="ts">
import { AlertTriangle, Rocket, ShoppingCart } from "lucide-vue-next"

defineProps<{
  activeTab: string
}>()

const emit = defineEmits<{
  "update:activeTab": [value: string]
}>()

const tabs = [
  { key: "fundraising", label: "Fundraising", icon: Rocket },
  { key: "live-trading", label: "Live Trading", icon: ShoppingCart },
  { key: "failed", label: "Failed", icon: AlertTriangle },
]
</script>

<template>
  <div class="flex items-center gap-6">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      :class="cn(
        'flex items-center gap-2 px-4 py-[9px] text-xl font-medium leading-[1.5] transition-colors',
        activeTab === tab.key
          ? 'border-b-2 border-brand-secondary-50 text-brand-secondary-50'
          : 'text-[#666] hover:text-white',
      )"
      @click="emit('update:activeTab', tab.key)"
    >
      <component :is="tab.icon" class="size-5" />
      {{ tab.label }}
    </button>
  </div>
</template>
