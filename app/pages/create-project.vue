<script setup lang="ts">
import type { Step1FormValues, Step2FormValues, Step3FormValues } from "~/schemas/create-project"

definePageMeta({
  layout: "create-project",
})

useHead({ title: "Create Project - IPOC" })

const step = ref<1 | 2 | 3 | 4>(1)
const step1Data = ref<Step1FormValues | null>(null)
const step2Data = ref<Step2FormValues | null>(null)
const step3Data = ref<Step3FormValues | null>(null)

function handleStep1Next(data: Step1FormValues) {
  step1Data.value = data
  step.value = 2
}

function handleStep2Next(data: Step2FormValues) {
  step2Data.value = data
  step.value = 3
}

function handleStep3Next(data: Step3FormValues) {
  step3Data.value = data
  step.value = 4
}
</script>

<template>
  <div>
    <CreateProjectStepIndicator class="mb-6" :current-step="step" />

    <CreateProjectStep1Identity
      v-if="step === 1"
      :default-values="step1Data ?? undefined"
      @next="handleStep1Next"
      @back="() => {}"
    />

    <CreateProjectStep2Funding
      v-if="step === 2"
      :default-values="step2Data ?? undefined"
      @next="handleStep2Next"
      @back="step = 1"
    />

    <CreateProjectStep3Milestones
      v-if="step === 3"
      :funding-goal="step2Data?.fundingGoal ?? 0"
      :default-values="step3Data ?? undefined"
      @next="handleStep3Next"
      @back="step = 2"
    />

    <CreateProjectStep4Review
      v-if="step === 4 && step1Data && step2Data && step3Data"
      :step1-data="step1Data"
      :step2-data="step2Data"
      :step3-data="step3Data"
      @edit="step = 1"
      @save-draft="() => {}"
      @launch="() => {}"
    />
  </div>
</template>
