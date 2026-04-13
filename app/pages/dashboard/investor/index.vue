<script setup lang="ts">
definePageMeta({ layout: "dashboard" })
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <DashboardInvestorHeader />

    <div class="flex items-stretch gap-6">
      <div class="flex-1">
        <DashboardPortfolioChart />
      </div>
      <DashboardUnclaimedTokensCard />
      <DashboardActiveVotesCard />
    </div>

    <DashboardInvestorProjectCard
      name="Sneaker-Yield Bro"
      ticker="$SYB"
      position-value="$2,500.00"
      status="live-trading"
      :stats="[
        { label: 'Invested', value: '$2,000 USDT' },
        { label: 'Total tokens', value: '50,000 SYB' },
        { label: 'Claimed', value: '25,000 SYB' },
        { label: 'Available to claim', value: '5,000 SYB ($200)', highlight: true },
      ]"
      still-locked="20,000 SYB — unlocks Jun 15, 2026"
      :profit-loss="{ value: '+$500 (+25%)', positive: true }"
      show-claim-tokens
      show-vote
    />

    <DashboardInvestorProjectCard
      name="Therapy Dog Coin"
      ticker="$THDC"
      position-value="$2,500.00"
      status="fundraising"
      :stats="[
        { label: 'Invested', value: '$2,000 USDT' },
        { label: 'Total tokens', value: '50,000 THDC' },
        { label: 'Days Left', value: '12 days left' },
      ]"
    />

    <DashboardInvestorProjectCard
      name="DeFi Legends"
      ticker="$DLEG"
      position-value="$487.50 USDT"
      status="failed"
      :stats="[
        { label: 'You contributed', value: '500 USDT' },
        { label: 'LP staging returned', value: '62.50 USDT' },
        { label: 'IPOC fee (non-refundable)', value: '-$12.50 USDT' },
      ]"
      :profit-loss="{ value: '-$12.50 (-2.5%)', positive: false }"
      show-reinvest
      show-claim-to-wallet
    />
  </div>
</template>
