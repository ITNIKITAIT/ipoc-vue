<script setup lang="ts">
type CardStatus = "fundraising" | "live-trading" | "failed"

const props = withDefaults(defineProps<{
  name: string
  ticker: string
  positionValue: string
  status: CardStatus
  percentage?: number
  raisedLabel?: string
  stats: { label: string; value: string; highlight?: boolean }[]
  profitLoss?: { value: string; positive: boolean }
  failedBadge?: string
  showClaimTokens?: boolean
  showVote?: boolean
  showReinvest?: boolean
  showClaimToWallet?: boolean
}>(), {
  showClaimTokens: false,
  showVote: false,
  showReinvest: false,
  showClaimToWallet: false,
})

const statusConfig: Record<CardStatus, { label: string; bg: string }> = {
  fundraising: { label: "Fundraising", bg: "bg-[rgba(0,128,0,0.68)]" },
  "live-trading": { label: "Live Trading", bg: "bg-[rgba(0,128,0,0.68)]" },
  failed: { label: "Raise failed \u2014 funds available", bg: "bg-[#e60000]" },
}

const statusStyle = computed(() => statusConfig[props.status])
</script>

<template>
  <div
    :class="cn(
      'flex w-full flex-col rounded-2xl bg-[#1a1a1a]',
      status === 'failed' && 'border border-[rgba(230,0,0,0.3)]',
    )"
  >
    <div class="flex gap-[23px] p-6">
      <div class="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-[#333] bg-transparent p-3">
        <UiSvgIcon src="/icons/investor.svg" class="size-6 text-white" />
      </div>

      <div class="flex flex-1 flex-col gap-4">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <p class="text-2xl font-semibold leading-[1.28] tracking-tight text-white">{{ name }}</p>
            <p class="text-sm leading-[1.5] text-[#d9d8d8]">{{ ticker }}</p>
          </div>
          <div class="flex flex-col items-end">
            <p class="text-2xl font-semibold leading-[1.28] tracking-tight text-white">{{ positionValue }}</p>
            <p class="text-sm text-[#666]">Position value</p>
          </div>
        </div>

        <div class="flex gap-2">
          <div :class="cn('flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-white', statusStyle.bg)">
            <UiSvgIcon v-if="status === 'live-trading'" src="/icons/lin-cart.svg" class="size-4 text-white" />
            <UiSvgIcon v-if="status === 'fundraising'" src="/icons/launch.svg" class="size-4 text-white" />
            {{ statusStyle.label }}
          </div>
        </div>

        <div v-if="status === 'fundraising' && percentage !== undefined" class="flex flex-col gap-2">
          <div class="flex items-end justify-between text-base leading-[1.5]">
            <p class="font-bold text-brand-secondary-50">{{ percentage }}% raised</p>
            <p class="font-medium text-white">{{ raisedLabel }}</p>
          </div>
          <div class="relative h-4 w-full rounded-full bg-[#333]">
            <div
              class="h-4 rounded-full bg-brand-secondary-50"
              :style="{ width: `${Math.min(percentage, 100)}%` }"
            />
          </div>
        </div>

        <div class="flex flex-col gap-3 rounded-2xl bg-[rgba(51,51,51,0.38)] px-6 py-4">
          <div class="flex gap-4">
            <div v-for="stat in stats" :key="stat.label" class="flex flex-1 flex-col gap-1">
              <p class="text-sm text-[#666]">{{ stat.label }}</p>
              <p :class="cn('text-base font-bold', stat.highlight ? 'text-brand-secondary-50' : 'text-white')">
                {{ stat.value }}
              </p>
            </div>
          </div>
          <div v-if="profitLoss" class="flex flex-col gap-1">
            <p class="text-sm text-[#666]">Profit and Loss</p>
            <p :class="cn('text-base font-bold', profitLoss.positive ? 'text-[#00e600]' : 'text-[#e60000]')">
              {{ profitLoss.value }}
            </p>
          </div>
        </div>

        <div class="flex gap-4">
          <button v-if="showClaimTokens" class="rounded-full bg-brand-secondary-50 px-6 py-3 text-base font-semibold uppercase text-[#002147] hover:bg-brand-secondary-30">
            Claim Tokens
          </button>
          <button v-if="showVote" class="rounded-full bg-[rgba(255,153,0,0.68)] px-6 py-3 text-base font-semibold uppercase text-[#002147] hover:bg-[rgba(255,153,0,0.85)]">
            Vote
          </button>
          <button v-if="showReinvest" class="rounded-full bg-[#e60000] px-6 py-3 text-base font-semibold uppercase text-white hover:bg-[#cc0000]">
            Reinvest Funds
          </button>
          <button v-if="showClaimToWallet" class="rounded-full border border-[#333] px-6 py-3 text-base font-semibold uppercase text-white hover:bg-white/5">
            Claim to Wallet
          </button>
          <NuxtLink to="/fundraising/1" class="rounded-full border border-[#333] px-6 py-3 text-base font-semibold uppercase text-white hover:bg-white/5">
            View Details
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
