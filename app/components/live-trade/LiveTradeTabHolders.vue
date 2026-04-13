<script setup lang="ts">
const holders = [
  { account: "8xSk...Lnw3x", share: "12.1%", tokens: "20.0M SYB", role: "LP / Liquidity", since: "Day 2" },
  { account: "Founder Wallet \u00b7 Verified", share: "18.0%", tokens: "30.0M SYB", role: "Team (Vesting)", since: "Genesis" },
  { account: "7xSk...Lnw5z", share: "10.7%", tokens: "18.2M SYB", role: "Community", since: "Day 4" },
  { account: "Treasury \u00b7 Locked", share: "25.0%", tokens: "41.7M SYB", role: "On-chain Treasury", since: "Launch" },
  { account: "5xSk...Lnw7b", share: "11.4%", tokens: "21.3M SYB", role: "LP / Liquidity", since: "Day 6" },
  { account: "4xSk...Lnw8c", share: "14.9%", tokens: "30.0M SYB", role: "LP / Liquidity", since: "Day 7" },
]
</script>

<template>
  <div class="flex flex-col gap-6 px-4 py-6">
    <div class="flex flex-col gap-2 text-white">
      <p class="text-[20px] leading-[1.5]">Holders</p>
      <p class="text-sm leading-[1.5]">Token distribution and ownership.<br>Large holder concentration may affect price stability and governance decisions.</p>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex gap-4 items-center text-sm font-bold text-white leading-[1.5]">
        <span class="w-[191px]">Account</span>
        <span class="w-[79px]">Share</span>
        <span class="w-[100px]">Tokens</span>
        <span class="flex-1">Role</span>
        <span class="w-[80px]">Since</span>
      </div>
      <div class="flex flex-col gap-2">
        <div v-for="(h, i) in holders" :key="i" class="flex gap-4 items-center text-xs text-white leading-[1.5]">
          <span class="w-[191px]">{{ h.account }}</span>
          <span class="w-[79px]">{{ h.share }}</span>
          <span class="w-[100px]">{{ h.tokens }}</span>
          <span class="flex-1">{{ h.role }}</span>
          <span class="w-[80px]">{{ h.since }}</span>
        </div>
      </div>
    </div>
    <p class="text-sm text-white leading-[1.5]">Voting power is calculated using quadratic voting — large holders do not control outcomes alone.</p>
  </div>
</template>
