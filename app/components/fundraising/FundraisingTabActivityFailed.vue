<script setup lang="ts">
const contributions = [
  { wallet: "0x4f2\u2026a91c", amount: "500 USDT", tokens: "10,000" },
  { wallet: "0x8b1\u2026d34f", amount: "250 USDT", tokens: "5,000" },
  { wallet: "0x2c9\u2026e77b", amount: "1,000 USDT", tokens: "20,000" },
  { wallet: "0x7a3\u2026b12d", amount: "100 USDT", tokens: "2,000" },
]
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <p class="text-base font-medium text-white leading-[1.5]">Recent contributions to this project</p>
    <div class="flex flex-col gap-4 px-6 py-4 w-full">
      <div class="flex gap-10 items-start text-sm font-bold text-[#666] leading-[1.5]">
        <span class="w-[150px]">Wallet</span>
        <span class="w-[150px]">Amount</span>
        <span class="w-[150px]">Tokens</span>
        <span class="flex-1 text-right">Status</span>
      </div>
      <div v-for="(row, i) in contributions" :key="i" class="flex gap-10 items-start text-base font-medium leading-[1.5]">
        <span class="w-[150px] text-[#666]">{{ row.wallet }}</span>
        <span class="w-[150px] text-[#2bced4]">{{ row.amount }}</span>
        <span class="w-[150px] text-white">{{ row.tokens }}</span>
        <span class="flex-1 text-right text-[#f90]">Refundable</span>
      </div>
    </div>
  </div>
</template>
