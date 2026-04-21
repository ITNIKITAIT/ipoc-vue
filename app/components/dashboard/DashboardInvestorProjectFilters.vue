<script setup lang="ts">
import { AlertTriangle } from "lucide-vue-next"
import type { Component } from "vue"

defineProps<{
  activeTab: string
}>()

const emit = defineEmits<{
  "update:activeTab": [value: string]
}>()

type Tab = { key: string; label: string; iconSrc?: string; iconComponent?: Component }

const tabs: Tab[] = [
  { key: "fundraising", label: "Fundraising", iconSrc: "/icons/rocket.svg" },
  { key: "live-trading", label: "Live Trading", iconSrc: "/icons/lin-cart.svg" },
  { key: "failed", label: "Failed", iconComponent: AlertTriangle },
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
      <UiSvgIcon v-if="tab.iconSrc" :src="tab.iconSrc" class="size-5" />
      <component :is="tab.iconComponent" v-else-if="tab.iconComponent" class="size-5" />
      {{ tab.label }}
    </button>
  </div>
</template>
