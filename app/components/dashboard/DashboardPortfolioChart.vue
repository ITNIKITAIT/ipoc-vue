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

const chartWidth = 500
const chartHeight = 160
const paddingX = 20
const paddingTop = 10

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
  <div class="flex flex-1 flex-col gap-4 rounded-3xl border border-[#1a1a1a] bg-[#1a1a1a] p-6">
    <div class="flex flex-col gap-1">
      <p class="text-base font-medium leading-[1.5] text-white">Total Portfolio Value</p>
      <p class="text-[32px] font-semibold leading-[1.28] tracking-tight text-white">$14,250.00</p>
      <span class="w-fit rounded-md bg-[rgba(0,128,0,0.3)] px-2 py-0.5 text-sm font-medium text-[#00e600]">
        +12.6% (24h)
      </span>
    </div>

    <svg :width="chartWidth" :height="chartHeight + 30" :viewBox="`0 0 ${chartWidth} ${chartHeight + 30}`" class="w-full">
      <defs>
        <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stop-color="#2bced4" stop-opacity="0.3" />
          <stop offset="95%" stop-color="#2bced4" stop-opacity="0" />
        </linearGradient>
      </defs>

      <path :d="areaPath" fill="url(#portfolioGradient)" />
      <path :d="linePath" fill="none" stroke="#2bced4" stroke-width="2" />

      <circle
        v-for="(d, i) in data"
        :key="i"
        :cx="x(i)"
        :cy="y(d.value)"
        r="3"
        fill="#2bced4"
      />

      <text
        v-for="(d, i) in data"
        :key="'label-' + i"
        :x="x(i)"
        :y="chartHeight + 20"
        text-anchor="middle"
        fill="#666"
        font-size="10"
      >
        {{ d.month }}
      </text>
    </svg>

    <p class="text-xs text-[#666]">Total Portfolio Value</p>
  </div>
</template>
