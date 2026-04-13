<script setup lang="ts">
definePageMeta({ layout: "dashboard" })

const activeTab = ref("fundraising")
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <h1 class="text-[32px] font-bold leading-[1.3] text-white">My Projects</h1>
    <p class="text-base font-medium leading-[1.5] text-white">All projects you've invested in</p>

    <DashboardInvestorProjectFilters v-model:active-tab="activeTab" />

    <template v-if="activeTab === 'fundraising'">
      <DashboardInvestmentCard
        name="Therapy Dog Coin"
        ticker="$THDC"
        position-value="$2,500.00"
        status="fundraising"
        :percentage="50"
        raised-label="$25,000 raised of $50,000"
        :stats="[
          { label: 'Invested', value: '$2,000 USDT' },
          { label: 'Total tokens', value: '50,000 THDC' },
          { label: 'Days Left', value: '12 days left' },
        ]"
      />
      <DashboardInvestmentCard
        name="GreenRoot Protocol"
        ticker="$GRP"
        position-value="$1,200.00"
        status="fundraising"
        :percentage="50"
        raised-label="$25,000 raised of $50,000"
        :stats="[
          { label: 'Invested', value: '$2,000 USDT' },
          { label: 'Total tokens', value: '50,000 GRP' },
          { label: 'Days Left', value: '12 days left' },
        ]"
      />
    </template>

    <template v-if="activeTab === 'live-trading'">
      <DashboardInvestmentCard
        name="GreenRoot Protocol"
        ticker="$GRP"
        position-value="$2,500.00"
        status="live-trading"
        :stats="[
          { label: 'Invested', value: '$2,000 USDT' },
          { label: 'Total tokens', value: '50,000 GRP' },
          { label: 'Available to claim', value: '5,000 GRP', highlight: true },
        ]"
        :profit-loss="{ value: '$500 (+25%)', positive: true }"
        show-claim-tokens
        show-vote
      />
      <DashboardInvestmentCard
        name="Therapy Dog Coin"
        ticker="$THDC"
        position-value="$3,500.00"
        status="live-trading"
        :stats="[
          { label: 'Invested', value: '$2,000 USDT' },
          { label: 'Total tokens', value: '50,000 THDC' },
          { label: 'Available to claim', value: '5,000 THDC', highlight: true },
        ]"
        :profit-loss="{ value: '$500 (+25%)', positive: true }"
        show-claim-tokens
        show-vote
      />
    </template>

    <template v-if="activeTab === 'failed'">
      <DashboardInvestmentCard
        name="GreenRoot Protocol"
        ticker="$GRP"
        position-value="$2,500.00"
        status="failed"
        :stats="[
          { label: 'Invested', value: '$2,000 USDT' },
          { label: 'Liquidity Pool staging returned', value: '$250 USDT' },
          { label: 'IPOC fee (non-refundable)', value: '-$50 USDT' },
          { label: 'Total available', value: '$1,950 USDT' },
        ]"
        show-reinvest
        show-claim-to-wallet
      />
    </template>
  </div>
</template>
