<script setup lang="ts">
const tokens = [
  { name: "Therapy Dog Coin", amount: "$250" },
  { name: "Sneaker-Yield Bro", amount: "$200" },
]
</script>

<template>
  <div class="flex h-full flex-col gap-4 rounded-2xl border border-[#1a1a1a] bg-[#1a1a1a] p-6">
    <p class="text-base font-medium leading-[1.5] text-white">Unclaimed tokens</p>
    <p class="text-[32px] font-semibold leading-[1.28] tracking-[-0.16px] text-brand-secondary-30">
      $450.00
    </p>

    <div class="flex flex-col gap-2">
      <div
        v-for="token in tokens"
        :key="token.name"
        class="flex items-start gap-2 text-sm leading-[1.5] text-white"
      >
        <p class="flex-1">{{ token.name }}</p>
        <p class="whitespace-nowrap">{{ token.amount }}</p>
      </div>
    </div>

    <button
      class="mt-auto inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-[#156bb7] bg-[rgba(43,206,212,0.38)] px-4 py-3 text-[18px] font-semibold uppercase leading-[1.5] text-white shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-colors hover:bg-[rgba(43,206,212,0.55)]"
    >
      Claim all tokens
    </button>
  </div>
</template>
