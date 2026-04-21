<script setup lang="ts">
import { AlertTriangle } from "lucide-vue-next"
import type { ProjectStatus } from "~/types/products"

defineProps<{
  status: ProjectStatus
}>()

const statusConfig = {
  fundraising: {
    label: "Fundraising",
    iconSrc: "/icons/rocket.svg",
    bg: "bg-status-fundraising-badge",
  },
  "live-trading": {
    label: "Live Trading",
    iconSrc: "/icons/lin-cart.svg",
    bg: "bg-status-trading-badge",
  },
  failed: {
    label: "Failed",
    iconSrc: null,
    bg: "bg-status-failed",
  },
} as const
</script>

<template>
  <div
    :class="cn(
      'flex flex-1 items-center gap-tiny rounded-b-lg px-3 h-9 text-body-s font-bold text-text-00',
      statusConfig[status].bg,
    )"
  >
    <UiSvgIcon v-if="statusConfig[status].iconSrc" :src="statusConfig[status].iconSrc!" class="size-4" />
    <AlertTriangle v-else class="size-4" />
    {{ statusConfig[status].label }}
  </div>
</template>
