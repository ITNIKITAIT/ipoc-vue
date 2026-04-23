<script setup lang="ts">
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
    status: "locked" as const,
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
    <div class="flex gap-6">
      <DashboardStatCard title="Total raised" value="$750,000" subtitle="of $1,000,000 goal" value-color="text-brand-secondary-50" />
      <DashboardStatCard title="Tokens sold" value="650,000,000" subtitle="of 1,000,000,000 total" />
      <DashboardStatCard title="Investors" value="312" subtitle="Unique wallets" />
      <DashboardStatCard title="Days remaining" value="18" subtitle="Closes Oct 12, 2026" value-color="text-[#ff9900]" />
    </div>

    <p class="text-xl leading-[1.5] text-[#d9d8d8]">Recent contributions</p>
    <DashboardContributionsTable />

    <p class="text-xl leading-[1.5] text-[#d9d8d8]">Milestones roadmap</p>
    <DashboardMilestones :milestones="milestones" />

    <p class="text-base font-medium leading-[1.5] text-[#d9d8d8]">
      Funds are securely held in the project vault and released only after successful milestone completion and community approval.
    </p>
  </div>
</template>
