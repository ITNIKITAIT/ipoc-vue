<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next"

const columns = ["Account", "Type", "Detail", "Voting power", "Time", "Tx link"]

const rows = [
  { account: "8xSk\u2026Lnw3x", type: "Proof Submitted", detail: "M2 proof", votingPower: "\u2014", time: "2h ago", link: "View" },
  { account: "PnTa\u2026Q3mg", type: "Vote Cast", detail: "Yes", votingPower: "+1.2K", time: "3h ago", link: "\u2014" },
  { account: "JkLp\u2026Xy4z", type: "Vote Cast", detail: "Yes", votingPower: "+800", time: "5h ago", link: "\u2014" },
  { account: "ZrSt\u2026a5K8", type: "Funds Released", detail: "$10,000", votingPower: "\u2014", time: "1d ago", link: "\u2014" },
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
        <span class="w-[126px]">{{ row.type }}</span>
        <span class="w-[129px]">{{ row.detail }}</span>
        <span class="w-[160px]">{{ row.votingPower }}</span>
        <span class="w-[130px]">{{ row.time }}</span>
        <span class="flex-1">{{ row.link }}</span>
        <ChevronRight class="size-5 shrink-0 text-white" />
      </div>
    </div>
  </div>
</template>
