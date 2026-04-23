<script setup lang="ts">
import { Share, TriangleAlert } from "lucide-vue-next"

withDefaults(defineProps<{
  badge?: { label: string; color: string; icon?: string }
  progressColor?: string
  fundedText?: string
  raisedAmount?: string
  targetAmount?: string
  showDeadline?: boolean
  showTokenPrice?: boolean
  investorCount?: number
  progressPercent?: number
  raisedTextColor?: string
}>(), {
  badge: () => ({ label: "Fundraising", color: "bg-green-700", icon: "/icons/launch.svg" }),
  progressColor: "#2bced4",
  fundedText: "50% funded",
  raisedAmount: "$25,000",
  targetAmount: "$50,000",
  showDeadline: true,
  showTokenPrice: true,
  investorCount: 198,
  progressPercent: 50,
  raisedTextColor: "text-white",
})
</script>

<template>
  <div class="flex gap-6 items-start w-full">
    <div class="relative shrink-0 size-[72px] border-2 border-[#1a7c7f] rounded-sm overflow-hidden">
      <img src="/previews/3.png" alt="Sneaker-Yield Bro" class="size-full object-cover">
    </div>

    <div class="flex flex-col flex-1 gap-6">
      <div class="flex items-start justify-between w-full">
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-1">
            <h1 class="text-[32px] font-bold text-white leading-[1.3]">Sneaker-Yield Bro ($SYB)</h1>
            <p class="text-[20px] font-medium text-white leading-[1.5]">Walk to earn, powered by Web3.</p>
          </div>
          <div class="flex gap-2 items-center">
            <div :class="['flex items-center gap-2 px-3 py-2 rounded-lg', badge.color]">
              <UiSvgIcon v-if="badge.icon" :src="badge.icon" class="size-4 text-white" />
              <TriangleAlert v-else :size="16" class="text-white" />
              <span class="text-xs font-bold text-white">{{ badge.label }}</span>
            </div>
            <div class="flex items-center gap-2 bg-[#d9d8d8] px-3 py-2 rounded-lg">
              <img src="/icons/defi.svg" alt="" width="16" height="16">
              <span class="text-xs text-[#002147]">DeFi</span>
            </div>
          </div>
        </div>

        <div class="flex gap-4 items-center shrink-0">
          <button class="border border-[#d9d8d8] rounded-full p-3 flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity">
            <img src="/icons/website.svg" alt="Website" width="24" height="24">
          </button>
          <button class="border border-[#d9d8d8] rounded-full p-3 flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity">
            <img src="/icons/in.svg" alt="LinkedIn" width="24" height="24">
          </button>
          <button class="border border-[#d9d8d8] rounded-full p-3 flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity">
            <img src="/icons/X.svg" alt="X" width="24" height="24">
          </button>
          <button class="border border-[#d9d8d8] rounded-full p-3 flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity">
            <Share :size="24" class="text-white" />
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-2 w-full">
        <div class="flex items-end justify-between w-full">
          <span class="text-[20px] font-bold leading-[1.5]" :style="{ color: progressColor }">{{ fundedText }}</span>
          <span :class="['text-base font-medium leading-[1.5]', raisedTextColor]">
            {{ raisedAmount }} raised <span class="text-[#666]">of {{ targetAmount }}</span>
          </span>
          <span v-if="showTokenPrice" class="text-base font-medium text-white leading-[1.5]">
            <span class="text-[#666]">Token price: </span>$0.05 fixed
          </span>
        </div>

        <div class="h-4 w-full bg-[#333] rounded-full relative overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 rounded-full" :style="{ width: `${progressPercent}%`, backgroundColor: progressColor }" />
        </div>

        <div class="flex items-center justify-between w-full text-base font-medium">
          <span v-if="showDeadline" class="text-[#ff9900] leading-[1.5]">
            12 Days left<span class="text-[#666]"> | Deadline: 30th Mar., 2026</span>
          </span>
          <span v-else />
          <span class="text-white leading-[1.5]">{{ investorCount }} investors</span>
        </div>
      </div>
    </div>
  </div>
</template>
