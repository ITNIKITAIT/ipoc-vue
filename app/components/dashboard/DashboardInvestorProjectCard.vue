<script setup lang="ts">
type CardStatus = "live-trading" | "fundraising" | "failed"

type StatColor = "white" | "success" | "teal" | "error"

interface Stat {
  label: string
  value: string
  color?: StatColor
  width?: string
}

const props = withDefaults(defineProps<{
  name: string
  ticker: string
  positionValue: string
  status: CardStatus
  statsRows: Stat[][]
  availableLabel?: string
  showClaimTokens?: boolean
  showVote?: boolean
  showReinvest?: boolean
  showClaimToWallet?: boolean
  showViewDetails?: boolean
  detailsHref?: string
}>(), {
  showClaimTokens: false,
  showVote: false,
  showReinvest: false,
  showClaimToWallet: false,
  showViewDetails: true,
  detailsHref: "/fundraising/1",
})

const statusBadge = computed(() => {
  switch (props.status) {
    case "live-trading":
      return {
        label: "Live Trading",
        icon: "/icons/lin-cart.svg",
        bg: "bg-semantic-information",
        text: "text-white",
      }
    case "fundraising":
      return {
        label: "Fundraising",
        icon: "/icons/launch.svg",
        bg: "bg-semantic-success",
        text: "text-white",
      }
    case "failed":
      return {
        label: "Raise failed — funds available",
        icon: null,
        bg: "bg-[rgba(230,0,0,0.12)]",
        text: "text-semantic-error",
      }
  }
})

const colorClass: Record<StatColor, string> = {
  white: "text-white",
  success: "text-[#00e600]",
  teal: "text-brand-secondary-30",
  error: "text-semantic-error",
}
</script>

<template>
  <div class="flex w-full flex-col rounded-2xl bg-[#1a1a1a] p-6">
    <div class="flex items-start gap-[23px]">
      <div class="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-[#333] bg-[#1a1a1a] p-3 shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.25)]">
        <UiSvgIcon src="/icons/investor.svg" class="size-6 text-white" />
      </div>

      <div class="flex min-w-0 flex-1 flex-col gap-4">
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between gap-4 text-[24px] font-semibold leading-[1.28] tracking-[-0.12px]">
            <p class="text-white">{{ name }} ({{ ticker }})</p>
            <p class="text-[#d9d8d8]">{{ positionValue }}</p>
          </div>

          <div v-if="status === 'failed'" class="flex items-center justify-between gap-4">
            <div
              :class="cn(
                'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs leading-[1.5]',
                statusBadge.bg,
                statusBadge.text,
              )"
            >
              {{ statusBadge.label }}
            </div>
            <p class="text-base font-medium leading-[1.5] text-[#666]">
              {{ availableLabel ?? "Available" }}
            </p>
          </div>

          <div v-else class="flex">
            <div
              :class="cn(
                'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold leading-[1.5]',
                statusBadge.bg,
                statusBadge.text,
              )"
            >
              <UiSvgIcon v-if="statusBadge.icon" :src="statusBadge.icon" class="size-4 text-white" />
              {{ statusBadge.label }}
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4 rounded-2xl bg-[rgba(51,51,51,0.38)] p-6">
          <div
            v-for="(row, rowIndex) in statsRows"
            :key="rowIndex"
            class="flex items-start gap-4"
          >
            <div
              v-for="stat in row"
              :key="stat.label"
              class="flex h-[62px] flex-col items-start justify-between"
              :class="stat.width ? '' : 'flex-1 min-w-0'"
              :style="stat.width ? { width: stat.width } : undefined"
            >
              <p class="w-full text-base font-medium leading-[1.5] text-[#666]">
                {{ stat.label }}
              </p>
              <p
                class="w-full whitespace-nowrap text-[20px] leading-[1.5]"
                :class="colorClass[stat.color ?? 'white']"
              >
                {{ stat.value }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <button
            v-if="showClaimTokens"
            class="inline-flex items-center justify-center rounded-full border border-[#156bb7] bg-[#226062] px-6 py-3 text-[18px] font-semibold uppercase leading-[1.5] text-white shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-colors hover:bg-[#2a7578]"
          >
            Claim tokens
          </button>
          <button
            v-if="showVote"
            class="inline-flex items-center justify-center rounded-full border border-[#156bb7] bg-[rgba(255,153,0,0.38)] px-6 py-3 text-[18px] font-semibold uppercase leading-[1.5] text-white shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-colors hover:bg-[rgba(255,153,0,0.55)]"
          >
            Vote
          </button>
          <button
            v-if="showReinvest"
            class="inline-flex items-center justify-center rounded-full border border-[#156bb7] bg-[rgba(43,206,212,0.38)] px-6 py-3 text-[18px] font-semibold uppercase leading-[1.5] text-white shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-colors hover:bg-[rgba(43,206,212,0.55)]"
          >
            Reinvest funds
          </button>
          <button
            v-if="showClaimToWallet"
            class="inline-flex items-center justify-center rounded-full border border-[#156bb7] bg-transparent px-6 py-3 text-[18px] font-semibold uppercase leading-[1.5] text-white shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-colors hover:bg-white/5"
          >
            Claim to wallet
          </button>
          <NuxtLink
            v-if="showViewDetails"
            :to="detailsHref"
            class="inline-flex items-center justify-center rounded-full border border-[#156bb7] bg-transparent px-6 py-3 text-[18px] font-semibold uppercase leading-[1.5] text-white shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-colors hover:bg-white/5"
          >
            View details
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
