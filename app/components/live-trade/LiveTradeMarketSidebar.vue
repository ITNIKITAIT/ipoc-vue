<script setup lang="ts">
import { Info, ChevronDown } from "lucide-vue-next"

type StatsTab = "Market" | "Limit"
type TradeAction = "Buy" | "Sell"

const statsTab = ref<StatsTab>("Market")
const tradeAction = ref<TradeAction>("Buy")
</script>

<template>
  <div class="bg-black rounded-2xl pt-4 pb-6 px-6 flex flex-col gap-4 w-full">
    <div class="flex items-end justify-between">
      <p class="text-lg font-semibold text-white uppercase tracking-wide leading-[1.5]">Key stats</p>
      <div class="flex gap-2 items-center">
        <button
          v-for="tab in (['Market', 'Limit'] as const)"
          :key="tab"
          :class="['px-4 py-2 text-base text-white leading-[1.5]', statsTab === tab ? 'font-bold border-b-[3px] border-white' : 'font-medium']"
          @click="statsTab = tab"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex gap-4">
        <div class="flex-1 bg-[#1a1a1a] rounded-2xl p-2 flex flex-col gap-2">
          <p class="text-base font-bold text-white leading-[1.5]">Price & Trading</p>
          <div v-for="row in [{ l: 'Current Price:', v: '$0.05' }, { l: '24h Change:', v: '+2.3%' }, { l: 'Volume:', v: '$48,200' }]" :key="row.l" class="flex items-start justify-between text-sm text-white leading-[1.5]">
            <span class="w-[120px]">{{ row.l }}</span><span>{{ row.v }}</span>
          </div>
        </div>
        <div class="flex-1 rounded-2xl p-2 flex flex-col gap-2 bg-[linear-gradient(90deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.12)_100%),linear-gradient(90deg,#1a1a1a_0%,#1a1a1a_100%)]">
          <div class="flex items-center justify-between">
            <p class="text-base font-bold text-white leading-[1.5]">Valuation</p>
            <Info :size="24" class="text-white" />
          </div>
          <div v-for="row in [{ l: 'Market Cap:', v: '$2.5M' }, { l: 'FDV:', v: '$50M' }]" :key="row.l" class="flex items-start justify-between text-sm text-white leading-[1.5]">
            <span class="w-[120px]">{{ row.l }}</span><span>{{ row.v }}</span>
          </div>
        </div>
      </div>

      <div class="bg-[#1a1a1a] rounded-2xl p-2 flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <p class="text-base font-bold text-white leading-[1.5]">Progress & Locks</p>
          <Info :size="24" class="text-white" />
        </div>
        <div class="flex gap-2 text-sm text-white leading-[1.5]">
          <span class="w-[97px]">Raised:</span><span>$50,000 / $50,000 — 100% raised</span>
        </div>
        <div class="flex gap-2 text-sm text-white leading-[1.5]">
          <span>Milestone-Locked Funds:</span><span>Active</span>
        </div>
        <p class="text-sm text-white leading-[1.5]">1 of 3 milestones completed</p>
      </div>

      <div class="bg-[#1a1a1a] rounded-2xl p-2 flex flex-col gap-2">
        <p class="text-base font-bold text-white leading-[1.5]">Supply & Liquidity</p>
        <div v-for="row in [{ l: 'Circulating Supply:', v: '5%' }, { l: 'Liquidity:', v: '$543,000' }, { l: 'Holders:', v: '1,247' }]" :key="row.l" class="flex items-start justify-between text-sm text-white leading-[1.5]">
          <span class="w-[120px]">{{ row.l }}</span><span>{{ row.v }}</span>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <p class="text-sm text-white leading-[1.5]">You Pay</p>
      <div class="flex items-center border border-[#333] rounded-[40px] bg-[#1a1a1a] overflow-hidden shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.25)]">
        <div class="flex items-center gap-2 px-3 h-12 border-r border-white/20 shrink-0">
          <span class="text-white text-base leading-[1.7]">USDT</span>
          <ChevronDown :size="16" class="text-white" />
        </div>
        <div class="flex-1 flex items-center justify-between px-3 py-2">
          <input type="text" placeholder="Enter Amount" class="bg-transparent text-white placeholder:text-[#d9d8d8] text-base leading-[1.7] outline-none w-full">
          <ChevronDown :size="16" class="text-white shrink-0" />
        </div>
      </div>
    </div>

    <div class="flex gap-4 items-start">
      <div class="flex flex-col">
        <span class="text-xs text-[#d9d8d8] leading-[1.5]">You receive (est.)</span>
        <span class="text-base font-medium text-[#d9d8d8] leading-[1.5]">0 SYB</span>
      </div>
      <div class="flex-1 flex items-center justify-end gap-2">
        <button v-for="pct in ['25%', '50%', '75%', 'MAX%']" :key="pct" class="relative px-4 py-1 rounded-[40px] text-sm text-white leading-[1.5] overflow-hidden">
          <div class="absolute inset-0 bg-[#1a1a1a] rounded-[40px]" />
          <div class="absolute inset-0 shadow-[inset_1px_1px_3px_0px_rgba(0,0,0,0.25)] rounded-[40px]" />
          <span :class="['relative z-10', pct === 'MAX%' ? 'font-bold' : '']">{{ pct }}</span>
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex gap-2">
        <button
          :class="['relative flex-1 flex items-center justify-center p-2 rounded-3xl overflow-hidden text-lg font-semibold uppercase text-white leading-[1.5]', tradeAction === 'Buy' ? 'border border-green-500' : 'border border-[#d9d8d8] bg-[#1a1a1a]']"
          @click="tradeAction = 'Buy'"
        >
          <template v-if="tradeAction === 'Buy'">
            <div class="absolute inset-0 bg-[rgba(0,128,0,0.48)] rounded-3xl" />
            <div class="absolute inset-0 shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-3xl" />
          </template>
          <span class="relative z-10">Buy</span>
        </button>
        <button
          :class="['relative flex-1 flex items-center justify-center p-2 rounded-3xl overflow-hidden text-lg uppercase text-white leading-[1.5]', tradeAction === 'Sell' ? 'border border-[#e60000] font-semibold' : 'border border-[#d9d8d8] bg-[#1a1a1a]']"
          @click="tradeAction = 'Sell'"
        >
          <template v-if="tradeAction === 'Sell'">
            <div class="absolute inset-0 bg-[rgba(230,0,0,0.48)] rounded-3xl" />
            <div class="absolute inset-0 shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-3xl" />
          </template>
          <span class="relative z-10">Sell</span>
        </button>
      </div>
      <button class="relative w-full flex items-center justify-center px-6 py-2 rounded-full overflow-hidden shadow-[0px_0px_2px_0px_rgba(0,0,0,0.1),0px_1px_8px_0px_rgba(0,0,0,0.1)]">
        <div class="absolute inset-0 backdrop-blur-md bg-[rgba(43,206,212,0.38)]" />
        <div class="absolute inset-0 shadow-[inset_1px_1px_1px_0.5px_rgba(255,255,255,0.75),inset_-1px_-1px_1px_0.5px_rgba(255,255,255,0.75),inset_0px_0px_1px_1px_rgba(255,255,255,0.15),inset_0px_0px_16px_0px_#f2f2f2] rounded-full" />
        <span class="relative z-10 text-lg font-semibold text-white uppercase leading-[1.5]">Sign up to trade</span>
      </button>
    </div>
  </div>
</template>
