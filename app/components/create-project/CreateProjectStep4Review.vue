<script setup lang="ts">
import {
  Coins,
  FileText,
  Image as ImageIcon,
  Lock,
  Pencil,
} from "lucide-vue-next";
import type {
  Step1FormValues,
  Step2FormValues,
  Step3FormValues,
} from "~/schemas/create-project";

const props = defineProps<{
  step1Data: Step1FormValues;
  step2Data: Step2FormValues;
  step3Data: Step3FormValues;
}>();

const emit = defineEmits<{
  edit: [];
  saveDraft: [];
  launch: [];
}>();

const VESTING_LABELS: Record<string, string> = {
  none: "Immediate release at TGE",
  "6m": "Unlock over 6 months",
  "6m_wait_12m": "Wait 6 months, then unlock over 12 months",
  "12m_wait_24m": "12-month cliff + 24-month linear unlock",
  custom: "Custom vesting",
};

function vestingLabel(v: string) {
  return VESTING_LABELS[v] ?? v;
}

function calcTokenPrice(goal: number) {
  return (goal / (1_000_000_000 * 0.65)).toFixed(6);
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-white text-3xl font-semibold tracking-tight">
      Review &amp; Launch
    </h1>

    <!-- Warning banner -->
    <div
      class="bg-[rgba(255,153,0,0.38)] rounded-2xl px-12 py-6 flex flex-col gap-6">
      <p
        class="flex items-center gap-2 text-white text-lg font-semibold uppercase tracking-wide">
        <Lock :size="18" class="text-white shrink-0" />
        Once you publish, nothing can be changed
      </p>
      <p class="text-white text-base font-medium">
        Your project name, token ticker, raise amount, milestones, token
        allocations, logo, social links, team details, and all other settings
        are permanently locked on-chain.<br />
        Please review everything carefully before launching.
      </p>
    </div>

    <!-- Investor view preview -->
    <div class="flex flex-col gap-4">
      <div
        class="bg-[#333] rounded-2xl px-4 py-1 w-full shadow-[2px_2px_8px_0px_rgba(0,0,0,0.12)]">
        <p class="text-white text-lg font-semibold uppercase tracking-wide">
          Investor View Preview
        </p>
      </div>
      <div class="flex flex-col gap-2 text-white">
        <p class="text-xl">
          {{ step1Data.projectName
          }}{{ step1Data.tokenSymbol ? ` ($${step1Data.tokenSymbol})` : "" }}
        </p>
        <p v-if="step1Data.tagline" class="text-xl">{{ step1Data.tagline }}</p>
        <p class="text-base font-medium">{{ step1Data.overview }}</p>
      </div>
    </div>

    <!-- Funding summary -->
    <div class="flex flex-col gap-4">
      <div
        class="bg-[#333] rounded-2xl px-4 py-1 w-full shadow-[2px_2px_8px_0px_rgba(0,0,0,0.12)]">
        <p class="text-white text-lg font-semibold uppercase tracking-wide">
          Funding Summary
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <div
          v-for="row in [
            {
              label: 'Funding Goal:',
              value: `$${step2Data.fundingGoal.toLocaleString()}`,
            },
            {
              label: 'Token Price:',
              value: `$${calcTokenPrice(step2Data.fundingGoal)}`,
            },
            { label: 'Total Supply:', value: '1,000,000,000 tokens (fixed)' },
            { label: 'Network:', value: 'Launch on mainnet' },
            { label: 'Currency:', value: 'USDC' },
          ]"
          :key="row.label"
          class="flex gap-12 items-start text-white text-base">
          <p class="w-[200px] shrink-0 font-medium">{{ row.label }}</p>
          <p class="flex-1">{{ row.value }}</p>
        </div>
      </div>
      <p class="text-[#d9d8d8] text-xs">
        Funds are collected in USDC and released in stages based on milestone
        approval by token holders.
      </p>
    </div>

    <!-- Token allocation -->
    <div class="flex flex-col gap-4">
      <div
        class="bg-[#333] rounded-2xl px-4 py-1 w-full shadow-[2px_2px_8px_0px_rgba(0,0,0,0.12)]">
        <p class="text-white text-lg font-semibold uppercase tracking-wide">
          Token Allocation (Fixed)
        </p>
      </div>
      <p class="text-white text-base font-medium">
        These allocations are set by IPOC and apply to every project.
      </p>
      <div class="flex flex-col gap-2">
        <div
          v-for="row in [
            {
              label: 'Public Sale (Investors):',
              value: '65% \u2014 650,000,000 tokens',
            },
            { label: 'Team:', value: '20% \u2014 200,000,000 tokens' },
            {
              label: 'Liquidity Pool:',
              value: '12.5% \u2014 125,000,000 tokens',
            },
            { label: 'IPOC:', value: '2.5% \u2014 25,000,000 tokens' },
          ]"
          :key="row.label"
          class="flex gap-12 items-start text-white text-base">
          <p class="w-[200px] shrink-0 font-medium">{{ row.label }}</p>
          <p class="flex-1">{{ row.value }}</p>
        </div>
      </div>
    </div>

    <!-- Vesting -->
    <div class="flex flex-col gap-4">
      <div
        class="bg-[#333] rounded-2xl px-4 py-1 w-full shadow-[2px_2px_8px_0px_rgba(0,0,0,0.12)]">
        <p class="text-white text-lg font-semibold uppercase tracking-wide">
          Vesting
        </p>
      </div>
      <div class="flex flex-col gap-0 text-white">
        <p class="text-xl">Investor Vesting</p>
        <p class="text-base font-medium">
          {{ vestingLabel(step2Data.investorVesting) }}
        </p>
      </div>
      <div class="flex flex-col gap-0 text-white">
        <p class="text-xl">Team Vesting</p>
        <p class="text-base font-medium">
          {{ vestingLabel(step2Data.teamVesting) }}
        </p>
        <p class="text-base font-medium">
          Team tokens are locked to ensure long-term commitment and investor
          trust.
        </p>
      </div>
    </div>

    <!-- Milestone plan -->
    <div class="flex flex-col gap-4">
      <div
        class="rounded-2xl px-4 py-1 w-full shadow-[2px_2px_8px_0px_rgba(0,0,0,0.12)]"
        style="
          background-image:
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.12) 0%,
              rgba(255, 255, 255, 0.12) 100%
            ),
            linear-gradient(90deg, #333 0%, #333 100%);
        ">
        <p class="text-white text-lg font-semibold uppercase tracking-wide">
          Milestone Plan (Trust Anchor)
        </p>
      </div>
      <div class="flex flex-col gap-4">
        <div v-for="(m, i) in step3Data.milestones" :key="i">
          <div v-if="i > 0" class="border-t border-[#333] mb-4" />
          <div class="flex flex-col gap-1">
            <div class="flex items-start gap-2">
              <div class="flex flex-1 gap-6 items-start text-white text-xl">
                <p class="w-[200px] shrink-0">Milestone {{ i + 1 }} —</p>
                <p>{{ m.name }}</p>
              </div>
              <div
                v-if="m.attachments && m.attachments.length > 0"
                class="flex gap-2 shrink-0">
                <div
                  v-for="(att, ai) in m.attachments"
                  :key="ai"
                  class="size-12 rounded border border-[#333] bg-[#1a1a1a] flex flex-col items-center justify-center gap-0.5 text-white shadow-[inset_2px_2px_5px_0px_rgba(0,0,0,0.25)]">
                  <img
                    v-if="(att.type || att.name).toLowerCase().includes('pdf')"
                    src="/icons/pdf.svg"
                    alt="PDF"
                    class="size-5" />
                  <img
                    v-else-if="
                      (att.type || att.name).toLowerCase().includes('ppt') ||
                      (att.type || '').includes('presentation')
                    "
                    src="/icons/ppt.svg"
                    alt="PPT"
                    class="size-5" />
                  <ImageIcon
                    v-else-if="
                      (att.type || '').startsWith('image/') ||
                      /\.(png|jpe?g|gif|webp)$/i.test(att.name)
                    "
                    :size="18"
                    class="text-[#2bced4]" />
                  <FileText v-else :size="18" class="text-[#d9d8d8]" />
                  <span class="text-[9px] font-medium leading-none">{{
                    (att.type || att.name.split(".").pop() || "FILE")
                      .toUpperCase()
                      .slice(0, 3)
                  }}</span>
                </div>
              </div>
            </div>
            <div
              class="flex gap-6 items-start text-white text-base font-medium">
              <p class="w-[200px] shrink-0">Unlocks:</p>
              <p>
                ${{ m.unlockAmount.toLocaleString() }} ({{ m.pctOfTotal }}%)
              </p>
            </div>
            <div
              v-if="m.deliverable"
              class="flex gap-6 items-start text-white text-base font-medium">
              <p class="w-[200px] shrink-0">Deliverable:</p>
              <p class="flex-1">{{ m.deliverable }}</p>
            </div>
            <div
              v-if="m.description"
              class="flex gap-6 items-start text-white text-base font-medium">
              <p class="w-[200px] shrink-0">Description:</p>
              <p class="flex-1">{{ m.description }}</p>
            </div>
            <div
              v-if="m.link"
              class="flex gap-6 items-start text-base font-medium">
              <p class="text-white w-[200px] shrink-0">Supported link:</p>
              <a
                :href="m.link"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[#1a7c7f] underline flex-1 break-all"
                >{{ m.link }}</a
              >
            </div>
            <div
              class="flex gap-6 items-start text-white text-base font-medium">
              <p class="w-[200px] shrink-0">Deadline:</p>
              <div class="flex-1">
                <p>{{ formatDate(m.deadline) }}</p>
                <p v-if="i === 0">
                  Released automatically when your fundraise closes.
                </p>
                <p v-else>
                  Requires proof submission and community approval before funds
                  are released.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Team & alignment -->
    <div class="flex flex-col gap-4">
      <div
        class="bg-[#333] rounded-2xl px-4 py-1 w-full shadow-[2px_2px_8px_0px_rgba(0,0,0,0.12)]">
        <p class="text-white text-lg font-semibold uppercase tracking-wide">
          Team &amp; Alignment
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <div
          v-for="row in [
            { label: 'Team Allocation:', value: '20%' },
            {
              label: 'Team Vesting:',
              value: vestingLabel(step2Data.teamVesting),
            },
            {
              label: 'Incentive Structure:',
              value: 'Long-term aligned with project success',
            },
          ]"
          :key="row.label"
          class="flex gap-12 items-start text-white text-base">
          <p class="w-[200px] shrink-0 font-medium">{{ row.label }}</p>
          <p class="flex-1">{{ row.value }}</p>
        </div>
      </div>
      <p class="text-[#d9d8d8] text-xs">
        This structure ensures long-term commitment from the team while
        protecting investors from early sell pressure.
      </p>
    </div>

    <!-- Deployment fee -->
    <div class="flex gap-3 text-white">
      <div class="flex flex-col gap-2">
        <p class="text-xl font-bold">💳 Deployment fee: 10 USDT</p>
        <p class="text-base font-medium">
          Covers deploying your 5 smart contracts on BNB Smart Chain. Charged
          once at launch.
        </p>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-end justify-between">
      <button
        type="button"
        class="flex items-center gap-2 border border-[#156bb7] rounded-full px-6 py-3 text-white text-lg font-semibold uppercase"
        @click="emit('edit')">
        <Pencil :size="20" />
        Edit
      </button>
      <div class="flex gap-4 items-center">
        <button
          type="button"
          class="flex items-center gap-2 border border-[#156bb7] rounded-full px-6 py-3 text-white text-lg font-semibold uppercase"
          @click="emit('saveDraft')">
          <UiSvgIcon src="/icons/save.svg" class="size-5" />
          Save Draft
        </button>
        <button
          type="button"
          class="flex items-center gap-2 bg-white text-[#002147] rounded-full px-6 py-3 text-lg font-semibold uppercase"
          @click="emit('launch')">
          <img src="/icons/launch.svg" alt="Launch" class="object-contain" />
          Launch Project
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
