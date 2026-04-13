<script setup lang="ts">
import { Lock, Zap, Vote } from "lucide-vue-next"

type BadgeStatus = "auto-released" | "voting" | "locked" | "complete"

interface Milestone {
  title: string
  description: string
  unlock: string
  deadline: string
  timeLeft?: string
  voteResult?: string
  status: BadgeStatus
  note?: string
  tags?: string[]
}

defineProps<{
  milestones: Milestone[]
}>()

const badgeConfig: Record<BadgeStatus, { label: string; icon: typeof Zap; bgClass: string }> = {
  "auto-released": {
    label: "Auto-Released",
    icon: Zap,
    bgClass: "bg-[rgba(0,197,102,0.3)]",
  },
  voting: {
    label: "Voting",
    icon: Vote,
    bgClass: "bg-[rgba(250,204,21,0.3)]",
  },
  locked: {
    label: "Locked",
    icon: Lock,
    bgClass: "bg-transparent border border-[#156bb7]",
  },
  complete: {
    label: "Complete",
    icon: Zap,
    bgClass: "bg-[rgba(0,197,102,0.3)]",
  },
}
</script>

<template>
  <div class="flex gap-6 rounded-2xl border border-[#333] bg-[#1a1a1a] p-6">
    <div class="relative w-[41px] shrink-0">
      <div class="absolute bottom-4 left-1/2 top-4 w-[2px] -translate-x-1/2 bg-[#333]" />
      <div
        v-for="(_, i) in milestones"
        :key="i"
        class="absolute left-1/2 size-[18px] -translate-x-1/2 rounded-full border-2 border-brand-secondary-50 bg-[#1a1a1a]"
        :style="{ top: `calc(${i * (100 / milestones.length) + 5}%)` }"
      />
    </div>

    <div class="flex flex-1 flex-col gap-6">
      <div
        v-for="(m, i) in milestones"
        :key="i"
        :class="cn(
          'relative flex flex-col gap-[15px] rounded-2xl bg-[#1a1a1a] p-6',
          m.status === 'voting' && 'border-[1.5px] border-brand-secondary-50',
          m.status === 'auto-released' && 'border border-[#1a7c7f]',
        )"
      >
        <div class="absolute right-6 top-6 flex flex-col items-center gap-1">
          <span class="text-center text-xs text-white">{{ badgeConfig[m.status].label }}</span>
          <div
            :class="cn(
              'flex items-center justify-center rounded-full p-3 backdrop-blur-sm',
              badgeConfig[m.status].bgClass,
            )"
          >
            <component :is="badgeConfig[m.status].icon" class="size-6 text-white" />
          </div>
        </div>

        <div class="flex flex-col gap-2 pr-20">
          <h3 class="text-xl font-semibold leading-[1.5] text-white">{{ m.title }}</h3>
          <p class="text-base font-medium leading-[1.5] text-white">{{ m.description }}</p>
          <div class="flex items-center gap-[34px] text-base font-medium leading-[1.5] text-white">
            <span class="w-[120px]">Unlock:</span>
            <span>{{ m.unlock }}</span>
          </div>
          <div class="flex items-center gap-[34px] text-base font-medium leading-[1.5] text-white">
            <span class="w-[120px]">Deadline:</span>
            <span>{{ m.deadline }}</span>
          </div>
          <div v-if="m.timeLeft" class="flex items-center gap-[34px] text-base font-medium leading-[1.5] text-white">
            <span class="w-[120px]">Time Left:</span>
            <span>{{ m.timeLeft }}</span>
          </div>
          <div v-if="m.voteResult" class="flex items-center gap-[34px] text-base font-medium leading-[1.5] text-white">
            <span class="w-[120px]">Vote Result:</span>
            <span>{{ m.voteResult }}</span>
          </div>
          <p v-if="m.note" class="text-base font-medium leading-[1.5] text-white">{{ m.note }}</p>
        </div>

        <div v-if="m.tags?.length" class="flex flex-wrap gap-4">
          <div
            v-for="tag in m.tags"
            :key="tag"
            class="flex items-center gap-2 rounded-full bg-[#333] px-4 py-1 text-sm text-white shadow-[inset_1px_1px_3px_0px_rgba(0,0,0,0.25)]"
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
