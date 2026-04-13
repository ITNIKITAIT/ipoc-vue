<script setup lang="ts">
type TransactionType = "Buy" | "Sell" | "Vote Cast" | "Funds Released" | "Proposal Submitted"

const transactions = [
  { account: "8xSk...Lnw3x", type: "Buy" as TransactionType, amount: "$643.22", tokens: "10.91M SYB", time: "12s ago", txLink: "View" },
  { account: "PnTa...Q3mg", type: "Buy" as TransactionType, amount: "$72.71", tokens: "1.47M SYB", time: "3m ago", txLink: "Explorer" },
  { account: "\u2014", type: "Vote Cast" as TransactionType, amount: "\u2014", tokens: "+1.2K voting power", time: "5m ago", txLink: "\u2014" },
  { account: "HVIK...qp7K", type: "Sell" as TransactionType, amount: "$9.80", tokens: "264.79K SYB", time: "1h ago", txLink: "View" },
  { account: "\u2014", type: "Funds Released" as TransactionType, amount: "$10,000", tokens: "+1.2K voting power", time: "1d ago", txLink: "\u2014" },
  { account: "JkLp...Xy4z", type: "Buy" as TransactionType, amount: "$156.30", tokens: "3.25M SYB", time: "5m ago", txLink: "View" },
  { account: "FxQG...d8Y5", type: "Sell" as TransactionType, amount: "$200.00", tokens: "5.10M SYB", time: "10m ago", txLink: "Explorer" },
  { account: "ZrSt...a5K8", type: "Buy" as TransactionType, amount: "$1,025.50", tokens: "20.00M SYB", time: "15m ago", txLink: "View" },
  { account: "QwEr...Ty67", type: "Sell" as TransactionType, amount: "$300.25", tokens: "8.00M SYB", time: "20m ago", txLink: "Explorer" },
  { account: "VbNc...Kx9G", type: "Buy" as TransactionType, amount: "$450.00", tokens: "15.00M SYB", time: "25m ago", txLink: "View" },
  { account: "AbCd...Fg7h", type: "Sell" as TransactionType, amount: "$85.15", tokens: "1.00M SYB", time: "35m ago", txLink: "Explorer" },
  { account: "\u2014", type: "Proposal Submitted" as TransactionType, amount: "\u2014", tokens: "+3.0K voting power", time: "40m ago", txLink: "\u2014" },
  { account: "LmNo...Qp4R", type: "Buy" as TransactionType, amount: "$560.75", tokens: "10.00M SYB", time: "45m ago", txLink: "View" },
  { account: "AbC1...xYz2", type: "Sell" as TransactionType, amount: "$42.00", tokens: "5.50M SYB", time: "50m ago", txLink: "Explorer" },
  { account: "XyZ1...Lp9T", type: "Buy" as TransactionType, amount: "$1,200.00", tokens: "25.00M SYB", time: "1h ago", txLink: "View" },
]

function getTypeColor(type: TransactionType) {
  if (type === "Buy") return "text-green-500"
  if (type === "Sell") return "text-[#e60000]"
  return "text-white"
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <p class="text-[20px] text-[#d9d8d8] leading-[1.5]">Live Activity</p>
      <p class="text-sm text-[#d9d8d8] leading-[1.5]">Real-time trades and on-chain project actions.</p>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex gap-4 items-center text-base font-bold text-white leading-[1.5]">
        <span class="w-[100px]">Account</span>
        <span class="w-[90px]">Type</span>
        <span class="flex-1">Amount</span>
        <span class="w-[110px]">Tokens</span>
        <span class="flex-1">Time</span>
        <span class="flex-1">Tx link</span>
      </div>
      <div class="flex flex-col gap-2">
        <div v-for="(tx, i) in transactions" :key="i" class="flex gap-4 items-center text-xs text-white leading-[1.5]">
          <span class="w-[100px]">{{ tx.account }}</span>
          <span :class="['w-[90px]', getTypeColor(tx.type)]">{{ tx.type }}</span>
          <span class="flex-1">{{ tx.amount }}</span>
          <span class="w-[110px]">{{ tx.tokens }}</span>
          <span class="flex-1">{{ tx.time }}</span>
          <span class="flex-1">{{ tx.txLink }}</span>
        </div>
      </div>
    </div>
    <p class="text-xs text-[#d9d8d8] leading-[1.5]">Funds are locked in a smart contract vault and released only after proof submission and majority community approval. If a milestone is rejected twice, remaining vault funds become available for investors to redirect or withdraw.</p>
  </div>
</template>
