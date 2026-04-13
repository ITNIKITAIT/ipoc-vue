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
  unlocked: "#115255",
}

function getMonthColor(month: number, cliff: number, unlock: number): BlockColor {
  if (month <= cliff) return "locked"
  const unlockEnd = cliff + unlock
  if (month <= unlockEnd) {
    const progress = (month - cliff) / unlock
    return progress <= 0.5 ? "unlocking-early" : "unlocking-late"
  }
  return "unlocked"
}

function getBlocks(vestingKey: VestingKey) {
  const { cliff, unlock } = PRESETS[vestingKey]
  return Array.from({ length: TOTAL_MONTHS }, (_, i) => getMonthColor(i + 1, cliff, unlock))
}

const barTotalWidth = TOTAL_MONTHS * BLOCK_WIDTH + (TOTAL_MONTHS - 1) * BLOCK_GAP
const labelOffset = 56 + 12

const YEAR_POSITIONS = [
  { label: "1 Yr", month: 12 },
  { label: "2 Yr", month: 24 },
  { label: "3 Yr", month: 36 },
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Legend -->
    <div class="flex gap-8 text-xs text-white">
      <div class="flex flex-col gap-0.5">
        <span class="flex items-center gap-1.5">
          <span class="inline-block w-[17px] h-3 rounded-sm bg-[#666]" />
          Locked
        </span>
        <span class="text-[#d9d8d8]">Tokens are not available yet</span>
      </div>
      <div class="flex flex-col gap-0.5">
        <span class="flex items-center gap-1.5">
          <span class="inline-block w-[17px] h-3 rounded-sm bg-[#2bced4]" />
          Unlocking
        </span>
        <span class="text-[#d9d8d8]">Tokens are released gradually</span>
      </div>
      <div class="flex flex-col gap-0.5">
        <span class="flex items-center gap-1.5">
          <span class="inline-block w-[17px] h-3 rounded-sm bg-[#115255]" />
          Fully unlocked
        </span>
        <span class="text-[#d9d8d8]">All tokens are available</span>
      </div>
    </div>

    <!-- Rows -->
    <div class="flex flex-col gap-2">
      <div v-for="row in [{ label: 'Investor', key: investorVesting }, { label: 'Team', key: teamVesting }]" :key="row.label" class="flex items-center gap-3">
        <span class="text-xs text-[#d9d8d8] w-14 shrink-0">{{ row.label }}</span>
        <div class="flex gap-[5px]">
          <div
            v-for="(color, i) in getBlocks(row.key)"
            :key="i"
            :style="{ width: `${BLOCK_WIDTH}px`, height: '30px', backgroundColor: COLOR_MAP[color] }"
          />
        </div>
      </div>
    </div>

    <!-- Year markers -->
    <div class="relative" :style="{ marginLeft: `${labelOffset}px`, width: `${barTotalWidth}px`, height: '36px' }">
      <div
        v-for="{ label, month } in YEAR_POSITIONS"
        :key="label"
        class="absolute flex flex-col items-center -translate-x-1/2"
        :style="{ left: `${(month - 1) * (BLOCK_WIDTH + BLOCK_GAP) + BLOCK_WIDTH / 2}px` }"
      >
        <div class="h-3 w-px bg-white/40" />
        <span class="text-xs text-white mt-0.5">{{ label }}</span>
      </div>
      <span class="absolute left-0 bottom-0 text-xs text-white">months</span>
    </div>
  </div>
</template>
