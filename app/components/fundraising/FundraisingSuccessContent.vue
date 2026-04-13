<script setup lang="ts">
const summaryRows = [
  { label: "Amount paid", value: "$500 USDT", color: "text-white" },
  { label: "Tokens received", value: "10,000 SYB", color: "text-[#2bced4]" },
  { label: "Token price", value: "$0.05 / token", color: "text-white" },
  { label: "Vesting schedule", value: "Cliff + Linear", color: "text-white" },
  { label: "First claim available", value: "Sep 20, 2026", color: "text-[#f90]" },
]

const nextSteps = [
  "Your tokens are secured in the vault. Claim them when your vesting schedule unlocks.",
  "Token is now live on PancakeSwap. Trading has begun.",
  "Watch the milestones tab and vote on fund releases as the founder delivers work.",
]
</script>

<template>
  <div class="flex flex-col gap-6 items-center w-full">
    <div class="flex flex-col gap-2 items-center justify-center px-20">
      <img src="/images/checkmark.png" alt="Success" width="96" height="96">
      <h2 class="text-[32px] font-bold text-[#c0f0f2] leading-[1.3]">Contribution successful</h2>
      <p class="text-sm text-[#c0f0f2] leading-[1.5] text-center">The raise has hit 100%. Your tokens are secured in the vault and will be available to claim based on your vesting schedule.</p>
    </div>

    <div class="border-2 border-[#666] rounded-2xl p-6 w-full flex flex-col gap-2.5">
      <p class="text-lg font-semibold text-white uppercase tracking-wide leading-[1.5]">Your contribution summary</p>
      <div class="flex flex-col gap-6">
        <div v-for="row in summaryRows" :key="row.label" class="flex gap-6 items-center w-full">
          <p class="text-base font-medium text-white leading-[1.5] whitespace-nowrap">{{ row.label }}</p>
          <div class="flex-1 border-b border-dashed border-[#2bced4]" />
          <p :class="['text-base font-medium leading-[1.5] text-right whitespace-nowrap', row.color]">{{ row.value }}</p>
        </div>
      </div>
    </div>

    <div class="border-2 border-[#666] rounded-2xl p-6 w-full flex flex-col gap-2.5">
      <p class="text-lg font-semibold text-white uppercase tracking-wide leading-[1.5]">What happens next</p>
      <div v-for="(step, i) in nextSteps" :key="i" class="flex gap-6 items-center w-full">
        <div class="size-6 rounded-full border-2 border-[#2bced4] bg-[#1a1a1a] flex items-center justify-center shrink-0">
          <span class="text-sm text-[#2bced4] leading-[1.5]">{{ i + 1 }}</span>
        </div>
        <p class="text-base font-medium text-white leading-[1.5] flex-1">{{ step }}</p>
      </div>
    </div>

    <div class="flex flex-col gap-2 items-center py-2">
      <p class="text-base font-medium text-white leading-[1.5]">Funds are held in a secure vault and released only after milestone approval by the community.</p>
      <p class="text-base font-medium text-[#f90] leading-[1.5] text-center">You are participating in an early-stage project. Returns are not guaranteed.</p>
    </div>
  </div>
</template>
