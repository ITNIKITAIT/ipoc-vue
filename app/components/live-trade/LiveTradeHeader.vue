<script setup lang="ts">
import { Share } from "lucide-vue-next"
</script>

<template>
  <div class="flex gap-6 items-start w-full">
    <div class="relative shrink-0 size-[72px] border-2 border-[#1a7c7f] rounded-sm overflow-hidden">
      <img src="/previews/3.png" alt="Sneaker-Yield Bro" class="size-full object-cover">
    </div>

    <div class="flex flex-col flex-1 gap-2">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-2 text-white">
          <h1 class="text-[32px] font-bold leading-[1.3]">Sneaker-Yield Bro</h1>
          <span class="text-[20px] leading-[1.5]">($SYB)</span>
        </div>
        <div class="flex gap-4 items-center shrink-0">
          <button class="border border-white rounded-full p-3 flex items-center justify-center">
            <img src="/icons/website.svg" alt="Website" width="24" height="24">
          </button>
          <button class="border border-white rounded-full p-3 flex items-center justify-center">
            <img src="/icons/in.svg" alt="LinkedIn" width="24" height="24">
          </button>
          <button class="border border-white rounded-full p-3 flex items-center justify-center">
            <img src="/icons/X.svg" alt="X" width="24" height="24">
          </button>
          <button class="border border-white rounded-full p-3 flex items-center justify-center">
            <Share :size="24" class="text-white" />
          </button>
        </div>
      </div>
      <div class="flex gap-2 items-center">
        <div class="flex items-center gap-2 bg-[#0080ff] px-3 py-2 rounded-lg">
          <UiSvgIcon src="/icons/lin-cart.svg" class="size-4 text-white" />
          <span class="text-xs font-bold text-white">Live Trading</span>
        </div>
        <div class="flex items-center gap-2 bg-[#d9d8d8] px-3 py-2 rounded-lg">
          <img src="/icons/defi.svg" alt="" width="16" height="16">
          <span class="text-xs text-[#002147]">DeFi</span>
        </div>
      </div>
      <p class="text-[20px] font-medium text-white leading-[1.5]">Walk to earn, powered by Web3.</p>
    </div>
  </div>
</template>
