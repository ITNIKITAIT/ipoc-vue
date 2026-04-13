<script setup lang="ts">
const data = [
  { name: "NovaTech AI", value: 720 },
  { name: "SoundWave", value: 210 },
  { name: "AstroFi", value: 500 },
]

const maxValue = 800
const chartHeight = 200
const barWidth = 60
const gap = 40
const yLabels = [0, 200, 400, 600, 800]
const leftPadding = 50

function barHeight(value: number) {
  return (value / maxValue) * chartHeight
}

function barX(index: number) {
  return leftPadding + index * (barWidth + gap) + gap / 2
}

function barY(value: number) {
  return chartHeight - barHeight(value)
}
</script>

<template>
  <div class="flex w-[420px] flex-col gap-6">
    <div class="flex items-center justify-between text-white">
      <p class="text-xl leading-[1.5]">Total raised by project</p>
      <p class="text-base font-medium leading-[1.5]">All time</p>
    </div>

    <svg width="420" height="264" viewBox="0 0 420 264">
      <line
        v-for="label in yLabels"
        :key="label"
        :x1="leftPadding"
        :y1="chartHeight - (label / maxValue) * chartHeight"
        x2="410"
        :y2="chartHeight - (label / maxValue) * chartHeight"
        stroke="#333"
        stroke-dasharray="3 3"
        stroke-width="1"
      />

      <text
        v-for="label in yLabels"
        :key="'y-' + label"
        :x="leftPadding - 8"
        :y="chartHeight - (label / maxValue) * chartHeight + 4"
        text-anchor="end"
        fill="#666"
        font-size="12"
      >
        ${{ label }}k
      </text>

      <rect
        v-for="(item, index) in data"
        :key="item.name"
        :x="barX(index)"
        :y="barY(item.value)"
        :width="barWidth"
        :height="barHeight(item.value)"
        rx="4"
        fill="#2bced4"
      />

      <text
        v-for="(item, index) in data"
        :key="'label-' + item.name"
        :x="barX(index) + barWidth / 2"
        :y="chartHeight + 20"
        text-anchor="middle"
        fill="#666"
        font-size="12"
      >
        {{ item.name }}
      </text>

      <text
        v-for="(item, index) in data"
        :key="'val-' + item.name"
        :x="barX(index) + barWidth / 2"
        :y="barY(item.value) - 8"
        text-anchor="middle"
        fill="white"
        font-size="12"
        font-weight="600"
      >
        ${{ item.value }}k
      </text>
    </svg>
  </div>
</template>
