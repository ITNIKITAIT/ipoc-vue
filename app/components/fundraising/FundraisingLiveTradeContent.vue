<script setup lang="ts">
import { Loader2 } from "lucide-vue-next"

const steps = [
  { text: "Contribution confirmed on-chain", completed: true },
  { text: "Liquidity pool created on PancakeSwap", completed: true },
  { text: "Activating trading mode...", completed: false },
]
</script>

<template>
  <div class="flex flex-col gap-6 items-center w-[624px] mx-auto">
    <div class="flex flex-col gap-2 items-center justify-center">
      <div class="relative size-[111px] flex items-center justify-center">
        <div class="size-[96px] rounded-full border-2 border-[#2bced4] overflow-hidden relative">
          <img src="/images/sneaker.jpg" alt="Token" class="size-full object-cover">
        </div>
      </div>
      <h2 class="text-[32px] font-bold text-[#c0f0f2] leading-[1.3]">Token going live</h2>
      <p class="text-sm text-[#c0f0f2] leading-[1.5] text-center w-[414px]">Trading mode is activating. This takes just a moment — please do not close this page.</p>
    </div>

    <div v-for="(step, i) in steps" :key="i" class="bg-[rgba(17,82,85,0.38)] rounded-2xl p-4 w-full flex flex-col">
      <div class="flex gap-6 items-center w-full">
        <img v-if="step.completed" src="/images/checkmark.png" alt="Done" width="32" height="32">
        <Loader2 v-else :size="32" class="text-[#2bced4] animate-spin" />
        <div class="flex flex-col gap-4 flex-1">
          <p class="text-[20px] text-white leading-[1.5]">{{ step.text }}</p>
          <div class="h-0.5 w-full bg-[#2bced4] rounded-full" />
        </div>
      </div>
    </div>

    <div class="bg-[#ffcc80] rounded-2xl p-6 w-full text-center">
      <p class="text-[20px] text-[#1a1a1a] leading-[1.5]">Do not close or refresh this page.</p>
      <p class="text-[20px] text-[#1a1a1a] leading-[1.5]">Your transaction is being processed on-chain.</p>
    </div>

    <div class="flex flex-col gap-2 items-center p-6">
      <p class="text-base font-medium text-[#666] leading-[1.5]">Funds are vault-secured and released only after community approval.</p>
      <p class="text-sm text-[#f90] leading-[1.5] text-center">You are participating in an early-stage project. Returns are not guaranteed.</p>
    </div>
  </div>
</template>
