<script setup lang="ts">
import { Info, ChevronDown } from "lucide-vue-next"
</script>

<template>
  <div class="bg-black rounded-2xl p-6 flex flex-col gap-6 w-full">
    <div class="flex flex-col gap-2">
      <p class="text-lg font-semibold text-white uppercase tracking-wide leading-[1.5]">Contribute to this project</p>
      <p class="text-base font-medium text-[#666] leading-[1.5]">Connect your wallet to contribute</p>
    </div>

    <div class="opacity-40 flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <p class="text-xs text-[#d9d8d8] leading-[1.5]">Amount to contribute</p>
        <div class="flex items-center border border-[#333] rounded-2xl bg-[#1a1a1a] overflow-hidden shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.25)]">
          <div class="flex items-center gap-2 px-3 h-12 border-r border-white/20 shrink-0">
            <span class="text-white text-base leading-[1.7]">USDT</span>
            <ChevronDown :size="16" class="text-white" />
          </div>
          <div class="flex-1 px-3 py-2">
            <p class="text-[#d9d8d8] text-base leading-[1.7]">Enter Amount</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-0">
        <p class="text-xs text-[#d9d8d8] leading-[1.5]">Tokens you will receive</p>
        <p class="text-base font-medium text-[#d9d8d8] leading-[1.5]">0 SYB</p>
      </div>
      <div class="flex flex-col gap-0">
        <div class="flex items-center justify-between">
          <p class="text-xs text-[#d9d8d8] leading-[1.5]">Vesting</p>
          <Info :size="20" class="text-[#d9d8d8]" />
        </div>
        <p class="text-base font-medium text-[#d9d8d8] leading-[1.5]">6-month cliff → 12-month linear</p>
      </div>
    </div>

    <p class="text-sm text-[#d9d8d8] leading-[1.5]">No wallet? No problem. Connect via Privy using email or social login — no browser extension needed.</p>

    <button class="relative w-full flex items-center justify-center px-6 py-3 rounded-full overflow-hidden shadow-[0px_0px_2px_0px_rgba(0,0,0,0.1),0px_1px_8px_0px_rgba(0,0,0,0.1)]">
      <div class="absolute inset-0 backdrop-blur-md bg-[rgba(43,206,212,0.38)]" />
      <div class="absolute inset-0 shadow-[inset_1px_1px_1px_0.5px_rgba(255,255,255,0.75),inset_-1px_-1px_1px_0.5px_rgba(255,255,255,0.75),inset_0px_0px_1px_1px_rgba(255,255,255,0.15),inset_0px_0px_16px_0px_#f2f2f2] rounded-full" />
      <span class="relative z-10 text-base font-semibold text-white uppercase tracking-normal leading-[1.5] text-nowrap">Connect wallet to contribute</span>
    </button>
  </div>
</template>
