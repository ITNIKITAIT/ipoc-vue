<script setup lang="ts">
import { createChart, ColorType, CandlestickSeries, HistogramSeries } from "lightweight-charts"
import type { CandlestickData, HistogramData, Time } from "lightweight-charts"

const containerRef = useTemplateRef<HTMLDivElement>("containerRef")
let chart: ReturnType<typeof createChart> | null = null

function generateMockData() {
  const candles: CandlestickData<Time>[] = []
  const volumes: HistogramData<Time>[] = []
  const baseTime = new Date("2026-04-07T09:00:00").getTime() / 1000
  let price = 0.04

  for (let i = 0; i < 80; i++) {
    const time = (baseTime + i * 900) as Time
    const open = price
    const volatility = 0.002 + Math.random() * 0.004
    const close = open + (Math.random() - 0.45) * volatility
    const high = Math.max(open, close) + Math.random() * volatility * 0.5
    const low = Math.min(open, close) - Math.random() * volatility * 0.5

    candles.push({ time, open, high, low, close })
    volumes.push({
      time,
      value: Math.random() * 50000 + 10000,
      color: close >= open ? "rgba(0,128,0,0.4)" : "rgba(230,0,0,0.4)",
    })
    price = close
  }
  return { candles, volumes }
}

onMounted(() => {
  if (!containerRef.value) return

  chart = createChart(containerRef.value, {
    layout: {
      background: { type: ColorType.Solid, color: "black" },
      textColor: "#d9d8d8",
      fontFamily: "Roboto, sans-serif",
      fontSize: 12,
    },
    grid: {
      vertLines: { color: "rgba(255,255,255,0.05)" },
      horzLines: { color: "rgba(255,255,255,0.05)" },
    },
    crosshair: {
      vertLine: { color: "rgba(255,255,255,0.2)" },
      horzLine: { color: "rgba(255,255,255,0.2)" },
    },
    rightPriceScale: { borderColor: "rgba(255,255,255,0.1)" },
    timeScale: { borderColor: "rgba(255,255,255,0.1)", timeVisible: true, secondsVisible: false },
    autoSize: true,
  })

  const candleSeries = chart.addSeries(CandlestickSeries, {
    upColor: "#00c853",
    downColor: "#e60000",
    borderUpColor: "#00c853",
    borderDownColor: "#e60000",
    wickUpColor: "#00c853",
    wickDownColor: "#e60000",
  })

  const volumeSeries = chart.addSeries(HistogramSeries, {
    priceFormat: { type: "volume" },
    priceScaleId: "volume",
  })

  chart.priceScale("volume").applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } })

  const { candles, volumes } = generateMockData()
  candleSeries.setData(candles)
  volumeSeries.setData(volumes)
  chart.timeScale().fitContent()
})

onUnmounted(() => {
  chart?.remove()
})
</script>

<template>
  <div class="bg-black rounded-2xl p-6 flex flex-col gap-2 w-full">
    <div class="flex items-center justify-between">
      <span class="text-sm text-[#d9d8d8]">SYB/JSDT</span>
      <span class="text-lg font-bold text-[#00c853]">$0.556</span>
    </div>
    <div ref="containerRef" class="w-full aspect-[748/578]" />
  </div>
</template>
