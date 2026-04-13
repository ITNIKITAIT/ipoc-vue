<script setup lang="ts">
const votes = [
  { name: "Therapy Dog Coin", timeLeft: "2d 8h left" },
  { name: "Sneaker-Yield Bro", timeLeft: "2d 8h left" },
]
</script>

<template>
  <div class="flex flex-col gap-4 rounded-3xl border border-[#1a1a1a] bg-[#1a1a1a] p-6">
    <p class="text-base font-medium leading-[1.5] text-white">Active votes</p>
    <p class="text-[32px] font-semibold leading-[1.28] tracking-tight text-brand-secondary-50">2</p>
    <p class="text-sm leading-[1.5] text-[#666]">Milestone votes needing action</p>

    <div class="flex flex-col gap-2 rounded-lg bg-[rgba(51,51,51,0.38)] p-3">
      <div
        v-for="vote in votes"
        :key="vote.name"
        class="flex items-center justify-between text-sm leading-[1.5]"
      >
        <span class="text-white">{{ vote.name }}</span>
        <span class="rounded bg-[rgba(255,153,0,0.3)] px-2 py-0.5 text-xs text-[#ff9900]">
          {{ vote.timeLeft }}
        </span>
      </div>
    </div>
  </div>
</template>
