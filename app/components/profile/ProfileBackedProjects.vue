<script setup lang="ts">
type CardStatus = "live-trading" | "fundraising" | "failed"

interface Stat {
  label: string
  value: string
  highlight?: boolean
}

interface BackedProject {
  name: string
  ticker: string
  status: CardStatus
  stats: Stat[]
  detailsHref?: string
}

defineProps<{
  projects: BackedProject[]
  seeAllHref?: string
}>()
</script>

<template>
  <section class="flex w-full flex-col gap-6">
    <div class="flex items-start justify-between gap-4">
      <h2 class="text-button uppercase tracking-[0.5px] text-white">
        Backed Projects
      </h2>
      <NuxtLink
        :to="seeAllHref ?? '/dashboard/investor/projects'"
        class="text-link text-[#9CF] underline underline-offset-4"
      >
        See full list
      </NuxtLink>
    </div>

    <div class="flex w-full gap-[25px] overflow-x-auto">
      <ProfileBackedProjectCard
        v-for="(project, i) in projects"
        :key="i"
        :name="project.name"
        :ticker="project.ticker"
        :status="project.status"
        :stats="project.stats"
        :details-href="project.detailsHref"
        class="flex-1 self-stretch"
      />
    </div>
  </section>
</template>
