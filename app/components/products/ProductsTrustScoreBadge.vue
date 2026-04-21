<script setup lang="ts">
import { XCircle } from "lucide-vue-next"
import type { ProjectStatus } from "~/types/products"

defineProps<{
  score: number
  status: ProjectStatus
}>()
</script>

<template>
  <div
    :class="cn(
      'flex shrink-0 items-center gap-tiny rounded-b-lg px-3 h-9 text-body-s font-bold text-text-00',
      status === 'failed'
        ? 'bg-status-failed'
        : status === 'live-trading'
          ? 'bg-status-trading-badge'
          : 'bg-status-fundraising-badge',
    )"
  >
    <XCircle v-if="status === 'failed'" class="size-4" />
    <UiSvgIcon v-else src="/icons/shield.svg" class="size-4" />
    {{ score }}
  </div>
</template>
