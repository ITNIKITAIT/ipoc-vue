<script setup lang="ts">
const contributions = [
  { wallet: "0x91A...", amount: "contributed 250 USDT", tokens: "10,000", timeAgo: "2 min ago" },
  { wallet: "0x8F2...", amount: "contributed 100 USDT", tokens: "4,000", timeAgo: "5 min ago" },
  { wallet: "0xAA1...", amount: "contributed 1,000 USDT", tokens: "40,000", timeAgo: "12 min ago" },
]
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex flex-col gap-0 w-full">
      <p class="text-[20px] font-bold text-white leading-[1.4]">Recent Contributions (Public)</p>
      <p class="text-base font-medium text-white leading-[1.5]">Live contributions from other investors in this project.</p>
    </div>
    <div class="flex flex-col gap-4 px-6 py-4 w-full">
      <div class="flex gap-10 items-start text-sm font-bold text-[#666]">
        <span class="w-[100px]">Wallet</span>
        <span class="w-[250px]">Amount</span>
        <span class="flex-1">Tokens</span>
        <span class="flex-1 text-right">Time ago</span>
      </div>
      <div v-for="(row, i) in contributions" :key="i" class="flex gap-10 items-start text-base text-white">
        <span class="w-[100px] font-medium">{{ row.wallet }}</span>
        <span class="w-[250px] font-medium">{{ row.amount }}</span>
        <span class="flex-1 font-medium">{{ row.tokens }}</span>
        <span class="flex-1 text-right text-sm text-[#d9d8d8]">{{ row.timeAgo }}</span>
      </div>
    </div>
  </div>
</template>
