<script setup lang="ts">
import type { ProjectData } from "~/types/products";

useHead({ title: "Profile - IPOC" });

const route = useRoute();
const showFinancials = computed(() => route.query.privacy !== "off");

const profile = {
  name: "Alex Smith",
  wallet: "0x738E...13b0",
  bio: "Web3 builder & community investor.",
  totalInvested: "$45,000",
  projectsBacked: 12,
  createdProjects: 3,
  totalRaised: "$20,000",
};

const fundraisingData: ProjectData = {
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
};

const liveTradingData: ProjectData = {
  type: "live-trading",
  milestonesCompleted: 2,
  milestonesTotal: 3,
  milestoneProgress: 73,
  details: [
    { label: "Token price", value: "$0.08" },
    { label: "Liquidity", value: "$540,000" },
    { label: "FDV", value: "$80,000,000" },
    { label: "Market cap", value: "$1,200,000" },
    { label: "24h change", value: "+2.4% ▲", highlight: true },
  ],
};

const failedData: ProjectData = {
  type: "failed",
  message: "Target not reached",
  details: [
    { label: "Amount raised vs target", value: "$15,500 of $50,000" },
    { label: "Ended", value: "14 days" },
  ],
};

const createdProjects = [
  {
    name: "Therapy Dog Coin",
    ticker: "$THDC",
    description: "Healing the world, one paw at a time",
    image: "/previews/3.png",
    status: "fundraising" as const,
    trustScore: 99,
    category: "DeFi",
    data: fundraisingData,
  },
  {
    name: "AI-Farmer DAO",
    ticker: "$AIFD",
    description: "AI-driven agriculture, governed by farmers.",
    image: "/previews/1.png",
    status: "live-trading" as const,
    trustScore: 99,
    category: "DeFi",
    data: liveTradingData,
  },
  {
    name: "Therapy Dog Coin",
    ticker: "$THDC",
    description: "Healing the world, one paw at a time.",
    image: "/previews/2.png",
    status: "failed" as const,
    trustScore: 48,
    category: "DeFi",
    data: failedData,
  },
];

const backedProjects = [
  {
    name: "THERAPY DOG COIN",
    ticker: "$THDC",
    status: "fundraising" as const,
    stats: [
      { label: "Tokens held", value: "50,000 THDC" },
      { label: "Your contribution", value: "$2,000" },
      { label: "Days left", value: "12 days left" },
    ],
  },
  {
    name: "THERAPY DOG COIN",
    ticker: "$THDC",
    status: "live-trading" as const,
    stats: [
      { label: "Tokens held", value: "50,000 THDC" },
      { label: "Your contribution", value: "$2,000" },
      { label: "Market cap", value: "$80,000" },
      { label: "Value", value: "$2,500" },
      { label: "P&L", value: "+8.6%", highlight: true },
    ],
  },
  {
    name: "THERAPY DOG COIN",
    ticker: "$THDC",
    status: "failed" as const,
    stats: [
      { label: "Tokens held", value: "50,000 THDC" },
      { label: "Your contribution", value: "$2,000" },
      { label: "Funds available", value: "$1,950 USDT" },
    ],
  },
];
</script>

<template>
  <div
    class="flex min-h-screen w-full flex-col gap-10"
    :style="{
      backgroundImage: 'linear-gradient(180deg, #002147 0%, #000000 100%)',
    }">
    <ProfileHeader />

    <UiContainer>
      <ProfileMetrics
        :name="profile.name"
        :wallet="profile.wallet"
        :bio="profile.bio"
        :total-invested="profile.totalInvested"
        :projects-backed="profile.projectsBacked"
        :created-projects="profile.createdProjects"
        :total-raised="profile.totalRaised"
        :show-financials="showFinancials" />

      <ProfileCreatedProjects :projects="createdProjects" />

      <ProfileBackedProjects v-if="showFinancials" :projects="backedProjects" />
    </UiContainer>

    <CommonFooter />
  </div>
</template>
