<script setup lang="ts">
const contributions = [
  { wallet: "0x91A...", amount: "contributed 250 USDT \u2192 5,000 SYB", timeAgo: "10 mins ago", isOwn: true },
  { wallet: "0x8F2...", amount: "contributed 100 USDT \u2192 2,000 SYB", timeAgo: "3 hrs ago", isOwn: false },
  { wallet: "0xAA1...", amount: "contributed 500 USDT \u2192 10,000 SYB", timeAgo: "10 hrs ago", isOwn: false },
]
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex flex-col gap-0 w-full px-6">
      <p class="text-[20px] font-bold text-white leading-[1.4]">Recent Contributions</p>
      <p class="text-base font-medium text-white leading-[1.5]">Live contributions from other investors in this project.</p>
    </div>
    <div class="flex flex-col gap-4 px-6 py-4 w-full">
      <div class="flex gap-10 items-start text-sm font-bold text-white leading-[1.5]">
        <span class="w-[132px]">Wallet</span>
        <span class="w-[350px]">Amount</span>
        <span class="whitespace-nowrap">Time ago</span>
      </div>
      <div
        v-for="(row, i) in contributions"
        :key="i"
        :class="['flex gap-10 items-center text-base font-medium text-white leading-[1.5]', row.isOwn ? 'bg-[#2BCED430] rounded border-l-[8px] border-[#2bced4]' : '']"
      >
        <span class="w-[100px] px-4">{{ row.wallet }}</span>
        <span class="w-[350px]">{{ row.amount }}</span>
        <span class="whitespace-nowrap">{{ row.timeAgo }}</span>
      </div>
    </div>
  </div>
</template>
