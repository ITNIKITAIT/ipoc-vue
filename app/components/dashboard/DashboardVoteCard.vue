<script setup lang="ts">
import { Zap } from "lucide-vue-next"

withDefaults(defineProps<{
  projectName: string
  milestoneLabel: string
  votingPower: string
  timeRemaining: string
  milestoneDetails: string
  amount: string
  vaultBalance: string
  quorum: string
  yesPercentage: number
  noPercentage: number
  quorumNote?: string
  urgent?: boolean
}>(), {
  urgent: true,
})
</script>

<template>
  <div
    :class="cn(
      'flex w-full flex-col rounded-2xl bg-[#1a1a1a] pt-0 pb-6 px-0 overflow-hidden',
      urgent && 'border border-semantic-warning',
    )"
  >
    <div
      :class="cn(
        'flex items-start justify-between p-6 text-base font-medium leading-[1.5] text-white',
        urgent && 'bg-[rgba(255,153,0,0.12)]',
      )"
    >
      <div class="flex items-center gap-2">
        <span>⚡</span>
        <span>Urgent — closes soon</span>
      </div>
      <span>{{ timeRemaining }} remaining</span>
    </div>

    <div class="flex gap-[23px] p-6">
      <div class="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-[#333] bg-[#1a1a1a] p-3 shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.25)]">
        <UiSvgIcon src="/icons/investor.svg" class="size-6 text-white" />
      </div>

      <div class="flex min-w-0 flex-1 flex-col gap-4">
        <div class="flex items-center justify-between gap-4">
          <div class="flex flex-col">
            <p class="text-[24px] font-semibold leading-[1.28] tracking-[-0.12px] text-white">
              {{ projectName }}
            </p>
            <p class="text-sm leading-[1.5] text-[#d9d8d8]">{{ milestoneLabel }}</p>
          </div>
          <div class="flex flex-col items-end">
            <p class="text-[24px] font-semibold leading-[1.28] tracking-[-0.12px] text-[#d9d8d8]">
              {{ votingPower }} votes
            </p>
            <p class="text-sm leading-[1.5] text-[#d9d8d8]">Your voting power</p>
          </div>
        </div>

        <div class="flex flex-col gap-4 rounded-2xl bg-[rgba(51,51,51,0.38)] p-6">
          <div class="flex flex-col gap-1">
            <p class="text-base font-medium leading-[1.5] text-[#666]">Milestone details</p>
            <p class="text-base font-medium leading-[1.5] text-white">{{ milestoneDetails }}</p>
          </div>
          <div class="flex items-start gap-4">
            <div class="flex flex-1 flex-col gap-1">
              <p class="text-base font-medium leading-[1.5] text-[#666]">Amount:</p>
              <p class="text-[20px] leading-[1.5] text-white">{{ amount }}</p>
            </div>
            <div class="flex flex-1 flex-col gap-1">
              <p class="text-base font-medium leading-[1.5] text-[#666]">Vault balance:</p>
              <p class="text-[20px] leading-[1.5] text-white">{{ vaultBalance }}</p>
            </div>
            <div class="flex flex-1 flex-col gap-1">
              <p class="text-base font-medium leading-[1.5] text-[#666]">Quorum:</p>
              <p class="text-[20px] leading-[1.5] text-white">{{ quorum }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex items-end justify-between text-base font-bold leading-[1.5]">
            <span class="text-brand-secondary-50">Yes — {{ yesPercentage }}%</span>
            <span class="text-semantic-error">No — {{ noPercentage }}%</span>
          </div>
          <div class="flex h-4 w-full overflow-hidden rounded-full">
            <div class="h-full bg-brand-secondary-70" :style="{ width: `${yesPercentage}%` }" />
            <div class="h-full bg-semantic-error" :style="{ width: `${noPercentage}%` }" />
          </div>
          <p v-if="quorumNote" class="text-base font-medium leading-[1.5] text-[#666]">
            {{ quorumNote }}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <button
            class="inline-flex items-center justify-center rounded-full border border-[#156bb7] bg-[rgba(43,206,212,0.38)] px-6 py-3 text-[18px] font-semibold uppercase leading-[1.5] text-white shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-colors hover:bg-[rgba(43,206,212,0.55)]"
          >
            Vote yes
          </button>
          <button
            class="inline-flex items-center justify-center rounded-full border border-[#156bb7] bg-[rgba(230,0,0,0.38)] px-6 py-3 text-[18px] font-semibold uppercase leading-[1.5] text-white shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-colors hover:bg-[rgba(230,0,0,0.55)]"
          >
            Vote no
          </button>
          <button
            class="inline-flex items-center justify-center rounded-full border border-[#156bb7] bg-transparent px-6 py-3 text-[18px] font-semibold uppercase leading-[1.5] text-white shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-colors hover:bg-white/5"
          >
            View proof
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
