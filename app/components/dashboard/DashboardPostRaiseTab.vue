<script setup lang="ts">
const stats = [
  {
    title: "Total raised",
    value: "$1,000,000",
    subtitle: "of $1,000,000 goal",
    valueColor: "text-brand-secondary-50",
  },
  {
    title: "Tokens sold",
    value: "650,000,000",
    subtitle: "of 1,000,000,000 total",
    valueColor: "text-white",
  },
  {
    title: "Released to date",
    value: "$150,000",
    subtitle: "Across all milestones",
    valueColor: "text-white",
  },
  {
    title: "Milestones",
    value: "1/4",
    subtitle: "1 completed · 3 remaining",
    valueColor: "text-white",
  },
]

const milestones = [
  {
    title: "Milestone 1 \u2014 MVP Development",
    description: "Deliver working web app with wallet connect, project creation, and marketplace browse.",
    unlock: "$10,000 (20%)",
    deadline: "Dec 15, 2025",
    status: "auto-released" as const,
    note: "Released automatically when fundraise completed \u2014 no vote required.",
    tags: [
      { icon: "/icons/link.svg", label: "GitHub Repo" },
      { icon: "/icons/demo.svg", label: "Demo Video" },
      { icon: "/icons/screenshot.svg", label: "Screenshots" },
    ],
  },
  {
    title: "Milestone 2 \u2014 Mainnet Deployment",
    description: "Deliver working web app with wallet connect, project creation, and marketplace browse.",
    unlock: "$15,000 (30%)",
    deadline: "Jan 20, 2026",
    timeLeft: "6 days 14 hours",
    voteResult: "62% For / 38% Against (3,450 votes)",
    status: "voting" as const,
    tags: [
      { icon: "/icons/twitter.svg", label: "Twitter Campaign" },
      { icon: "/icons/influencer_plan.svg", label: "Influencer Plan" },
      { icon: "/icons/ad.svg", label: "Ad Spend Receipt" },
    ],
  },
  {
    title: "Milestone 3 \u2014 Growth & Expansion",
    description: "Deliver working web app with wallet connect, project creation, and marketplace browse.",
    unlock: "$17,500 (35%)",
    deadline: "Jul 2, 2026",
    status: "locked" as const,
  },
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="flex min-h-[168px] flex-col rounded-3xl bg-[#1a1a1a] px-6 py-7"
      >
        <p class="text-body-l font-medium text-white">{{ stat.title }}</p>
        <p :class="cn('mt-3 text-heading-s leading-[1.25] tracking-tight', stat.valueColor)">{{ stat.value }}</p>
        <p class="mt-3 text-body-m text-[#666]">{{ stat.subtitle }}</p>
      </div>
    </div>

    <DashboardWarningBanner
      title="Milestone 2 vote closes in 6 days 14 hours — submit proof now"
      description="Investors need your proof to vote. Missing the deadline may delay fund release."
      action-label="Submit proof"
    />

    <p class="text-xl leading-[1.5] text-[#d9d8d8]">Recent contributions</p>
    <DashboardActivityTable />

    <p class="text-xl leading-[1.5] text-[#d9d8d8]">Milestones roadmap</p>
    <DashboardMilestones :milestones="milestones" />

    <p class="text-base font-medium leading-[1.5] text-[#d9d8d8]">
      Funds are securely held in the project vault and released only after successful milestone completion and community approval.
    </p>
  </div>
</template>
