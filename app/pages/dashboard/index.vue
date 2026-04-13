<script setup lang="ts">
definePageMeta({ layout: "dashboard" })
useHead({ title: "Creator Dashboard - IPOC" })
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <DashboardHeader />

    <div class="flex gap-6">
      <DashboardStatCard title="Projects created" value="3" subtitle="2 active · 1 post-raise" />
      <DashboardStatCard title="Active fundraises" value="2" subtitle="1 milestone vote open" />
      <DashboardStatCard title="Total raised" value="$1,430,000" subtitle="Across all projects" value-color="text-brand-secondary-50" />
      <DashboardStatCard title="Total investors" value="847" subtitle="Unique wallets" />
    </div>

    <DashboardWarningBanner
      title="Milestone vote closing soon — NovaTech AI, Milestone 2"
      description="Vote closes in 5h 20m · Submit proof before it expires"
      action-label="Submit proof"
    />

    <div class="flex gap-6">
      <div class="flex flex-col gap-6">
        <DashboardTotalRaisedChart />
        <DashboardVaultInfoCards />
      </div>
      <DashboardPendingActionsList />
    </div>

    <div class="flex items-center justify-between">
      <p class="text-xl text-white">Your Projects</p>
      <NuxtLink to="/dashboard/projects" class="text-base text-brand-secondary-50 underline">
        View all projects
      </NuxtLink>
    </div>

    <DashboardProjectCard
      name="AstroFi Launch"
      ticker="$AFL"
      raised="$210,000"
      goal="$500,000"
      :percentage="42"
      investors="535"
      status="post-raise"
      vault-balance="$250,000"
      released="$0"
      milestones="0/4"
      quorum="TBD"
      icon-border-color="border-[#0080ff]"
      icon-color="text-[#0080ff]"
      warning-message="Milestone 2 vote closes in 5h 20m — submit proof now"
      :show-submit-proof="true"
    />

    <DashboardProjectCard
      name="NovaTech AI"
      ticker="$NOVA"
      raised="720,000 $NOVA"
      goal="$1,000,000"
      :percentage="25"
      investors="312"
      status="fundraising"
      vault-balance="$150,000"
      released="$0"
      milestones="0/4"
      quorum="TBD"
      icon-border-color="border-[#00e600]"
    />

    <DashboardProjectCard
      name="SoundWave"
      ticker="$SWV"
      raised="$210,000"
      goal="$500,000"
      :percentage="50"
      investors="198"
      status="fundraising"
      vault-balance="$250,000"
      released="$0"
      milestones="0/4"
      quorum="TBD"
      icon-border-color="border-[#00e600]"
    />
  </div>
</template>
