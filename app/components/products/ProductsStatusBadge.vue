<script setup lang="ts">
import { Rocket, ShoppingCart, AlertTriangle } from "lucide-vue-next"
import type { ProjectStatus } from "~/types/products"

defineProps<{
  status: ProjectStatus
}>()

const statusConfig = {
  fundraising: {
    label: "Fundraising",
    icon: Rocket,
    bg: "bg-status-fundraising-badge",
  },
  "live-trading": {
    label: "Live Trading",
    icon: ShoppingCart,
    bg: "bg-status-trading-badge",
  },
  failed: {
    label: "Failed",
    icon: AlertTriangle,
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
    <component :is="statusConfig[status].icon" class="size-4" />
    {{ statusConfig[status].label }}
  </div>
</template>
