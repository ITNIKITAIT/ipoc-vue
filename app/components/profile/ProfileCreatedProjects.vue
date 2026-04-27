<script setup lang="ts">
import type { ProjectStatus, ProjectData } from "~/types/products"

interface CreatedProject {
  name: string
  ticker: string
  description: string
  image: string
  status: ProjectStatus
  trustScore: number
  category: string
  data: ProjectData
}

defineProps<{
  projects: CreatedProject[]
}>()
</script>

<template>
  <section class="flex w-full flex-col gap-6">
    <h2 class="text-button uppercase tracking-[0.5px] text-white">
      Created Projects
    </h2>

    <div class="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ProductsCard
        v-for="(project, i) in projects"
        :key="i"
        :name="project.name"
        :ticker="project.ticker"
        :description="project.description"
        :image="project.image"
        :status="project.status"
        :trust-score="project.trustScore"
        :category="project.category"
        :data="project.data"
      />
    </div>
  </section>
</template>
