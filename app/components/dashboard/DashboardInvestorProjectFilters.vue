<script setup lang="ts">
import { AlertTriangle } from "lucide-vue-next"
import type { Component } from "vue"

defineProps<{
  activeTab: string
}>()

const emit = defineEmits<{
  "update:activeTab": [value: string]
}>()

type Tab = {
  key: string
  label: string
  iconSrc?: string
  iconComponent?: Component
  activeClass: string
}

const tabs: Tab[] = [
  {
    key: "fundraising",
    label: "Fundraising",
    iconSrc: "/icons/launch.svg",
    activeClass: "border-[#00FF00] text-[#00FF00]",
  },
  {
    key: "live-trading",
    label: "Live Trading",
    iconSrc: "/icons/lin-cart.svg",
    activeClass: "border-semantic-information text-semantic-information",
  },
  {
    key: "failed",
    label: "Failed",
    iconComponent: AlertTriangle,
    activeClass: "border-semantic-error text-semantic-error",
  },
]
</script>

<template>
  <div class="flex items-center gap-4">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      :class="cn(
        'flex items-center gap-1 px-4 py-[9px] text-[20px] font-medium leading-[1.5] transition-colors',
        activeTab === tab.key
          ? `border-b-2 ${tab.activeClass}`
          : 'text-[#666] hover:text-white',
      )"
      @click="emit('update:activeTab', tab.key)"
    >
      <UiSvgIcon v-if="tab.iconSrc" :src="tab.iconSrc" class="size-6" />
      <component :is="tab.iconComponent" v-else-if="tab.iconComponent" class="size-6" />
      {{ tab.label }}
    </button>
  </div>
</template>
