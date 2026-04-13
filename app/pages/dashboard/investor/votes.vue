<script setup lang="ts">
import { Rocket, ShoppingCart } from "lucide-vue-next"

definePageMeta({ layout: "dashboard" })

const activeTab = ref<"action" | "history">("action")
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <h1 class="text-[32px] font-bold leading-[1.3] text-white">My Votes</h1>
    <p class="text-base font-medium leading-[1.5] text-white">
      Milestone votes across all your backed projects
    </p>

    <div class="flex gap-6">
      <DashboardStatCard
        title="Active votes"
        value="2"
        subtitle="Needs your action"
        value-color="text-brand-secondary-50"
      />
      <DashboardStatCard
        title="Voted this month"
        value="4"
        subtitle="3 passed · 1 rejected"
        value-color="text-brand-secondary-50"
      />
      <DashboardStatCard
        title="Total votes cast"
        value="11"
        subtitle="Across 5 projects"
        value-color="text-brand-secondary-50"
      />
    </div>

    <div class="flex items-center gap-6">
      <button
        :class="cn(
          'flex items-center gap-2 px-4 py-[9px] text-xl font-medium leading-[1.5] transition-colors',
          activeTab === 'action'
            ? 'border-b-2 border-brand-secondary-50 text-brand-secondary-50'
            : 'text-[#666] hover:text-white',
        )"
        @click="activeTab = 'action'"
      >
        <Rocket class="size-5" />
        Action
      </button>
      <button
        :class="cn(
          'flex items-center gap-2 px-4 py-[9px] text-xl font-medium leading-[1.5] transition-colors',
          activeTab === 'history'
            ? 'border-b-2 border-brand-secondary-50 text-brand-secondary-50'
            : 'text-[#666] hover:text-white',
        )"
        @click="activeTab = 'history'"
      >
        <ShoppingCart class="size-5" />
        History
      </button>
    </div>

    <template v-if="activeTab === 'action'">
      <DashboardVoteCard
        project-name="Sneaker-Yield Bro"
        milestone-label="Milestone 2 — Marketing fund release"
        voting-power="274"
        time-remaining="5h 20m"
        milestone-details="Release $80,000 USDT from vault for marketing campaign and exchange listing fees. Funds will be transferred to the project's marketing multi-sig wallet upon approval."
        amount="$80,000 USDT"
        vault-balance="$320,000 USDT"
        quorum="TBD"
        :yes-percentage="60"
        :no-percentage="40"
        quorum-note="Quorum rules pending — confirm with Mike before launch"
        urgent
      />
      <DashboardVoteCard
        project-name="Therapy Dog Coin"
        milestone-label="Milestone 2 — Beta launch fund release"
        voting-power="182"
        time-remaining="5h 20m"
        milestone-details="Release $15,000 USDT from vault for beta launch. Onboard first 10 therapy dog partners and begin pilot programs."
        amount="$150,000 USDT"
        vault-balance="$720,000 USDT"
        quorum="TBD"
        :yes-percentage="60"
        :no-percentage="40"
        quorum-note="Quorum rules pending — confirm with Mike before launch"
        urgent
      />
    </template>

    <div v-if="activeTab === 'history'" class="flex items-center justify-center py-12 text-[#666]">
      <p class="text-base">No past votes to display.</p>
    </div>
  </div>
</template>
