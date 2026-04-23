<script setup lang="ts">
const votes = [
  { name: "Therapy Dog Coin", timeLeft: "2d 8h left" },
  { name: "Sneaker-Yield Bro", timeLeft: "2d 8h left" },
]
</script>

<template>
  <div class="flex h-full flex-col gap-4 rounded-2xl border border-[#1a1a1a] bg-[#1a1a1a] p-6">
    <p class="text-base font-medium leading-[1.5] text-white">Active votes</p>
    <p class="text-[32px] font-semibold leading-[1.28] tracking-[-0.16px] text-semantic-warning">2</p>
    <p class="text-sm leading-[1.5] text-white">Milestone votes needing action</p>

    <div
      class="flex flex-col gap-4 rounded-2xl border border-semantic-warning bg-[rgba(255,153,0,0.12)] p-6"
    >
      <div
        v-for="vote in votes"
        :key="vote.name"
        class="flex items-start gap-2 text-sm leading-[1.5]"
      >
        <p class="flex-1 text-white">{{ vote.name }}</p>
        <p class="whitespace-nowrap text-semantic-warning">{{ vote.timeLeft }}</p>
      </div>
    </div>
  </div>
</template>
