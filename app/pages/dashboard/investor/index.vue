<script setup lang="ts">
definePageMeta({ layout: "dashboard" })
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <DashboardInvestorHeader />

    <div class="flex items-stretch gap-4">
      <div class="w-[321px] shrink-0">
        <DashboardPortfolioChart />
      </div>
      <div class="flex min-w-0 flex-1">
        <DashboardUnclaimedTokensCard />
      </div>
      <div class="flex min-w-0 flex-1">
        <DashboardActiveVotesCard />
      </div>
    </div>

    <DashboardInvestorProjectCard
      name="Sneaker-Yield Bro"
      ticker="$SYB"
      position-value="$2,500.00"
      status="live-trading"
      :stats-rows="[
        [
          { label: 'Invested', value: '$2,000 USDT' },
          { label: 'Total tokens', value: '50,000 SYB' },
          { label: 'Claimed', value: '25,000 SYB' },
          { label: 'Available to claim', value: '5,000 SYB ($200)', color: 'success' },
        ],
        [
          { label: 'Still locked', value: '20,000 SYB — unlocks Jun 15, 2026', width: '414px' },
          { label: 'Profit and Loss', value: '+$500 (+25%)', color: 'success' },
        ],
      ]"
      show-claim-tokens
      show-vote
    />

    <DashboardInvestorProjectCard
      name="Therapy Dog Coin"
      ticker="$THDC"
      position-value="$2,500.00"
      status="fundraising"
      :stats-rows="[
        [
          { label: 'Invested', value: '$2,000 USDT' },
          { label: 'Total tokens', value: '50,000 THDC' },
          { label: 'Days Left', value: '12 days left' },
        ],
      ]"
    />

    <DashboardInvestorProjectCard
      name="DeFi Legends"
      ticker="$DLEG"
      position-value="$487.50 USDT"
      status="failed"
      available-label="Available"
      :stats-rows="[
        [
          { label: 'You contributed', value: '500 USDT', width: '227px' },
          { label: 'LP staging returned', value: '62.50 USDT' },
          { label: 'IPOC fee (non-refundable)', value: '−$12.50 USDT', color: 'teal' },
        ],
        [
          { label: 'Total available', value: '$487.50 USDT', color: 'teal', width: '227px' },
          { label: 'Profit and Loss', value: '−$12.50 (−2.5%)', color: 'error' },
        ],
      ]"
      show-reinvest
      show-claim-to-wallet
      :show-view-details="false"
    />
  </div>
</template>
