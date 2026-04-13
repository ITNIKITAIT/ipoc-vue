<script setup lang="ts">
import { Info, ChevronDown } from "lucide-vue-next"

const presets = ["25%", "50%", "75%", "MAX%"]
</script>

<template>
  <div class="bg-black rounded-2xl p-6 flex flex-col gap-6 w-full">
    <p class="text-lg font-semibold text-white uppercase tracking-wide leading-[1.5]">Contribute to this project</p>

    <div class="flex items-start justify-between leading-[1.5]">
      <div class="flex flex-col">
        <span class="text-xs text-[#666]">Connected</span>
        <span class="text-base font-medium text-[#d9d8d8]">0x8xSk...Lnw3x</span>
      </div>
      <div class="flex flex-col">
        <span class="text-xs text-[#666]">Balance</span>
        <span class="text-base font-medium text-[#d9d8d8]">1,250 USDT</span>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="flex flex-col gap-2">
        <p class="text-xs text-[#d9d8d8] leading-[1.5]">You pay</p>
        <div class="flex items-center border border-[#333] rounded-full bg-[#1a1a1a] overflow-hidden shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.25)]">
          <div class="flex items-center gap-2 px-3 h-12 border-r border-white/20 shrink-0">
            <span class="text-white text-base leading-[1.7]">USDT</span>
            <ChevronDown :size="16" class="text-white" />
          </div>
          <div class="flex-1 px-3 py-2">
            <p class="text-[#d9d8d8] text-base leading-[1.7]">Enter amount</p>
          </div>
        </div>
        <p class="text-xs text-[#d9d8d8] leading-[1.5] text-right">(min $50 — max $5,000)</p>
      </div>
      <div class="flex items-center justify-end py-3">
        <div class="flex gap-2">
          <button v-for="p in presets" :key="p" class="relative px-4 py-1 rounded-full text-sm text-white leading-[1.5]">
            <div class="absolute inset-0 bg-[#1a1a1a] rounded-full" />
            <div class="absolute inset-0 rounded-full shadow-[inset_1px_1px_3px_0px_rgba(0,0,0,0.25)]" />
            <span :class="['relative z-10', p === 'MAX%' ? 'font-bold' : '']">{{ p }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap gap-y-6 justify-between leading-[1.5]">
      <div class="flex flex-col text-[#d9d8d8]">
        <span class="text-xs">You receive (est.)</span>
        <span class="text-base font-medium">0 SYB</span>
      </div>
      <div class="flex flex-col text-[#d9d8d8]">
        <span class="text-xs">Fixed price</span>
        <span class="text-base font-medium">$0.05 per token</span>
      </div>
      <div class="flex flex-col">
        <span class="text-xs text-[#d9d8d8]">First claim</span>
        <span class="text-base font-medium text-[#f90]">Sep 20, 2026</span>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="flex items-start justify-between">
        <p class="text-xs text-[#d9d8d8] leading-[1.5]">Vesting schedule</p>
        <Info :size="24" class="text-[#d9d8d8]" />
      </div>
      <p class="text-base font-medium text-[#d9d8d8] leading-[1.5]">6-month cliff → 12-month linear</p>
    </div>

    <button class="relative w-full flex items-center justify-center px-6 py-3 rounded-full overflow-hidden shadow-[0px_0px_2px_0px_rgba(0,0,0,0.1),0px_1px_8px_0px_rgba(0,0,0,0.1)]">
      <div class="absolute inset-0 backdrop-blur-md bg-[rgba(43,206,212,0.4)] rounded-full" />
      <div class="absolute inset-0 shadow-[inset_1px_1px_1px_0.5px_rgba(255,255,255,0.75),inset_-1px_-1px_1px_0.5px_rgba(255,255,255,0.75),inset_0px_0px_1px_1px_rgba(255,255,255,0.15),inset_0px_0px_16px_0px_#f2f2f2] rounded-full" />
      <span class="relative z-10 text-lg font-semibold text-white uppercase tracking-normal leading-[1.5] text-nowrap">Contribute</span>
    </button>
  </div>
</template>
