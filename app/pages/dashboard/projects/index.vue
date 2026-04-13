<script setup lang="ts">
definePageMeta({ layout: "dashboard" })
useHead({ title: "My Projects - IPOC" })

const activeTab = ref("all")

const projects = [
  {
    id: "novatech",
    name: "NovaTech AI",
    ticker: "$NOVA",
    raised: "720,000 $NOVA",
    goal: "$1,000,000",
    percentage: 25,
    status: "fundraising" as const,
    stats: [
      { label: "Investor", value: "312" },
      { label: "Days left", value: "18" },
      { label: "Milestones", value: "0/4" },
      { label: "Vault", value: "$850,000", highlight: true },
    ],
  },
  {
    id: "soundwave",
    name: "SoundWave",
    ticker: "$SWV",
    raised: "720,000 $SWV",
    goal: "$1,000,000",
    percentage: 50,
    status: "fundraising" as const,
    stats: [
      { label: "Investor", value: "198" },
      { label: "Days left", value: "18" },
      { label: "Milestones", value: "0/4" },
      { label: "Vault", value: "$425,000", highlight: true },
    ],
  },
  {
    id: "astrofi",
    name: "AstroFi Launch",
    ticker: "$AFL",
    raised: "350,000 $AFL",
    goal: "$500,000",
    percentage: 70,
    status: "post-raise" as const,
    actionNeeded: true,
    stats: [
      { label: "Total raised", value: "$500,000" },
      { label: "Vault balance", value: "$350,000" },
      { label: "Released", value: "$150,000" },
      { label: "Milestones", value: "1/4" },
      { label: "Vault", value: "$350,000", highlight: true },
    ],
  },
  {
    id: "defilegends",
    name: "DeFiLegends",
    ticker: "$DLEG",
    raised: "$180,000",
    goal: "$1,000,000",
    percentage: 18,
    status: "failed" as const,
    failedDate: "14 Feb 2026",
    stats: [
      { label: "Investor", value: "312" },
      { label: "Fund returns", value: "18" },
      { label: "Ended", value: "14 Feb, 2026" },
    ],
  },
]

const filteredProjects = computed(() => {
  if (activeTab.value === "all") return projects
  return projects.filter((p) => p.status === activeTab.value)
})
</script>

<template>
  <div class="flex w-full max-w-[882px] flex-col gap-6">
    <DashboardProjectsHeader />

    <p class="text-base font-medium leading-[1.5] text-white">
      4 projects · 2 active fundraises · 1 post-raise · 1 failed
    </p>

    <DashboardProjectFilters v-model:active-tab="activeTab" />

    <DashboardProjectListCard
      v-for="project in filteredProjects"
      :key="project.id"
      v-bind="project"
    />
  </div>
</template>
