<script setup lang="ts">
defineProps<{
  currentStep: 1 | 2 | 3 | 4
}>()

const steps = [
  { number: 1, label: "Identity" },
  { number: 2, label: "Funding & Vesting" },
  { number: 3, label: "Milestones" },
  { number: 4, label: "Review" },
]
</script>

<template>
  <div class="flex flex-wrap gap-x-6 gap-y-4 items-center justify-center">
    <div v-for="{ number, label } in steps" :key="number" class="flex gap-2 items-center">
      <div
        :class="[
          'flex items-center justify-center rounded-full size-6 shrink-0 text-sm font-semibold leading-none',
          number < currentStep || number === currentStep
            ? 'bg-white text-[#002147]'
            : 'border border-white text-white',
        ]"
      >
        <svg
          v-if="number < currentStep"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="block"
        >
          <path
            d="M2 7L5.5 10.5L12 3.5"
            stroke="#002147"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span v-else class="block leading-none">{{ number }}</span>
      </div>
      <span class="text-sm text-white">{{ label }}</span>
    </div>
  </div>
</template>
