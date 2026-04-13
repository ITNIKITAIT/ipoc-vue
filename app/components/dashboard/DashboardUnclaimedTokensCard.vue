<script setup lang="ts">
const tokens = [
  { name: "Therapy Dog Coin", amount: "$250" },
  { name: "Sneaker-Yield Bro", amount: "$200" },
]
</script>

<template>
  <div class="flex flex-col gap-4 rounded-3xl border border-[#1a1a1a] bg-[#1a1a1a] p-6">
    <p class="text-base font-medium leading-[1.5] text-white">Unclaimed tokens</p>
    <p class="text-[32px] font-semibold leading-[1.28] tracking-tight text-brand-secondary-50">$450.00</p>

    <div class="flex flex-col gap-2">
      <div
        v-for="token in tokens"
        :key="token.name"
        class="flex items-center justify-between text-sm leading-[1.5]"
      >
        <span class="text-white">{{ token.name }}</span>
        <span class="text-white">{{ token.amount }}</span>
      </div>
    </div>

    <button class="w-full rounded-full bg-brand-secondary-50 px-6 py-3 text-base font-semibold uppercase text-[#002147] hover:bg-brand-secondary-30">
      Claim All Tokens
    </button>
  </div>
</template>
