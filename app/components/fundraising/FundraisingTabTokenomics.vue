<script setup lang="ts">
const allocations = [
  { label: "Public Sale", percent: "65%", tokens: "650,000,000 tokens", status: "Status: Partially unlocked (post-TGE)", color: "#115255", pct: 65 },
  { label: "Team", percent: "20%", tokens: "200,000,000 tokens", status: "Status: Locked (6-month cliff)", color: "#1a7c7f", pct: 20 },
  { label: "Liquidity Pool", percent: "12.5%", tokens: "125,000,000 tokens", status: "Status: Fully unlocked at TGE", color: "#2bced4", pct: 12.5 },
  { label: "IPOC Allocation", percent: "2.5%", tokens: "25,000,000 tokens", status: "Status: Platform allocation (locked)", color: "#c0f0f2", pct: 2.5 },
]

const CIRCUMFERENCE = 2 * Math.PI * 83
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
  <div class="flex flex-col gap-6 w-full">
    <div class="flex flex-col gap-0 w-full text-white">
      <p class="text-[20px] font-bold leading-[1.4]">Token Allocation</p>
      <p class="text-base font-medium leading-[1.5]">How tokens are distributed across the project.</p>
    </div>

    <div class="flex gap-6 items-center">
      <!-- SVG Donut -->
      <div class="relative shrink-0" style="width: 207px; height: 207px">
        <svg viewBox="0 0 207 207" class="size-full">
          <circle
            v-for="seg in segments"
            :key="seg.label"
            cx="103.5"
            cy="103.5"
            r="83"
            fill="none"
            :stroke="seg.color"
            stroke-width="35"
            :stroke-dasharray="seg.dashArray"
            :stroke-dashoffset="seg.dashOffset"
          />
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span class="text-[12px] text-[#d9d8d8] leading-[1.5]">Total Supply:</span>
          <span class="text-[11px] text-white leading-[1.5] text-center">1,000,000,000 $SYB</span>
        </div>
      </div>

      <div class="flex flex-col gap-2 flex-1">
        <div
          v-for="a in allocations"
          :key="a.label"
          class="flex gap-3 items-start pl-3"
          :style="{ borderLeft: `8px solid ${a.color}` }"
        >
          <span class="text-sm text-white leading-[1.5] w-[120px] shrink-0">{{ a.label }}</span>
          <div class="flex flex-col">
            <p class="text-base font-medium text-white leading-[1.5]">
              {{ a.percent }}<span class="text-[#666]"> · {{ a.tokens }}</span>
            </p>
            <p class="text-sm text-[#666] leading-[1.5]">{{ a.status }}</p>
          </div>
        </div>
      </div>
    </div>

    <p class="text-xs text-[#666] leading-[1.5]">Funds are released based on milestone completion and community approval.</p>
  </div>
</template>
