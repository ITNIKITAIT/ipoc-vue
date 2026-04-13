<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next"

const actions = [
  {
    title: "Submit milestone proof",
    description: "NovaTech AI — Milestone 2",
    time: "5h 20m left",
  },
  {
    title: "Vote closing soon",
    description: "NovaTech AI — Milestone 2 vote",
    time: "5h 20m left",
  },
  {
    title: "Milestone vote upcoming",
    description: "SoundWave — Milestone 1",
    time: "Opens in 4 days",
  },
  {
    title: "Funds available to withdraw",
    description: "AstroFi Launch — Milestone 1 passed",
    time: "$150,000 USDT ready",
  },
]
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <p class="text-xl leading-[1.5] text-white">Pending Action</p>

    <div
      v-for="(action, i) in actions"
      :key="i"
      class="flex items-center gap-2 rounded-lg bg-[#1a1a1a] p-4"
    >
      <div class="flex shrink-0 items-center rounded-lg border border-[#156bb7] bg-[#002147] p-4">
        <UiSvgIcon src="/icons/vote.svg" class="size-8 text-white" />
      </div>
      <div class="flex flex-1 flex-col leading-[1.5]">
        <p class="text-xl text-white">{{ action.title }}</p>
        <p class="text-base font-medium text-white">{{ action.description }}</p>
        <p class="text-base font-medium text-[#ff9900]">{{ action.time }}</p>
      </div>
      <ChevronRight class="size-8 shrink-0 text-white" />
    </div>
  </div>
</template>
