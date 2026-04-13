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
      'flex w-full flex-col gap-4 rounded-2xl bg-[#1a1a1a] p-6',
      urgent && 'border border-[rgba(230,0,0,0.3)]',
    )"
  >
    <div v-if="urgent" class="flex items-center justify-between">
      <div class="flex items-center gap-2 text-sm font-medium text-[#ff9900]">
        <Zap class="size-4" />
        Urgent — closes soon
      </div>
      <span class="text-sm text-[#666]">{{ timeRemaining }} remaining</span>
    </div>

    <div class="flex gap-[23px]">
      <div class="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-[#333] bg-transparent p-3">
        <UiSvgIcon src="/icons/investor.svg" class="size-6 text-white" />
      </div>

      <div class="flex flex-1 flex-col gap-4">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <p class="text-2xl font-semibold leading-[1.28] tracking-tight text-white">{{ projectName }}</p>
            <p class="text-sm leading-[1.5] text-[#666]">{{ milestoneLabel }}</p>
          </div>
          <div class="flex flex-col items-end">
            <p class="text-2xl font-semibold leading-[1.28] tracking-tight text-white">{{ votingPower }} votes</p>
            <p class="text-sm text-[#666]">Your voting power</p>
          </div>
        </div>

        <div class="flex flex-col gap-3 rounded-2xl bg-[rgba(51,51,51,0.38)] px-6 py-4">
          <p class="text-sm text-[#666]">Milestone details</p>
          <p class="text-base font-medium leading-[1.5] text-white">{{ milestoneDetails }}</p>
          <div class="flex gap-4">
            <div class="flex flex-1 flex-col gap-1">
              <p class="text-sm text-[#666]">Amount:</p>
              <p class="text-base font-bold text-white">{{ amount }}</p>
            </div>
            <div class="flex flex-1 flex-col gap-1">
              <p class="text-sm text-[#666]">Vault balance:</p>
              <p class="text-base font-bold text-white">{{ vaultBalance }}</p>
            </div>
            <div class="flex flex-1 flex-col gap-1">
              <p class="text-sm text-[#666]">Quorum:</p>
              <p class="text-base font-bold text-white">{{ quorum }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between text-base font-bold">
            <span class="text-brand-secondary-50">Yes — {{ yesPercentage }}%</span>
            <span class="text-[#e60000]">No — {{ noPercentage }}%</span>
          </div>
          <div class="flex h-3 w-full overflow-hidden rounded-full">
            <div class="h-full bg-brand-secondary-50" :style="{ width: `${yesPercentage}%` }" />
            <div class="h-full bg-[#e60000]" :style="{ width: `${noPercentage}%` }" />
          </div>
          <p v-if="quorumNote" class="text-sm text-[#666]">{{ quorumNote }}</p>
        </div>

        <div class="flex gap-4">
          <button class="rounded-full bg-brand-secondary-50 px-6 py-3 text-base font-semibold uppercase text-[#002147] hover:bg-brand-secondary-30">
            Vote Yes
          </button>
          <button class="rounded-full bg-[#e60000] px-6 py-3 text-base font-semibold uppercase text-white hover:bg-[#cc0000]">
            Vote No
          </button>
          <button class="rounded-full border border-[#333] px-6 py-3 text-base font-semibold uppercase text-white hover:bg-white/5">
            View Proof
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
