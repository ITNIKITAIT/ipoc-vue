<script setup lang="ts">
const ALLOCATION = [
  { name: "Public Sale", pct: 65, tokens: 650_000_000, color: "#1f87ff" },
  { name: "Team", pct: 20, tokens: 200_000_000, color: "#1e9094" },
  { name: "Liquidity Pool", pct: 12.5, tokens: 125_000_000, color: "#2bced4" },
  { name: "IPOC", pct: 2.5, tokens: 25_000_000, color: "#ccffcc" },
]

const CIRCUMFERENCE = 2 * Math.PI * 130
const segments = computed(() => {
  let offset = CIRCUMFERENCE * 0.25
  return ALLOCATION.map((item) => {
    const dashLength = (item.pct / 100) * CIRCUMFERENCE
    const segment = { ...item, dashArray: `${dashLength} ${CIRCUMFERENCE - dashLength}`, dashOffset: offset }
    offset -= dashLength
    return segment
  })
})
</script>

<template>
  <div
    class="rounded-[16px] p-6 flex flex-col gap-4"
    :style="{
      background: 'linear-gradient(90deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.38) 100%), linear-gradient(180deg, #002147 0%, #000 100%)',
    }"
  >
    <p class="text-[18px] font-semibold uppercase tracking-[0.5px] text-[#d9d8d8]">
      Token Allocation (Fixed)
    </p>

    <div class="flex gap-16 items-center">
      <!-- Table -->
      <div class="flex-1 min-w-0">
        <div
          class="flex items-center justify-between px-6 py-3 rounded-[8px] text-base font-medium text-white mb-2"
          style="background: rgba(255,255,255,0.12)"
        >
          <span class="w-[64px]">Color</span>
          <span class="w-[200px]">Allocation</span>
          <span class="flex-1 text-center">%</span>
          <span class="flex-1 text-right">Tokens</span>
        </div>

        <div v-for="(row, i) in ALLOCATION" :key="row.name">
          <div class="flex items-center justify-between px-6 py-4">
            <div class="w-[64px] pr-4">
              <span class="inline-block w-[45px] h-[18px] rounded-[4px]" :style="{ backgroundColor: row.color }" />
            </div>
            <span class="w-[200px] text-base font-medium text-white">{{ row.name }}</span>
            <span class="flex-1 text-center text-base font-medium text-white">{{ row.pct }}%</span>
            <span class="flex-1 text-right text-base font-medium text-white tabular-nums">{{ row.tokens.toLocaleString() }}</span>
          </div>
          <div v-if="i < ALLOCATION.length - 1" class="h-px w-full" style="background: rgba(255,255,255,0.12)" />
        </div>
      </div>

      <!-- SVG Donut chart -->
      <div class="shrink-0 w-[340px] h-[340px] relative">
        <svg viewBox="0 0 340 340" class="size-full">
          <circle
            v-for="seg in segments"
            :key="seg.name"
            cx="170"
            cy="170"
            r="130"
            fill="none"
            :stroke="seg.color"
            stroke-width="46"
            :stroke-dasharray="seg.dashArray"
            :stroke-dashoffset="seg.dashOffset"
          />
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
          <span class="text-[18px] font-semibold uppercase tracking-[0.5px] text-white leading-[1.5]">Total Supply</span>
          <span class="text-[20px] text-white leading-[1.5]">1 Billion tokens</span>
          <span class="text-[20px] text-white leading-[1.5]">(fixed for all projects)</span>
        </div>
      </div>
    </div>
  </div>
</template>
