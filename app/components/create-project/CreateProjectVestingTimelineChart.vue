<script setup lang="ts">
import type { Step2FormValues } from "~/schemas/create-project"

type VestingKey = Step2FormValues["investorVesting"] | Step2FormValues["teamVesting"]

const props = defineProps<{
  investorVesting: Step2FormValues["investorVesting"]
  teamVesting: Step2FormValues["teamVesting"]
}>()

const PRESETS: Record<VestingKey, { cliff: number; unlock: number }> = {
  none: { cliff: 0, unlock: 0 },
  "6m": { cliff: 0, unlock: 6 },
  "6m_wait_12m": { cliff: 6, unlock: 12 },
  "12m_wait_24m": { cliff: 12, unlock: 24 },
  custom: { cliff: 12, unlock: 24 },
}

const TOTAL_MONTHS = 36
const BLOCK_WIDTH = 19
const BLOCK_GAP = 5

type BlockColor = "locked" | "unlocking-early" | "unlocking-late" | "unlocked"

const COLOR_MAP: Record<BlockColor, string> = {
  locked: "#666",
  "unlocking-early": "#c0f0f2",
  "unlocking-late": "#2bced4",
  unlocked: "#1a7c7f",
}

function getMonthColor(month: number, cliff: number, unlock: number): BlockColor {
  if (month <= cliff) return "locked"
  const unlockEnd = cliff + unlock
  if (month <= unlockEnd) {
    const progress = (month - cliff) / unlock
    return progress <= 0.25 ? "unlocking-early" : progress <= 0.5 ? "unlocking-late" : "unlocked"
  }
  return "unlocked"
}

const blocks = computed(() => {
  const { cliff, unlock } = PRESETS[props.investorVesting]
  return Array.from({ length: TOTAL_MONTHS }, (_, i) => getMonthColor(i + 1, cliff, unlock))
})

const barTotalWidth = TOTAL_MONTHS * BLOCK_WIDTH + (TOTAL_MONTHS - 1) * BLOCK_GAP

function xForMonth(month: number) {
  return (month - 1) * (BLOCK_WIDTH + BLOCK_GAP) + BLOCK_WIDTH / 2
}

const YEAR_POSITIONS = [
  { label: "1 Yr", month: 12 },
  { label: "2 Yr", month: 24 },
  { label: "3 Yr", month: 36 },
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Legend — spread across chart width to match Figma zones -->
    <div class="flex justify-between text-xs text-white" :style="{ width: `${barTotalWidth}px` }">
      <div class="flex flex-col gap-0.5">
        <span class="text-white">Locked</span>
        <span class="text-[#d9d8d8]">Tokens are not available yet</span>
      </div>
      <div class="flex flex-col gap-0.5">
        <span class="text-white">Unlocking</span>
        <span class="text-[#d9d8d8]">Tokens are released gradually</span>
      </div>
      <div class="flex flex-col gap-0.5 items-end">
        <span class="text-white">Fully unlocked</span>
        <span class="text-[#d9d8d8]">All tokens are available</span>
      </div>
    </div>

    <!-- Single vesting bar with year ticks overlaid -->
    <div class="relative" :style="{ width: `${barTotalWidth}px` }">
      <div class="flex gap-[5px]">
        <div
          v-for="(color, i) in blocks"
          :key="i"
          :style="{ width: `${BLOCK_WIDTH}px`, height: '30px', backgroundColor: COLOR_MAP[color] }"
        />
      </div>
      <div
        v-for="{ month } in YEAR_POSITIONS"
        :key="`tick-${month}`"
        class="absolute top-0 h-[46px] w-px bg-white"
        :style="{ left: `${xForMonth(month)}px` }"
      />
    </div>

    <!-- Months label on left, year labels at year positions -->
    <div class="relative text-xs text-white" :style="{ width: `${barTotalWidth}px`, height: '18px' }">
      <span class="absolute left-0 top-0">months</span>
      <span
        v-for="{ label, month } in YEAR_POSITIONS"
        :key="label"
        class="absolute top-0 -translate-x-1/2"
        :style="{ left: `${xForMonth(month)}px` }"
      >
        {{ label }}
      </span>
    </div>
  </div>
</template>
