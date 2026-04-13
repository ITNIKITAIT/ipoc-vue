<script setup lang="ts">
import { Info } from "lucide-vue-next"

const keyMetrics = [
  { label: "Token Price", value: "$0.05" },
  { label: "Market Cap (MC)", value: "$2,500,000" },
  { label: "Fully Diluted Valuation (FDV)", value: "$50,000,000" },
  { label: "Circulating Supply", value: "5%" },
]

const allocations = [
  { label: "Public Sale", percent: "65%", tokens: "650,000,000 tokens", status: "Status: Partially unlocked (post-TGE)", color: "#115255", pct: 65 },
  { label: "Team", percent: "20%", tokens: "200,000,000 tokens", status: "Status: Locked (6-month cliff)", color: "#1a7c7f", pct: 20 },
  { label: "Liquidity Pool", percent: "12.5%", tokens: "125,000,000 tokens", status: "Status: Fully unlocked at TGE", color: "#2bced4", pct: 12.5 },
  { label: "IPOC Allocation", percent: "2.5%", tokens: "25,000,000 tokens", status: "Status: Platform allocation (locked)", color: "#c0f0f2", pct: 2.5 },
]

const CIRCUMFERENCE = 2 * Math.PI * 60
const segments = computed(() => {
  let offset = CIRCUMFERENCE * 0.25
  return allocations.map((item) => {
    const dashLength = (item.pct / 100) * CIRCUMFERENCE
    const seg = { ...item, dashArray: `${dashLength} ${CIRCUMFERENCE - dashLength}`, dashOffset: offset }
    offset -= dashLength
    return seg
  })
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <p class="text-[20px] text-white leading-[1.5]">Key Metrics</p>
    <div class="bg-[#1a1a1a] rounded-2xl p-6 flex flex-col gap-2">
      <div v-for="m in keyMetrics" :key="m.label" class="grid grid-cols-2 text-base font-medium text-white leading-[1.5]">
        <span class="w-[300px]">{{ m.label }}</span>
        <span>{{ m.value }}</span>
      </div>
    </div>

    <div class="bg-[#1a1a1a] rounded-2xl p-6 flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <p class="text-lg font-semibold text-white uppercase tracking-wide leading-[1.5]">Token Allocation</p>
        <Info :size="24" class="text-white" />
      </div>
      <div class="flex flex-col items-center">
        <div class="bg-gradient-to-b from-[#FF990050] to-[#FF990020] px-6 py-2 rounded-2xl">
          <span class="text-lg font-semibold text-white uppercase tracking-wide">Total Supply: 1,000,000,000 SYB</span>
        </div>
      </div>
      <p class="text-base font-medium text-white leading-[1.5]">Token distribution across all stakeholders.</p>

      <div class="flex gap-6 items-center">
        <div class="relative shrink-0" style="width: 151px; height: 151px">
          <svg viewBox="0 0 151 151" class="size-full">
            <circle
              v-for="seg in segments"
              :key="seg.label"
              cx="75.5"
              cy="75.5"
              r="60"
              fill="none"
              :stroke="seg.color"
              stroke-width="27"
              :stroke-dasharray="seg.dashArray"
              :stroke-dashoffset="seg.dashOffset"
            />
          </svg>
        </div>

        <div class="flex flex-col gap-2 flex-1">
          <div v-for="a in allocations" :key="a.label" class="flex gap-3 items-start pl-3" :style="{ borderLeft: `8px solid ${a.color}` }">
            <span class="text-sm text-white leading-[1.5] w-[120px] shrink-0">{{ a.label }}</span>
            <div class="flex flex-col">
              <p class="text-base font-medium text-white leading-[1.5]">{{ a.percent }}<span class="text-[#666]"> · {{ a.tokens }}</span></p>
              <p class="text-sm text-[#666] leading-[1.5]">{{ a.status }}</p>
            </div>
          </div>
        </div>
      </div>

      <p class="text-sm text-white leading-[1.5]">Future unlocks may increase circulating supply and impact price.</p>
    </div>
  </div>
</template>
