<script setup lang="ts">
import { Lock, Zap, Vote, Link as LinkIcon, PlayCircle, Image as ImageIcon, FileText } from "lucide-vue-next"

type MilestoneStatus = "auto-released" | "voting" | "locked"

const milestones = [
  {
    title: "Milestone 1 \u2014 MVP Development",
    description: "Deliver working web app with wallet connect, project creation, and marketplace browse.",
    unlock: "$10,000 (20%)",
    deadline: "Dec 15, 2025",
    autoReleaseNote: "Released automatically when fundraise completed \u2014 no vote required.",
    status: "auto-released" as MilestoneStatus,
    tags: [
      { icon: LinkIcon, label: "GitHub Repo" },
      { icon: PlayCircle, label: "Demo Video" },
      { icon: ImageIcon, label: "Screenshots" },
    ],
    borderColor: "#1a7c7f",
  },
  {
    title: "Milestone 2 \u2014 Mainnet Deployment",
    description: "Deliver working web app with wallet connect, project creation, and marketplace browse.",
    unlock: "$15,000 (30%)",
    deadline: "Jan 20, 2026",
    timeLeft: "6 days 14 hours",
    voteResult: "62% For / 38% Against (3,450 votes)",
    status: "voting" as MilestoneStatus,
    tags: [
      { icon: FileText, label: "Twitter Campaign" },
      { icon: FileText, label: "Influencer Plan" },
      { icon: FileText, label: "Ad Spend Receipt" },
    ],
    borderColor: "#2bced4",
  },
  {
    title: "Milestone 3\u2014 Growth & Expansion",
    description: "Deliver working web app with wallet connect, project creation, and marketplace browse.",
    unlock: "$25,000 (50%)",
    deadline: "Jul 2, 2026",
    status: "locked" as MilestoneStatus,
    tags: [],
    borderColor: "transparent",
  },
]
</script>

<template>
  <div class="flex flex-col gap-6 p-6">
    <div class="flex flex-col gap-2">
      <p class="text-[20px] text-[#d9d8d8] leading-[1.5]">Milestones</p>
      <p class="text-base font-medium text-white leading-[1.5]">Track project progress and fund releases by milestone.</p>
    </div>

    <div class="flex gap-6 items-start">
      <!-- Timeline -->
      <div class="relative shrink-0 w-[41px] self-stretch">
        <div class="absolute left-1/2 top-4 bottom-4 w-[2px] bg-[#333] -translate-x-1/2" />
        <div class="absolute left-1/2 -translate-x-1/2 size-[20px] rounded-full bg-[#2bced4]" style="top: 2%" />
        <div class="absolute left-1/2 -translate-x-1/2 size-[20px] rounded-full border-2 border-[#2bced4] bg-transparent" style="top: 38%" />
        <div class="absolute left-1/2 -translate-x-1/2 size-[20px] rounded-full border-2 border-[#666] bg-[#1a1a1a]" style="top: 72%" />
      </div>

      <!-- Cards -->
      <div class="flex flex-col gap-6 flex-1">
        <div
          v-for="(m, i) in milestones"
          :key="i"
          class="relative bg-[#1a1a1a] rounded-2xl p-6 flex flex-col gap-4"
          :style="{ border: m.status === 'voting' ? '1.5px solid #2bced4' : m.status === 'auto-released' ? '1px solid #1a7c7f' : 'none' }"
        >
          <!-- Status badge -->
          <div class="absolute top-6 right-6">
            <!-- Auto-Released -->
            <div v-if="m.status === 'auto-released'" class="flex flex-col items-center gap-1">
              <span class="text-xs text-white text-center leading-[1.5]">Auto-Released</span>
              <div class="relative flex items-center justify-center p-3 rounded-full overflow-hidden shadow-[0px_0px_2px_0px_rgba(0,0,0,0.1),0px_1px_8px_0px_rgba(0,0,0,0.1)]">
                <div class="absolute inset-0 backdrop-blur-md bg-[rgba(0,197,102,0.3)] rounded-full" />
                <div class="absolute inset-0 shadow-[inset_1px_1px_1px_0.5px_rgba(255,255,255,0.75),inset_-1px_-1px_1px_0.5px_rgba(255,255,255,0.75),inset_0px_0px_1px_1px_rgba(255,255,255,0.15),inset_0px_0px_16px_0px_#f2f2f2] rounded-full" />
                <Zap :size="24" class="text-white relative z-10" />
              </div>
            </div>
            <!-- Voting -->
            <div v-else-if="m.status === 'voting'" class="flex flex-col items-center gap-1">
              <span class="text-xs text-white text-center leading-[1.5]">Voting</span>
              <div class="relative flex items-center justify-center p-3 rounded-full overflow-hidden shadow-[0px_0px_2px_0px_rgba(0,0,0,0.1),0px_1px_8px_0px_rgba(0,0,0,0.1)]">
                <div class="absolute inset-0 backdrop-blur-md bg-[rgba(250,204,21,0.3)] rounded-full" />
                <div class="absolute inset-0 shadow-[inset_1px_1px_1px_0.5px_rgba(255,255,255,0.75),inset_-1px_-1px_1px_0.5px_rgba(255,255,255,0.75),inset_0px_0px_1px_1px_rgba(255,255,255,0.15),inset_0px_0px_16px_0px_#f2f2f2] rounded-full" />
                <Vote :size="24" class="text-white relative z-10" />
              </div>
            </div>
            <!-- Locked -->
            <div v-else class="flex flex-col items-center gap-1">
              <span class="text-xs text-white text-center leading-[1.5]">Locked</span>
              <div class="relative flex items-center justify-center p-3 rounded-[40px] overflow-hidden border border-[#156bb7]">
                <div class="absolute inset-0 rounded-[40px]" style="background-image: linear-gradient(175deg, rgba(4,21,37,0.38) 0%, rgba(11,54,91,0.38) 96%)" />
                <div class="absolute inset-0 shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] rounded-[40px]" />
                <Lock :size="24" class="text-white relative z-10" />
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-2 pr-24">
            <h3 class="text-[20px] font-semibold text-white leading-[1.5]">{{ m.title }}</h3>
            <p class="text-base font-medium text-white leading-[1.5]">{{ m.description }}</p>
            <div class="flex gap-8 items-center text-base font-medium text-white leading-[1.5]">
              <span class="w-[120px]">Unlock:</span><span>{{ m.unlock }}</span>
            </div>
            <div class="flex gap-8 items-center text-base font-medium text-white leading-[1.5]">
              <span class="w-[120px]">Deadline:</span><span>{{ m.deadline }}</span>
            </div>
            <div v-if="m.timeLeft" class="flex gap-8 items-center text-base font-medium text-white leading-[1.5]">
              <span class="w-[120px]">Time Left:</span><span>{{ m.timeLeft }}</span>
            </div>
            <div v-if="m.voteResult" class="flex gap-8 items-center text-base font-medium text-white leading-[1.5]">
              <span class="w-[120px]">Vote Result:</span><span>{{ m.voteResult }}</span>
            </div>
            <p v-if="m.autoReleaseNote" class="text-base font-medium text-white leading-[1.5]">{{ m.autoReleaseNote }}</p>
          </div>

          <div v-if="m.tags.length > 0" class="flex flex-wrap gap-4">
            <div v-for="t in m.tags" :key="t.label" class="relative flex items-center gap-2 px-4 py-1 rounded-[40px] overflow-hidden">
              <div class="absolute inset-0 bg-[#333] rounded-[40px]" />
              <div class="absolute inset-0 shadow-[inset_1px_1px_3px_0px_rgba(0,0,0,0.25)] rounded-[40px]" />
              <component :is="t.icon" :size="16" class="text-white relative z-10" />
              <span class="text-sm text-white leading-[1.5] relative z-10">{{ t.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="text-base font-medium text-[#d9d8d8] leading-[1.5]">Funds are securely held in the project vault and released only after successful milestone completion and community approval.</p>
  </div>
</template>
