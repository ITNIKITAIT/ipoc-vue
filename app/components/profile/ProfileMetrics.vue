<script setup lang="ts">
import { Copy } from "lucide-vue-next"

const props = withDefaults(
  defineProps<{
    name: string
    wallet: string
    bio: string
    totalInvested: string
    projectsBacked: number | string
    createdProjects: number | string
    totalRaised: string
    showFinancials?: boolean
  }>(),
  {
    showFinancials: true,
  },
)

const leftMetrics = computed(() => {
  const metrics: { label: string[]; value: string | number }[] = []
  if (props.showFinancials) {
    metrics.push({ label: ["Total", "Invested"], value: props.totalInvested })
  }
  metrics.push({ label: ["Projects", "Backed"], value: props.projectsBacked })
  return metrics
})

const rightMetrics = computed(() => {
  const metrics: { label: string[]; value: string | number }[] = [
    { label: ["Created", "Projects"], value: props.createdProjects },
  ]
  if (props.showFinancials) {
    metrics.push({ label: ["Total", "Raised"], value: props.totalRaised })
  }
  return metrics
})

function copyWallet() {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(props.wallet).catch(() => {})
  }
}
</script>

<template>
  <div class="flex w-full flex-wrap items-stretch justify-center gap-4 lg:flex-nowrap">
    <template v-for="(metric, idx) in leftMetrics" :key="`l-${idx}`">
      <div class="flex h-28 min-w-[160px] flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-black p-4 text-white">
        <p class="text-center text-sm leading-tight">
          <span v-for="(line, i) in metric.label" :key="i" class="block">{{ line }}</span>
        </p>
        <p class="text-xl leading-none">{{ metric.value }}</p>
      </div>
      <div class="hidden h-20 w-px shrink-0 self-center bg-white/30 lg:block" />
    </template>

    <div class="flex w-full min-w-[200px] flex-col items-center gap-1.5 px-2 lg:w-[217px] lg:flex-none">
      <p class="font-roboto text-[32px] font-bold leading-[1.3] text-center text-white">
        {{ name }}
      </p>
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2 text-white">
          <UiSvgIcon src="/icons/wallet.svg" class="size-5 text-white" />
          <span class="font-roboto font-medium text-lg">{{ wallet }}</span>
        </div>
        <button
          type="button"
          aria-label="Copy wallet address"
          class="text-white/80 transition-colors hover:text-white"
          @click="copyWallet"
        >
          <Copy class="size-5" />
        </button>
      </div>
      <p class="text-center text-tiny text-white">{{ bio }}</p>
    </div>

    <template v-for="(metric, idx) in rightMetrics" :key="`r-${idx}`">
      <div class="hidden h-20 w-px shrink-0 self-center bg-white/30 lg:block" />
      <div class="flex h-28 min-w-[160px] flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-black p-4 text-white">
        <p class="text-center text-sm leading-tight">
          <span v-for="(line, i) in metric.label" :key="i" class="block">{{ line }}</span>
        </p>
        <p class="text-xl leading-none">{{ metric.value }}</p>
      </div>
    </template>
  </div>
</template>
