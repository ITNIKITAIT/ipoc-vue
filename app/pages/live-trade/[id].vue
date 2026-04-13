<script setup lang="ts">
type Tab = "Live" | "Comments" | "Holders" | "Tokenomics" | "Milestones" | "About"

useHead({ title: "Live Trade - IPOC" })

const TABS: Tab[] = ["Live", "Comments", "Holders", "Tokenomics", "Milestones", "About"]

const activeTab = ref<Tab>("Live")
const timeFilter = ref("1h")
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-[#002147] to-black">
    <UiContainer class="pt-6 pb-10">
      <LiveTradeHeader />

      <div class="flex gap-6 items-start">
        <!-- Left column -->
        <div class="flex flex-col gap-[18px] flex-[0_0_681px]">
          <div class="flex flex-col gap-4">
            <LiveTradeCandlestickChart />
            <LiveTradeTimeFilters :active="timeFilter" @update:active="timeFilter = $event" />
          </div>

          <!-- Tab Panel -->
          <div class="flex flex-col">
            <div class="flex gap-2 items-end">
              <button
                v-for="tab in TABS"
                :key="tab"
                :class="activeTab === tab
                  ? 'flex-1 flex items-center justify-center px-4 py-2 text-base text-white bg-black border-t border-l border-r border-black rounded-tl-lg rounded-tr-lg font-medium leading-[1.5]'
                  : 'flex-1 flex items-center justify-center px-4 py-2 text-base text-white font-medium leading-[1.5] rounded-lg hover:bg-white/5 transition-colors'"
                @click="activeTab = tab"
              >
                {{ tab }}
              </button>
            </div>
            <div class="bg-black border border-[#1a1a1a] p-6">
              <LiveTradeTabLive v-if="activeTab === 'Live'" />
              <LiveTradeTabComments v-if="activeTab === 'Comments'" />
              <LiveTradeTabHolders v-if="activeTab === 'Holders'" />
              <LiveTradeTabTokenomics v-if="activeTab === 'Tokenomics'" />
              <LiveTradeTabMilestones v-if="activeTab === 'Milestones'" />
              <FundraisingTabAbout v-if="activeTab === 'About'" />
            </div>
          </div>
        </div>

        <!-- Right column -->
        <div class="flex-1 sticky top-5">
          <LiveTradeMarketSidebar />
        </div>
      </div>
    </UiContainer>
  </div>
</template>
