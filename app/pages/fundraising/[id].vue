<script setup lang="ts">
type Tab = "Activity" | "Tokenomics" | "Milestones" | "About"
type FundraisingStatus = "not-connected" | "connected" | "success" | "live-trade" | "failed"

useHead({ title: "Fundraising - IPOC" })

const TABS: Tab[] = ["Activity", "Tokenomics", "Milestones", "About"]
const STATUSES: FundraisingStatus[] = ["not-connected", "connected", "success", "live-trade", "failed"]

const activeTab = ref<Tab>("Activity")
const status = ref<FundraisingStatus>("not-connected")
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-[#002147] to-black">
    <!-- Dev status switcher -->
    <div class="fixed bottom-2 right-2 z-50 flex gap-1">
      <button
        v-for="s in STATUSES"
        :key="s"
        :class="['px-2 py-1 text-xs rounded', status === s ? 'bg-[#2bced4] text-black' : 'bg-[#333] text-white']"
        @click="status = s"
      >
        {{ s }}
      </button>
    </div>

    <UiContainer class="pt-6 pb-10">
      <!-- not-connected -->
      <div v-if="status === 'not-connected'" class="flex gap-6 items-start">
        <div class="flex flex-col gap-6 flex-[0_0_781px]">
          <FundraisingProjectHeader />
          <UiTabPanel :tabs="TABS" :active-tab="activeTab" @update:active-tab="activeTab = $event as Tab">
            <FundraisingTabActivity v-if="activeTab === 'Activity'" />
            <FundraisingTabTokenomics v-if="activeTab === 'Tokenomics'" />
            <FundraisingTabMilestones v-if="activeTab === 'Milestones'" />
            <FundraisingTabAbout v-if="activeTab === 'About'" />
          </UiTabPanel>
        </div>
        <div class="flex-1 sticky top-[20px]">
          <FundraisingContributeSidebar />
        </div>
      </div>

      <!-- connected -->
      <div v-if="status === 'connected'" class="flex gap-6 items-start">
        <div class="flex flex-col gap-6 flex-[0_0_781px]">
          <FundraisingProjectHeader />
          <UiTabPanel :tabs="TABS" :active-tab="activeTab" @update:active-tab="activeTab = $event as Tab">
            <FundraisingTabActivityConnected v-if="activeTab === 'Activity'" />
            <FundraisingTabTokenomics v-if="activeTab === 'Tokenomics'" />
            <FundraisingTabMilestones v-if="activeTab === 'Milestones'" :is-connected="true" />
            <FundraisingTabAbout v-if="activeTab === 'About'" />
          </UiTabPanel>
        </div>
        <div class="flex-1 sticky top-[20px]">
          <FundraisingConnectedSidebar />
        </div>
      </div>

      <!-- success -->
      <div v-if="status === 'success'" class="flex flex-col gap-6 items-center w-[781px] mx-auto">
        <FundraisingProjectHeader
          :badge="{ label: 'Live Trading', color: 'bg-[#0080ff]', icon: '/icons/lin-cart.svg' }"
          funded-text="100% funded"
          raised-amount="$50,000"
          target-amount="$50,000"
          :progress-percent="100"
          :show-deadline="false"
          :show-token-price="false"
        />
        <FundraisingSuccessContent />
      </div>

      <!-- live-trade -->
      <div v-if="status === 'live-trade'" class="flex flex-col gap-6 items-center w-[846px] mx-auto">
        <FundraisingProjectHeader
          :badge="{ label: 'Live Trading', color: 'bg-[#0080ff]', icon: '/icons/lin-cart.svg' }"
          funded-text="100% funded"
          raised-amount="$50,000"
          target-amount="$50,000"
          :progress-percent="100"
          :show-deadline="false"
          :show-token-price="false"
        />
        <FundraisingLiveTradeContent />
      </div>

      <!-- failed -->
      <div v-if="status === 'failed'" class="flex gap-6 items-start">
        <div class="flex flex-col gap-6 flex-[0_0_781px]">
          <FundraisingProjectHeader
            :badge="{ label: 'Failed', color: 'bg-[#e60000]', icon: '/icons/warn.svg' }"
            progress-color="#e60000"
            funded-text="50% raise failed"
            raised-amount="$25,000"
            target-amount="$50,000"
            :progress-percent="50"
            :show-deadline="false"
            :show-token-price="false"
            :investor-count="142"
            raised-text-color="text-[#666]"
          />
          <UiTabPanel :tabs="TABS" :active-tab="activeTab" @update:active-tab="activeTab = $event as Tab">
            <FundraisingTabActivityFailed v-if="activeTab === 'Activity'" />
            <FundraisingTabTokenomics v-if="activeTab === 'Tokenomics'" />
            <FundraisingTabMilestones v-if="activeTab === 'Milestones'" />
            <FundraisingTabAbout v-if="activeTab === 'About'" />
          </UiTabPanel>
          <FundraisingWhatHappenedBox />
          <div class="flex flex-col gap-2 items-center py-6 text-center">
            <p class="text-sm text-[#666] leading-[1.5]">Funds are held in a secure vault and released only after milestone approval by the community.</p>
            <p class="text-sm text-[#f90] leading-[1.5]">Early-stage project. Returns are not guaranteed.</p>
          </div>
        </div>
        <div class="flex-1 sticky top-[20px]">
          <FundraisingFailedSidebar />
        </div>
      </div>
    </UiContainer>
  </div>
</template>
