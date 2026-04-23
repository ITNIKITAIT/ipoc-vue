<script setup lang="ts">
const data = [
  { month: "Jan", value: 8000 },
  { month: "Feb", value: 9200 },
  { month: "Mar", value: 8800 },
  { month: "Apr", value: 10500 },
  { month: "May", value: 11200 },
  { month: "Jun", value: 12800 },
  { month: "Jul", value: 14250 },
]

const chartWidth = 273
const chartHeight = 120
const paddingX = 12
const paddingTop = 6
const axisHeight = 18

const maxValue = 15000
const minValue = 6000
const range = maxValue - minValue

function x(index: number) {
  return paddingX + (index / (data.length - 1)) * (chartWidth - paddingX * 2)
}

function y(value: number) {
  return paddingTop + (1 - (value - minValue) / range) * (chartHeight - paddingTop)
}

const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.value)}`).join(" ")
const areaPath = `${linePath} L${x(data.length - 1)},${chartHeight} L${x(0)},${chartHeight} Z`
</script>

<template>
  <div class="flex h-full flex-col gap-2 rounded-2xl bg-[#1a1a1a] p-6">
    <p class="text-base font-medium leading-[1.5] text-white">Total Portfolio Value</p>
    <p class="text-[32px] font-semibold leading-[1.28] tracking-[-0.16px] text-white">$14,250.00</p>
    <span class="w-fit rounded-lg bg-[#115255] px-2 py-1 text-sm leading-[1.5] text-[#00e600]">
      + 12.5% (24h)↑
    </span>

    <div class="mt-2 overflow-hidden rounded-lg" :style="{ width: `${chartWidth}px`, height: '138px' }">
      <svg
        :width="chartWidth"
        :height="chartHeight + axisHeight"
        :viewBox="`0 0 ${chartWidth} ${chartHeight + axisHeight}`"
        class="block"
      >
        <defs>
          <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stop-color="#00e600" stop-opacity="0.25" />
            <stop offset="95%" stop-color="#00e600" stop-opacity="0" />
          </linearGradient>
        </defs>

        <path :d="areaPath" fill="url(#portfolioGradient)" />
        <path :d="linePath" fill="none" stroke="#00e600" stroke-width="1.5" />

        <text
          v-for="(d, i) in data"
          :key="'label-' + i"
          :x="x(i)"
          :y="chartHeight + 12"
          text-anchor="middle"
          fill="#666"
          font-size="8"
        >
          {{ d.month }}
        </text>
      </svg>
    </div>

    <p class="text-xs leading-[1.5] text-[#666]">Total Portfolio Value</p>
  </div>
</template>
