<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next"

const columns = ["Account", "Type", "Amount", "Tokens", "Time", "Tx link"]

const rows = [
  { account: "8xSk\u2026Lnw3x", type: "Buy", amount: "$643.22", tokens: "10.91M SYB", time: "12s ago", link: "View" },
  { account: "PnTa\u2026Q3mg", type: "Buy", amount: "$72.71", tokens: "1.47M SYB", time: "3m ago", link: "Explorer" },
  { account: "JkLp\u2026Xy4z", type: "Buy", amount: "$156.30", tokens: "3.25M SYB", time: "5m ago", link: "View" },
  { account: "ZrSt\u2026a5K8", type: "Buy", amount: "$1,025.50", tokens: "20.00M SYB", time: "15m ago", link: "View" },
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-4 text-base font-bold leading-[1.5] text-white">
      <span class="w-[100px]">{{ columns[0] }}</span>
      <span class="w-[126px]">{{ columns[1] }}</span>
      <span class="w-[129px]">{{ columns[2] }}</span>
      <span class="w-[160px]">{{ columns[3] }}</span>
      <span class="w-[130px]">{{ columns[4] }}</span>
      <span class="flex-1">{{ columns[5] }}</span>
    </div>

    <div class="flex flex-col gap-2">
      <div v-for="(row, i) in rows" :key="i" class="flex items-center gap-4 text-xs leading-[1.5] text-white">
        <span class="w-[100px]">{{ row.account }}</span>
        <span class="w-[126px] text-[green]">{{ row.type }}</span>
        <span class="w-[129px]">{{ row.amount }}</span>
        <span class="w-[160px]">{{ row.tokens }}</span>
        <span class="w-[130px]">{{ row.time }}</span>
        <span class="flex-1">{{ row.link }}</span>
        <ChevronRight class="size-5 shrink-0 text-white" />
      </div>
    </div>
  </div>
</template>
