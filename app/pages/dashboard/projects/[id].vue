<script setup lang="ts">
definePageMeta({ layout: "dashboard" })
useHead({ title: "Project Management - IPOC" })

const activeTab = ref("fundraising")
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <DashboardProjectManagementHeader
      name="NovaTech AI"
      ticker="$NOVA"
      tagline="Walk to earn, powered by Web3."
      :status="activeTab === 'fundraising' ? 'fundraising' : 'post-raise'"
      category="DeFi"
    />

    <DashboardManagementToggleTabs v-model:active-tab="activeTab" />

    <DashboardFundraisingTab v-if="activeTab === 'fundraising'" />
    <DashboardPostRaiseTab v-else />
  </div>
</template>
