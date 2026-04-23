<script setup lang="ts">

type BadgeStatus = "auto-released" | "voting" | "locked" | "complete"

interface MilestoneTag {
  icon: string
  label: string
}

interface Milestone {
  title: string
  description: string
  unlock: string
  deadline: string
  timeLeft?: string
  voteResult?: string
  status: BadgeStatus
  note?: string
  tags?: MilestoneTag[]
}

const props = defineProps<{
  milestones: Milestone[]
}>()

const activeTimelineIndex = computed(() => {
  const firstLockedIndex = props.milestones.findIndex(m => m.status === "locked")
  if (firstLockedIndex > 0) return firstLockedIndex
  if (firstLockedIndex === 0) return 0
  return Math.max(props.milestones.length - 1, 0)
})

const badgeConfig: Record<BadgeStatus, { label: string; iconSrc: string; bgClass: string }> = {
  "auto-released": {
    label: "Auto-Released",
    iconSrc: "/icons/light-solid.svg",
    bgClass: "bg-[rgba(0,197,102,0.3)]",
  },
  voting: {
    label: "Voting",
    iconSrc: "/icons/vote.svg",
    bgClass: "bg-[rgba(250,204,21,0.3)]",
  },
  locked: {
    label: "Locked",
    iconSrc: "/icons/lock.svg",
    bgClass: "bg-transparent border border-[#156bb7]",
  },
  complete: {
    label: "Complete",
    iconSrc: "/icons/light-solid.svg",
    bgClass: "bg-[rgba(0,197,102,0.3)]",
  },
}
</script>

<template>
  <div
    class="grid gap-x-6 gap-y-6 rounded-2xl border border-[#333] bg-[#1a1a1a] p-6"
    style="grid-template-columns: 32px 1fr"
  >
    <template v-for="(m, i) in milestones" :key="i">
      <div class="relative flex flex-col items-center">
        <div
          v-if="i > 0"
          class="absolute -top-6 left-1/2 h-6 w-[2px] -translate-x-1/2 bg-brand-secondary-50"
        />

        <div
          class="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-[3px] border-brand-secondary-50 bg-[#1a1a1a]"
        >
          <span
            :class="cn(
              'size-3 rounded-full bg-brand-secondary-50',
              i > activeTimelineIndex && 'opacity-30',
            )"
          />
        </div>

        <div
          v-if="i < milestones.length - 1"
          class="w-[2px] flex-1 bg-brand-secondary-50"
        />
      </div>

      <div
        :class="cn(
          'relative flex flex-col gap-[15px] rounded-2xl bg-[#1a1a1a] p-6',
          m.status === 'voting' && 'border-[1.5px] border-brand-secondary-50',
          m.status === 'auto-released' && 'border border-[#1a7c7f]',
        )"
      >
        <div class="absolute right-6 top-6 flex w-[88px] flex-col items-center gap-2">
          <span class="text-center text-xs font-medium leading-[1.25] text-white">{{ badgeConfig[m.status].label }}</span>
          <div
            :class="cn(
              'flex size-12 items-center justify-center rounded-full p-3 backdrop-blur-sm',
              badgeConfig[m.status].bgClass,
            )"
          >
            <UiSvgIcon :src="badgeConfig[m.status].iconSrc" class="size-5 text-white" />
          </div>
        </div>

        <div class="flex flex-col gap-2 pr-[116px]">
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
            :key="tag.label"
            class="flex items-center gap-2 rounded-full bg-[#333] px-4 py-1 text-sm text-white shadow-[inset_1px_1px_3px_0px_rgba(0,0,0,0.25)]"
          >
            <UiSvgIcon :src="tag.icon" :alt="tag.label" class="size-4 text-white" />
            {{ tag.label }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
