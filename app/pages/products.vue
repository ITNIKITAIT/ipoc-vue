<script setup lang="ts">
import type { ProjectData } from "~/types/products"

useHead({ title: "Products - IPOC" })

const fundraisingProject: ProjectData = {
  type: "fundraising",
  progress: 62,
  funded: "62%",
  raised: "$31,000",
  target: "$50,000",
  details: [
    { label: "Fixed price", value: "$0.001 / token" },
    { label: "FDV", value: "$800,000" },
    { label: "Days left", value: "12 days" },
    { label: "Investors", value: "142" },
  ],
}

const liveTradingProject: ProjectData = {
  type: "live-trading",
  milestonesCompleted: 2,
  milestonesTotal: 3,
  milestoneProgress: 73,
  details: [
    { label: "Token price", value: "$0.0120" },
    { label: "Liquidity", value: "$94K" },
    { label: "FDV", value: "$1,200,000" },
    { label: "Market cap", value: "$860,000" },
    { label: "24h change", value: "+2.4% \u25B2", highlight: true },
  ],
}

const failedProject: ProjectData = {
  type: "failed",
  message: "Target not reached",
  details: [
    { label: "Amount raised vs target", value: "$15,500 of $50,000" },
    { label: "Ended", value: "14 days" },
  ],
}

const projects = [
  {
    name: "Therapy Dog Coin",
    ticker: "$THDC",
    description: "Healing the world, one paw at a time",
    image: "/previews/3.png",
    status: "fundraising" as const,
    trustScore: 99,
    category: "DeFi",
    data: fundraisingProject,
  },
  {
    name: "AI-Farmer DAO",
    ticker: "$AIFD",
    description: "AI-driven agriculture, governed by farmers.",
    image: "/previews/1.png",
    status: "live-trading" as const,
    trustScore: 99,
    category: "DeFi",
    data: liveTradingProject,
  },
  {
    name: "Therapy Dog Coin",
    ticker: "$THDC",
    description: "Healing the world, one paw at a time",
    image: "/previews/3.png",
    status: "fundraising" as const,
    trustScore: 99,
    category: "DeFi",
    data: fundraisingProject,
  },
  {
    name: "Therapy Dog Coin",
    ticker: "$THDC",
    description: "Healing the world, one paw at a time",
    image: "/previews/3.png",
    status: "fundraising" as const,
    trustScore: 99,
    category: "DeFi",
    data: fundraisingProject,
  },
  {
    name: "AI-Farmer DAO",
    ticker: "$AIFD",
    description: "AI-driven agriculture, governed by farmers.",
    image: "/previews/2.png",
    status: "live-trading" as const,
    trustScore: 99,
    category: "DeFi",
    data: liveTradingProject,
  },
  {
    name: "Therapy Dog Coin",
    ticker: "$THDC",
    description: "Healing the world, one paw at a time",
    image: "/previews/1.png",
    status: "failed" as const,
    trustScore: 48,
    category: "DeFi",
    data: failedProject,
  },
]
</script>

<template>
  <div
    class="flex min-h-screen flex-col gap-10 pt-12"
    :style="{
      backgroundImage: 'linear-gradient(67deg, rgb(0, 33, 71) 21%, rgb(0, 0, 0) 100%)',
    }"
  >
    <UiContainer>
      <ProductsHeroBanner />
      <ProductsCategoryTags />
      <ProductsSectionHeader />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <ProductsPagination :current-page="1" :total-pages="10" />
    </UiContainer>
    <CommonFooter />
  </div>
</template>
