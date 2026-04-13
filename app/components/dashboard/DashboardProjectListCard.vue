<script setup lang="ts">
import { AlertTriangle } from "lucide-vue-next"

type ProjectStatus = "fundraising" | "post-raise" | "failed"

const props = defineProps<{
  id: string
  name: string
  ticker: string
  raised: string
  goal: string
  percentage: number
  status: ProjectStatus
  actionNeeded?: boolean
  failedDate?: string
  stats: { label: string; value: string; highlight?: boolean }[]
}>()

const statusConfig: Record<ProjectStatus, { label: string; bg: string; textColor: string; border?: string }> = {
  fundraising: {
    label: "Fundraising",
    bg: "bg-[rgba(0,128,0,0.68)]",
    textColor: "text-[#00e600]",
    border: "border border-[#00e600]",
  },
  "post-raise": {
    label: "Post-raise",
    bg: "bg-[rgba(0,0,128,0.48)]",
    textColor: "text-[#0080ff]",
    border: "border border-[#156bb7]",
  },
  failed: {
    label: "Failed",
    bg: "bg-[#e60000]",
    textColor: "text-white",
  },
}

const statusStyle = computed(() => statusConfig[props.status])
const progressColor = computed(() => props.status === "failed" ? "bg-[#e60000]" : "bg-brand-secondary-50")
const percentageColor = computed(() => props.status === "failed" ? "text-[#e60000]" : "text-brand-secondary-50")
</script>

<template>
  <div
    :class="cn(
      'flex w-full flex-col rounded-2xl bg-[#1a1a1a] p-0',
      actionNeeded && 'border border-[#ff9900]',
    )"
  >
    <div class="flex gap-[23px] p-6">
      <div class="flex size-12 shrink-0 flex-col items-center">
        <div class="flex w-full items-center rounded-full border-2 border-[#333] bg-[#1a1a1a] p-3">
          <UiSvgIcon src="/icons/investor.svg" class="size-6 text-white" />
        </div>
      </div>

      <div class="flex flex-1 flex-col gap-4">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <p class="text-2xl font-semibold leading-[1.28] tracking-tight text-white">{{ name }}</p>
            <p class="text-sm leading-[1.5] text-[#d9d8d8]">{{ ticker }}</p>
          </div>
          <div class="flex flex-col items-end text-[#d9d8d8]">
            <template v-if="status === 'failed'">
              <p class="text-2xl font-semibold leading-[1.28] tracking-tight text-[#e60000]">Failed</p>
              <p class="text-sm leading-[1.5]">{{ failedDate }}</p>
            </template>
            <template v-else>
              <p class="text-2xl font-semibold leading-[1.28] tracking-tight">{{ raised }}</p>
              <p class="text-sm leading-[1.5]">{{ status === 'post-raise' ? 'in vault' : `of ${goal} goal` }}</p>
            </template>
          </div>
        </div>

        <div class="flex gap-2">
          <div
            :class="cn(
              'flex w-[123px] items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold',
              statusStyle.bg,
              statusStyle.textColor,
              statusStyle.border || '',
            )"
          >
            {{ statusStyle.label }}
          </div>
          <div v-if="actionNeeded" class="flex items-center gap-2 rounded-lg border border-[#ffcc80] bg-[#ff9900] px-4 py-2 text-xs font-bold text-[#002147]">
            <AlertTriangle class="size-4" />
            Action needed
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex items-end justify-between text-base leading-[1.5]">
            <p :class="cn('font-bold', percentageColor)">{{ percentage }}% raised</p>
            <p class="font-medium text-[#666]">{{ raised }} {{ status !== 'post-raise' ? `/${goal}` : '' }}</p>
          </div>
          <div class="relative h-4 w-full rounded-full bg-[#333]">
            <div
              :class="cn('h-4 rounded-full', progressColor)"
              :style="{ width: `${Math.min(percentage, 100)}%` }"
            />
          </div>
        </div>

        <div class="flex flex-col rounded-2xl bg-[rgba(51,51,51,0.38)] px-6 py-4">
          <div class="flex gap-4">
            <div v-for="stat in stats" :key="stat.label" class="flex flex-1 flex-col gap-1">
              <p class="text-base font-medium text-[#666]">{{ stat.label }}</p>
              <p :class="cn('text-xl font-bold', stat.highlight ? 'text-brand-secondary-50' : 'text-white')">
                {{ stat.value }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex gap-4">
          <button
            v-if="actionNeeded"
            class="rounded-full bg-[rgba(255,153,0,0.68)] px-6 py-3 text-lg font-semibold uppercase text-black hover:bg-[rgba(255,153,0,0.85)]"
          >
            Submit proof
          </button>
          <NuxtLink
            :to="`/dashboard/projects/${id}`"
            :class="cn(
              'rounded-full px-8 py-2 text-lg font-semibold uppercase hover:bg-white/5',
              actionNeeded
                ? 'border border-[#156bb7] text-white'
                : 'bg-[rgba(255,153,0,0.68)] text-[#002147] hover:bg-[rgba(255,153,0,0.85)]',
            )"
          >
            {{ status === 'failed' ? 'View details' : 'Manage project' }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
