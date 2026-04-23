<script setup lang="ts">
import { Upload } from "lucide-vue-next"

const summaryRows = [
  { label: "You contributed", value: "500 USDT", color: "text-white" },
  { label: "LP staging returned", value: "62.50 USDT", color: "text-[#f2f2f2]" },
  { label: "IPOC fee (non-refundable)", value: "\u2212$12.50 USDT", color: "text-[#2bced4]" },
  { label: "Total available", value: "$487.50 USDT", color: "text-[#2bced4]" },
]
</script>

<template>
  <div class="bg-black rounded-2xl p-6 flex flex-col gap-6 w-full">
    <div class="flex flex-col gap-2">
      <p class="text-lg font-semibold text-white uppercase tracking-wide leading-[1.5]">Your funds are available</p>
      <p class="text-base font-medium text-[#666] leading-[1.5]">The raise did not reach its target. Choose what to do.</p>
    </div>

    <div class="flex flex-col gap-4">
      <div v-for="row in summaryRows" :key="row.label" class="flex items-start justify-between gap-4 pb-2 border-b border-[#1a1a1a]">
        <p class="text-base font-medium text-[#666] leading-[1.5] whitespace-nowrap">{{ row.label }}</p>
        <p :class="['text-base font-medium leading-[1.5] whitespace-nowrap', row.color]">{{ row.value }}</p>
      </div>
    </div>

    <p class="text-base font-medium text-[#666] leading-[1.5]">CHOOSE WHAT TO DO — NO EXPIRY</p>

    <div class="bg-[#1a1a1a] border-2 border-[#333] rounded-lg p-4 flex flex-col gap-6">
      <div class="flex gap-4 items-start w-full">
        <div class="size-12 shrink-0 rounded-full border border-[#333] bg-[#1a1a1a] flex items-center justify-center shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.25)]">
          <UiSvgIcon src="/icons/investor.svg" class="size-6 text-white" />
        </div>
        <div class="flex flex-col gap-2 flex-1">
          <p class="text-base font-medium text-[#d9d8d8] leading-[1.5]">Reinvest / Redirect</p>
          <p class="text-sm text-[#666] leading-[1.5]">Move your funds to another active fundraising project. Keep your capital working.</p>
        </div>
      </div>
      <button class="relative w-full flex items-center justify-center px-6 py-3 rounded-full overflow-hidden shadow-[0px_0px_2px_0px_rgba(0,0,0,0.1),0px_1px_8px_0px_rgba(0,0,0,0.1)]">
        <div class="absolute inset-0 backdrop-blur-[6px] bg-[rgba(43,206,212,0.4)] rounded-full" />
        <div class="absolute inset-0 rounded-full shadow-[inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.75),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.8),inset_1px_1px_1px_0.5px_rgba(255,255,255,0.75),inset_-1px_-1px_1px_0.5px_rgba(255,255,255,0.75),inset_0px_0px_1px_1px_rgba(255,255,255,0.15),inset_0px_0px_1px_1px_#999,inset_0px_0px_16px_0px_#f2f2f2]" />
        <span class="relative z-10 text-[18px] font-semibold text-white uppercase tracking-normal leading-[1.5] text-nowrap">Reinvest funds</span>
      </button>
    </div>

    <div class="bg-[#1a1a1a] border-2 border-[#333] rounded-lg p-4 flex flex-col gap-6">
      <div class="flex gap-4 items-start w-full">
        <div class="size-12 shrink-0 rounded-full border border-[#333] bg-[#1a1a1a] flex items-center justify-center shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.25)]">
          <Upload :size="24" class="text-[#d9d8d8]" />
        </div>
        <div class="flex flex-col gap-2 flex-1">
          <p class="text-base font-medium text-[#d9d8d8] leading-[1.5]">Claim refund</p>
          <p class="text-sm text-[#666] leading-[1.5]">Withdraw your full amount back to your Privy wallet. Funds arrive immediately.</p>
        </div>
      </div>
      <button class="relative w-full flex items-center justify-center px-6 py-3 rounded-full overflow-hidden shadow-[0px_0px_2px_0px_rgba(0,0,0,0.1),0px_1px_8px_0px_rgba(0,0,0,0.1)]">
        <div class="absolute inset-0 backdrop-blur-[6px] bg-black rounded-full" />
        <div class="absolute inset-0 rounded-full shadow-[inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.75),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.8),inset_1px_1px_1px_0.5px_rgba(255,255,255,0.75),inset_-1px_-1px_1px_0.5px_rgba(255,255,255,0.75),inset_0px_0px_1px_1px_rgba(255,255,255,0.15),inset_0px_0px_1px_1px_#999,inset_0px_0px_16px_0px_#f2f2f2]" />
        <span class="relative z-10 text-[18px] font-semibold text-[#666] uppercase tracking-normal leading-[1.5] text-nowrap">Claim to my wallet</span>
      </button>
    </div>

    <p class="text-sm text-[#666] leading-[1.5] text-center">Both options are permanent and have no expiry. Your funds are safe until you decide</p>
  </div>
</template>
