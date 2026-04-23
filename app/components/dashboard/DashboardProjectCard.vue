<script setup lang="ts">
import { AlertTriangle, ChevronRight } from "lucide-vue-next"

type ProjectStatus = "fundraising" | "post-raise" | "failed"

const statusConfig: Record<ProjectStatus, { label: string; bg: string; textColor: string; borderColor?: string }> = {
  fundraising: {
    label: "Fundraising",
    bg: "bg-[rgba(0,128,0,0.68)]",
    textColor: "text-white",
  },
  "post-raise": {
    label: "Post-raise",
    bg: "bg-[rgba(0,0,128,0.68)]",
    textColor: "text-[#0080ff]",
    borderColor: "border-[#156bb7]",
  },
  failed: {
    label: "Failed",
    bg: "bg-[#e60000]",
    textColor: "text-white",
  },
}

const props = withDefaults(defineProps<{
  name: string
  ticker: string
  raised: string
  goal: string
  percentage: number
  investors: string
  status: ProjectStatus
  vaultBalance: string
  released: string
  milestones: string
  quorum: string
  iconBorderColor?: string
  iconColor?: string
  iconBgColor?: string
  iconSrc?: string
  warningMessage?: string
  showSubmitProof?: boolean
}>(), {
  iconBorderColor: "border-[#00e600]",
  iconColor: "text-[#00e600]",
  iconBgColor: "bg-[#002147]",
  iconSrc: "/icons/rase.svg",
  showSubmitProof: false,
})

const statusStyle = computed(() => statusConfig[props.status])
</script>

<template>
  <div
    :class="cn(
      'flex w-full flex-col rounded-2xl bg-[#1a1a1a] p-0',
      warningMessage && 'border border-[#ff9900]',
    )"
  >
    <div class="flex gap-[23px] p-6">
      <div class="flex size-12 shrink-0 items-center justify-center">
        <div :class="cn('flex size-full items-center justify-center rounded-full border-2 p-3', iconBgColor, iconBorderColor)">
          <UiSvgIcon :src="iconSrc" :class="cn('size-6', iconColor)" />
        </div>
      </div>

      <div class="flex flex-1 flex-col gap-4">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <p class="text-2xl font-semibold leading-[1.28] tracking-tight text-white">{{ name }}</p>
            <p class="text-sm leading-[1.5] text-[#d9d8d8]">{{ ticker }}</p>
          </div>
          <div class="flex flex-col items-end text-[#d9d8d8]">
            <p class="text-2xl font-semibold leading-[1.28] tracking-tight">{{ raised }}</p>
            <p class="text-sm leading-[1.5]">of {{ goal }} goal</p>
          </div>
        </div>

        <div class="flex gap-2">
          <div
            :class="cn(
              'flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold',
              statusStyle.bg,
              statusStyle.textColor,
              statusStyle.borderColor ? `border ${statusStyle.borderColor}` : '',
            )"
          >
            <UiSvgIcon v-if="status === 'fundraising'" src="/icons/launch.svg" class="size-4 shrink-0" />
            <UiSvgIcon v-else-if="status === 'post-raise'" src="/icons/rase.svg" class="size-4 shrink-0" />
            {{ statusStyle.label }}
          </div>
          <div
            v-if="showSubmitProof"
            class="flex items-center gap-2 rounded-lg bg-[#FF9900AD] px-4 py-2 text-xs font-bold text-white"
          >
            <UiSvgIcon src="/icons/shield.svg" class="size-4 shrink-0" />
            Action needed
          </div>
        </div>

        <div v-if="warningMessage" class="flex items-center gap-[22px] rounded-2xl border border-[#ffcc80] bg-[rgba(255,153,0,0.38)] px-6 py-4">
          <AlertTriangle class="size-10 shrink-0 text-[#ff9900]" />
          <p class="flex-1 text-xl leading-[1.5] text-white">{{ warningMessage }}</p>
          <ChevronRight class="size-4 shrink-0 text-white" />
        </div>

        <UiProgressBar
          v-if="status === 'fundraising'"
          :label="`${percentage}% raised`"
          :percentage="percentage"
          :description="`${investors} investors`"
          color="fundraising"
        />

        <div class="flex flex-col rounded-2xl bg-[rgba(51,51,51,0.38)] p-6">
          <div class="flex gap-4">
            <div class="flex w-[208px] flex-col gap-1">
              <p class="text-base font-medium text-[#666]">Vault balance</p>
              <p class="text-xl font-bold text-brand-secondary-50">{{ vaultBalance }}</p>
            </div>
            <div class="flex flex-1 flex-col gap-1">
              <p class="text-base font-medium text-[#666]">Released</p>
              <p class="text-xl text-white">{{ released }}</p>
            </div>
            <div class="flex flex-1 flex-col gap-1">
              <p class="text-base font-medium text-[#666]">Milestones</p>
              <p class="text-xl text-white">{{ milestones }}</p>
            </div>
            <div class="flex flex-1 flex-col gap-1">
              <p class="text-base font-medium text-[#666]">Quorum</p>
              <p class="text-xl text-white">{{ quorum }}</p>
            </div>
          </div>
        </div>

        <div class="flex gap-4">
          <button
            v-if="showSubmitProof"
            class="rounded-full bg-[rgba(255,153,0,0.68)] px-6 py-3 text-lg font-semibold uppercase text-black hover:bg-[rgba(255,153,0,0.85)]"
          >
            Submit proof
          </button>
          <button class="rounded-full border border-[#156bb7] px-6 py-3 text-lg font-semibold uppercase text-white hover:bg-white/5">
            Manage project
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
