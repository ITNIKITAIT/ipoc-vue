<script setup lang="ts">
import { useForm } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"
import { ArrowLeft, ArrowRight, Save } from "lucide-vue-next"
import { step2Schema, type Step2FormValues } from "~/schemas/create-project"

const props = defineProps<{
  defaultValues?: Partial<Step2FormValues>
}>()

const emit = defineEmits<{
  next: [data: Step2FormValues]
  back: []
}>()

const { handleSubmit, errors: rawErrors, values, setFieldValue, defineField, submitCount } = useForm<Step2FormValues>({
  validationSchema: toTypedSchema(step2Schema),
  initialValues: {
    fundingGoal: undefined as unknown as number,
    raiseDeadline: "",
    investorVesting: "12m_wait_24m",
    teamVesting: "12m_wait_24m",
    ...props.defaultValues,
  },
})

const [fundingGoal, fundingGoalAttrs] = defineField("fundingGoal")
const [raiseDeadline, raiseDeadlineAttrs] = defineField("raiseDeadline")

const submitted = computed(() => submitCount.value > 0)
const errors = computed(() => submitted.value ? rawErrors.value : {})

const TOTAL_TOKENS = 1_000_000_000
const PUBLIC_SALE_PCT = 0.65
const publicSaleTokens = TOTAL_TOKENS * PUBLIC_SALE_PCT

const tokenPrice = computed(() => {
  const goal = values.fundingGoal
  if (goal && goal > 0) return (goal / publicSaleTokens).toFixed(6)
  return null
})

const INVESTOR_OPTIONS: {
  value: Step2FormValues["investorVesting"]
  label: string
  badge?: { text: string; bg: string; textColor: string }
}[] = [
  { value: "none", label: "No vesting \u2014 tokens released immediately at TGE" },
  { value: "6m", label: "Unlock slowly over 6 months" },
  { value: "6m_wait_12m", label: "Wait 6 months, then unlock over 12 months" },
  {
    value: "12m_wait_24m",
    label: "Wait 12 months, then unlock over 24 months",
    badge: { text: "Recommended", bg: "bg-[#0080ff]", textColor: "text-[#d9d8d8]" },
  },
  { value: "custom", label: "Custom vesting" },
]

const TEAM_OPTIONS: {
  value: Step2FormValues["teamVesting"]
  label: string
  badge?: { text: string; bg: string; textColor: string }
}[] = [
  {
    value: "6m_wait_12m",
    label: "Wait 6 months, then unlock over 12 months",
    badge: { text: "Minimum", bg: "bg-[#ff9900]", textColor: "text-black" },
  },
  {
    value: "12m_wait_24m",
    label: "Wait 12 months, then unlock over 24 months",
    badge: { text: "Recommended", bg: "bg-[#0080ff]", textColor: "text-[#d9d8d8]" },
  },
  { value: "custom", label: "Custom vesting (advanced)" },
]

const onSubmit = handleSubmit((data) => {
  emit("next", data as Step2FormValues)
})
</script>

<template>
  <form class="text-white flex flex-col gap-6" @submit="onSubmit">
    <h1 class="text-[32px] font-semibold leading-[1.28] tracking-[-0.16px] text-white">Funding &amp; Vesting</h1>

    <p class="text-base font-medium text-white">
      Define how much you're raising, how tokens are priced, and how value is distributed. This information determines how investors fund your project and how tokens are issued.
    </p>

    <!-- Inputs -->
    <div class="flex flex-col gap-[22px]">
      <!-- Total funding goal -->
      <div class="flex flex-col gap-2">
        <label class="text-base font-medium text-white">Total funding goal</label>
        <div class="flex flex-col gap-[9px] items-end">
          <div class="relative w-full">
            <UiInput
              v-model="fundingGoal"
              v-bind="fundingGoalAttrs"
              type="number"
              :min="1"
              placeholder="e.g. 50,000"
              :aria-invalid="!!errors.fundingGoal"
              class="pr-24"
            />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#d9d8d8] pointer-events-none">USD / USDC</span>
          </div>
          <p v-if="errors.fundingGoal" class="text-red-400 text-xs text-right w-full">{{ errors.fundingGoal }}</p>
          <p v-else class="text-xs text-[#d9d8d8] text-right w-full">The total amount you want to raise before launch.</p>
        </div>
      </div>

      <!-- Raise deadline -->
      <div class="flex flex-col gap-2">
        <label class="text-base font-medium text-white">Raise Deadline</label>
        <div class="flex flex-col gap-[9px] items-end">
          <UiInput
            v-model="raiseDeadline"
            v-bind="raiseDeadlineAttrs"
            type="date"
            class="text-white"
            :aria-invalid="!!errors.raiseDeadline"
          />
          <p v-if="errors.raiseDeadline" class="text-red-400 text-xs text-right w-full">{{ errors.raiseDeadline }}</p>
          <p v-else class="text-xs text-[#d9d8d8] text-right w-full">If your raise does not reach 100% by this date, investors can redirect or withdraw their funds.</p>
        </div>
      </div>

      <!-- Token price (read-only) -->
      <div class="flex flex-col gap-2">
        <label class="text-base font-medium text-white">Token price</label>
        <div class="flex flex-col gap-[9px] items-end">
          <div class="relative w-full">
            <UiInput
              readonly
              :model-value="tokenPrice ? `$${tokenPrice}` : ''"
              placeholder="Auto-calculated..."
              class="pr-24 bg-[#666] cursor-default"
            />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#d9d8d8] pointer-events-none">USD / USDC</span>
          </div>
          <p class="text-xs text-[#d9d8d8] text-right w-full">Token Price (auto-calculated)* that updates live as the creator enters their raise amount and fundraise allocation %</p>
        </div>
      </div>
    </div>

    <!-- Token price summary cards -->
    <div class="flex flex-col gap-4">
      <p class="text-base font-medium text-white">Token price</p>
      <div class="flex gap-10 items-stretch">
        <div class="flex-1 bg-white/25 rounded-[16px] p-8 flex flex-col gap-4">
          <p class="text-base font-medium text-white">Funding outcome (auto-calculated)</p>
          <p class="text-2xl font-semibold text-white">
            {{ values.fundingGoal && values.fundingGoal > 0 ? `${(publicSaleTokens / 1_000_000).toFixed(0)}M tokens` : '\u2014' }}
          </p>
        </div>
        <div class="flex-1 bg-white/25 rounded-[16px] p-8 flex flex-col gap-4">
          <p class="text-base font-medium text-white">will be sold to raise</p>
          <p class="text-2xl font-semibold text-white">
            {{ values.fundingGoal && values.fundingGoal > 0 ? `$${Number(values.fundingGoal).toLocaleString()}` : '\u2014' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Token Overview -->
    <div class="flex flex-col gap-8">
      <h2 class="text-[32px] font-semibold text-white leading-[1.28] tracking-[-0.16px]">Token Overview</h2>
      <p class="text-xl text-[#d9d8d8]">
        Token allocations are fixed by IPOC and apply to every project.<br>
        You cannot change how tokens are distributed.
      </p>
      <CreateProjectTokenAllocationChart />
    </div>

    <!-- Investor Vesting -->
    <section class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <h2 class="text-[18px] font-semibold uppercase tracking-[0.5px] text-[#d9d8d8]">Investor Vesting</h2>
        <span class="bg-[#2bced4] rounded-[8px] px-4 py-1 text-sm text-[#002147]">Recommended</span>
      </div>
      <div class="flex gap-4 items-center">
        <span class="size-[15px] bg-[#1a7c7f] rounded-[4px] shrink-0" />
        <p class="text-xl text-[#d9d8d8]">Choose how investors receive their tokens after the fundraise.</p>
      </div>
      <div class="flex flex-col gap-4 pl-6">
        <label v-for="opt in INVESTOR_OPTIONS" :key="opt.value" class="flex items-center gap-[7px] cursor-pointer">
          <input type="radio" class="sr-only" :value="opt.value" :checked="values.investorVesting === opt.value" @change="setFieldValue('investorVesting', opt.value)">
          <span :class="['size-6 rounded-full border-2 shrink-0 flex items-center justify-center', values.investorVesting === opt.value ? 'border-[#156bb7]' : 'border-[#555]']">
            <span v-if="values.investorVesting === opt.value" class="size-3 rounded-full bg-[#156bb7]" />
          </span>
          <span class="text-base text-white leading-[1.7]">{{ opt.label }}</span>
          <span v-if="opt.badge" :class="['text-sm px-4 py-1 rounded-[8px] shrink-0', opt.badge.bg, opt.badge.textColor]">{{ opt.badge.text }}</span>
        </label>
      </div>
    </section>

    <!-- Vesting Preview -->
    <div class="flex flex-col gap-4">
      <h2 class="text-[18px] font-semibold uppercase tracking-[0.5px] text-[#d9d8d8]">Vesting Preview</h2>
      <CreateProjectVestingTimelineChart :investor-vesting="values.investorVesting" :team-vesting="values.teamVesting" />
    </div>

    <!-- Team Vesting -->
    <section class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <h2 class="text-[18px] font-semibold uppercase tracking-[0.5px] text-[#d9d8d8]">Team Vesting</h2>
        <span class="bg-[#2bced4] rounded-[8px] px-4 py-1 text-sm text-[#002147]">Required</span>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex gap-4 items-center">
          <span class="size-[15px] bg-[#1a7c7f] rounded-[4px] shrink-0" />
          <p class="text-xl text-[#d9d8d8]">Team tokens must be locked to build trust with investors.</p>
        </div>
        <div class="flex gap-4 items-center">
          <span class="size-[15px] opacity-0 shrink-0" />
          <p class="text-base font-medium text-[#d9d8d8]">Minimum 6-month waiting period required</p>
        </div>
      </div>
      <div class="flex flex-col gap-4 pl-6">
        <label v-for="opt in TEAM_OPTIONS" :key="opt.value" class="flex items-center gap-[7px] cursor-pointer">
          <input type="radio" class="sr-only" :value="opt.value" :checked="values.teamVesting === opt.value" @change="setFieldValue('teamVesting', opt.value)">
          <span :class="['size-6 rounded-full border-2 shrink-0 flex items-center justify-center', values.teamVesting === opt.value ? 'border-[#156bb7]' : 'border-[#555]']">
            <span v-if="values.teamVesting === opt.value" class="size-3 rounded-full bg-[#156bb7]" />
          </span>
          <span class="text-base text-white leading-[1.7]">{{ opt.label }}</span>
          <span v-if="opt.badge" :class="['text-sm px-4 py-1 rounded-[8px] shrink-0', opt.badge.bg, opt.badge.textColor]">{{ opt.badge.text }}</span>
        </label>
      </div>
      <p class="text-base font-medium text-[#d9d8d8]">Team tokens must be locked to ensure long-term commitment and investor trust.</p>
      <div class="text-sm text-[#d9d8d8] flex flex-col gap-0">
        <p><strong class="font-bold">A minimum 6-month</strong> cliff is required by IPOC.</p>
        <p>Shorter vesting periods are not allowed.</p>
      </div>
    </section>

    <!-- Navigation -->
    <div class="flex items-end justify-between pb-[72px]">
      <button type="button" class="relative flex items-center gap-2 rounded-full border border-[#156bb7] px-6 py-3 text-[18px] font-semibold uppercase text-white overflow-hidden shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-80" @click="emit('back')">
        <span aria-hidden="true" class="absolute inset-0 pointer-events-none rounded-[inherit]" style="background: linear-gradient(178.13deg, rgba(208,217,226,0.1) 0.467%, rgba(255,255,255,0.1) 96.1%)" />
        <ArrowLeft :size="24" />
        Back
      </button>
      <div class="flex items-center gap-4 mt-10">
        <button type="button" class="relative flex items-center gap-2 rounded-full border border-[#156bb7] px-6 py-3 text-[18px] font-semibold uppercase text-white overflow-hidden shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-80">
          <span aria-hidden="true" class="absolute inset-0 pointer-events-none rounded-[inherit]" style="background: linear-gradient(178.07deg, rgba(208,217,226,0.1) 0.467%, rgba(255,255,255,0.1) 96.1%)" />
          <Save :size="24" />
          Save
        </button>
        <button type="submit" class="relative flex items-center gap-2 rounded-full border border-[#156bb7] bg-white px-6 py-3 text-[18px] font-semibold uppercase text-black overflow-hidden shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-80">
          Next
          <ArrowRight :size="24" />
        </button>
      </div>
    </div>
  </form>
</template>
