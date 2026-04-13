<script setup lang="ts">
import { useForm, useFieldArray } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"
import { ArrowLeft, ArrowRight, Save, Calendar, Plus, XCircle, Pencil, Upload } from "lucide-vue-next"
import { step3Schema, type Step3FormValues, type MilestoneValue } from "~/schemas/create-project"

type Mode = "automatic" | "manual" | null

const props = defineProps<{
  fundingGoal?: number
  defaultValues?: Partial<Step3FormValues>
}>()

const emit = defineEmits<{
  next: [data: Step3FormValues]
  back: []
}>()

const MILESTONE_POOL_PCT = 0.85
const MILESTONE_AUTO_COUNT = 3
const goal = computed(() => props.fundingGoal ?? 50_000)

const selectedMode = ref<Mode>("automatic")
const workingMode = ref<"automatic" | "manual" | null>(null)

type ManualDraft = {
  name: string; unlockAmount: string; pctOfTotal: string
  deadline: string; deliverable: string; description: string; link: string
}

const draft = ref<ManualDraft>({ name: "", unlockAmount: "", pctOfTotal: "", deadline: "", deliverable: "", description: "", link: "" })
const draftFiles = ref<{ name: string; type: string }[]>([])
const fileInputRef = useTemplateRef<HTMLInputElement>("fileInputRef")

const { handleSubmit, values, setFieldValue } = useForm<Step3FormValues>({
  validationSchema: toTypedSchema(step3Schema),
  initialValues: {
    mode: "automatic",
    timeline: "3m",
    milestones: [],
    ...props.defaultValues,
  },
})

const { fields, push } = useFieldArray<Step3FormValues, "milestones">("milestones")

function formatCurrency(n: number) {
  return `$${Math.floor(n).toLocaleString()}`
}

function formatDeadline(date: Date) {
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

function generateAutoMilestones(fundingGoal: number, timeline: "3m" | "6m"): MilestoneValue[] {
  const pool = fundingGoal * MILESTONE_POOL_PCT
  const perMilestone = pool / MILESTONE_AUTO_COUNT
  const pct = (1 / MILESTONE_AUTO_COUNT) * 100
  const totalMonths = timeline === "3m" ? 3 : 6

  return Array.from({ length: MILESTONE_AUTO_COUNT }, (_, i) => {
    const deadline = new Date()
    deadline.setMonth(deadline.getMonth() + Math.round(((i + 1) / MILESTONE_AUTO_COUNT) * totalMonths))
    return {
      name: "", description: "", deliverable: "",
      unlockAmount: perMilestone, pctOfTotal: pct,
      deadline: formatDeadline(deadline), link: "", attachments: [],
    }
  })
}

function handleModeSelect(mode: "automatic" | "manual") {
  selectedMode.value = mode
  setFieldValue("mode", mode)
}

function handleSetupMilestones() {
  if (selectedMode.value === "automatic") {
    const milestones = generateAutoMilestones(goal.value, values.timeline ?? "3m")
    milestones.forEach((m) => push(m))
  }
  workingMode.value = selectedMode.value
}

function handleAddMilestone() {
  push({
    name: draft.value.name,
    description: draft.value.description,
    deliverable: draft.value.deliverable,
    unlockAmount: parseFloat(draft.value.unlockAmount) || 0,
    pctOfTotal: parseFloat(draft.value.pctOfTotal) || 0,
    deadline: draft.value.deadline,
    link: draft.value.link,
    attachments: draftFiles.value,
  })
  draft.value = { name: "", unlockAmount: "", pctOfTotal: "", deadline: "", deliverable: "", description: "", link: "" }
  draftFiles.value = []
}

function handleFileChange(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files ?? [])
  draftFiles.value.push(...files.map((f) => ({ name: f.name, type: f.type })))
  if (fileInputRef.value) fileInputRef.value.value = ""
}

function handleRemoveDraftFile(index: number) {
  draftFiles.value.splice(index, 1)
}

const countLabel = computed(() => `${fields.value.length} of 3\u20135 milestones added`)
const pctLabel = `${(100 / MILESTONE_AUTO_COUNT).toFixed(2)}%`

function cardStyle(card: "automatic" | "manual") {
  if (selectedMode.value === null) {
    return card === "automatic"
      ? { background: "rgba(17,82,85,0.24)", borderColor: "#1a7c7f" }
      : { background: "rgba(26,26,26,0.16)", borderColor: "#555" }
  }
  if (selectedMode.value === card) return { background: "rgba(17,82,85,0.24)", borderColor: "#1a7c7f" }
  return { background: "rgba(8,8,8,0.08)", borderColor: "#222" }
}

function cardTextColor(card: "automatic" | "manual") {
  if (selectedMode.value === null || selectedMode.value === card) return "white"
  return "#3a3a3a"
}

const onSubmit = handleSubmit((data) => {
  emit("next", data as Step3FormValues)
})
</script>

<template>
  <form class="text-white flex flex-col gap-6" @submit="onSubmit">
    <h1 class="text-[32px] font-semibold leading-[1.28] tracking-[-0.16px] text-white">Milestones</h1>
    <p class="text-base font-medium text-white">Funds are locked in a vault and released in stages as milestones are completed and approved.</p>

    <!-- Funding Rule box -->
    <div class="border rounded-[8px] p-6 flex flex-col gap-4" style="background: rgba(0,0,128,0.24); border-color: #156bb7">
      <p class="text-[18px] font-semibold uppercase tracking-[0.5px] text-[#2bced4]">Funding Rule</p>
      <div class="text-base font-medium text-white">
        <p>Total milestone funding must equal 85% of your raise</p>
        <p>Example: Raise $50,000 → Milestones must total $42,500</p>
      </div>
    </div>

    <!-- How milestone funding works -->
    <div class="flex flex-col gap-4">
      <p class="text-base font-medium text-white">How milestone funding works</p>
      <div class="flex gap-4 items-start text-base font-medium text-white">
        <span class="w-[193px] shrink-0">Milestone 1 —</span>
        <span class="flex-1">Released automatically when your fundraise completes. You receive these funds immediately to start building.</span>
      </div>
      <div class="flex gap-4 items-start text-base font-medium text-white">
        <span class="w-[193px] shrink-0">Milestones 2 onwards —</span>
        <span class="flex-1">Submit proof when complete. Your investors vote. If approved, the next tranche is released.</span>
      </div>
    </div>

    <!-- Mode cards -->
    <template v-if="workingMode === null">
      <p class="text-[18px] font-semibold uppercase tracking-[0.5px] text-white">How would you like to set up your milestones?</p>

      <div class="flex gap-6">
        <button type="button" class="flex-1 flex flex-col gap-2 items-center justify-center p-6 rounded-[8px] border text-left transition-all" :style="cardStyle('automatic')" @click="handleModeSelect('automatic')">
          <img src="/icons/light.svg" alt="Automatic" width="98" height="98" :class="selectedMode === 'manual' ? 'opacity-20 grayscale' : 'opacity-100'">
          <div class="text-center">
            <p class="text-[18px] font-semibold uppercase tracking-[0.5px]" :style="{ color: cardTextColor('automatic') }">Automatic</p>
            <p class="text-[20px]" :style="{ color: cardTextColor('automatic') }">Automatically set milestones based on your project goals and timeline</p>
          </div>
        </button>

        <button type="button" class="flex-1 flex flex-col gap-2 items-center justify-center p-6 rounded-[8px] border text-left transition-all" :style="cardStyle('manual')" @click="handleModeSelect('manual')">
          <img src="/icons/pen.svg" alt="Manual" width="98" height="98" :class="selectedMode === 'automatic' ? 'opacity-20 grayscale' : 'opacity-100'">
          <div class="text-center">
            <p class="text-[18px] font-semibold uppercase tracking-[0.5px]" :style="{ color: cardTextColor('manual') }">Manual</p>
            <p class="text-[20px]" :style="{ color: cardTextColor('manual') }">Set milestones manually</p>
          </div>
        </button>
      </div>

      <!-- Contextual panel -->
      <div v-if="selectedMode !== null" class="flex items-end justify-between rounded-[8px] border p-6" style="background: rgba(0,0,0,0.16); border-color: #333">
        <div v-if="selectedMode === 'automatic'" class="flex flex-col gap-6">
          <p class="text-[20px] text-white">Select your project timeline</p>
          <div class="flex items-center">
            <label v-for="(val, i) in (['3m', '6m'] as const)" :key="val" :class="['flex items-center gap-[7px] cursor-pointer p-4', i === 0 ? 'w-[157px]' : '']">
              <input type="radio" class="sr-only" :checked="values.timeline === val" @change="setFieldValue('timeline', val)">
              <span :class="['size-6 rounded-full border-2 shrink-0 flex items-center justify-center', values.timeline === val ? 'border-[#156bb7]' : 'border-[#555]']">
                <span v-if="values.timeline === val" class="size-3 rounded-full bg-[#156bb7]" />
              </span>
              <span class="text-[20px] text-white">{{ val === '3m' ? '3 months' : '6 months' }}</span>
            </label>
          </div>
        </div>
        <p v-else class="text-[20px] text-white">You will customize your milestones yourself</p>

        <button type="button" class="relative flex items-center gap-2 rounded-full border border-[#156bb7] bg-white px-12 py-3 text-[18px] font-semibold uppercase text-black overflow-hidden shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-80 shrink-0 ml-6" @click="handleSetupMilestones">
          Set up milestones
          <ArrowRight :size="24" />
        </button>
      </div>
    </template>

    <!-- Automatic working view -->
    <template v-if="workingMode === 'automatic'">
      <div class="rounded-[8px] border p-6" style="background: rgba(0,128,0,0.24); border-color: #008000">
        <p class="text-base font-medium text-[#00e600]">
          {{ MILESTONE_AUTO_COUNT }} milestones auto-created with equal amounts ({{ pctLabel }} each) and deadlines spaced across your timeline. Names and descriptions are yours to fill in. You can adjust any values after.
        </p>
      </div>

      <div class="h-px w-full bg-[#333]" />

      <div class="flex flex-col gap-6">
        <div v-for="(field, i) in fields" :key="field.key" class="rounded-[8px] border p-6 flex flex-col gap-4" style="background: rgba(17,82,85,0.24); border-color: #115255">
          <div class="flex items-start justify-between">
            <p class="text-[18px] font-semibold uppercase tracking-[0.5px] text-white">Milestone {{ i + 1 }}</p>
            <button type="button" class="relative flex items-center gap-2 rounded-full border border-[#156bb7] px-6 py-3 text-[18px] font-semibold uppercase text-white overflow-hidden shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-80">
              <span aria-hidden="true" class="absolute inset-0 pointer-events-none rounded-[inherit]" style="background: linear-gradient(178.94deg, rgba(208,217,226,0.1) 0.467%, rgba(255,255,255,0.1) 96.1%)" />
              <Pencil :size="24" />
              Edit Milestones
            </button>
          </div>
          <div class="flex items-start justify-between">
            <div class="flex flex-col">
              <span class="text-xs text-[#666]">Unlock Amount</span>
              <span class="text-[14px] text-white">{{ formatCurrency(field.value.unlockAmount) }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-xs text-[#666]">% of Total</span>
              <span class="text-[14px] text-white">{{ field.value.pctOfTotal.toFixed(2) }}%</span>
            </div>
            <div class="flex flex-col">
              <span class="text-xs text-[#666]">Deadline</span>
              <span class="text-[14px] text-white">{{ field.value.deadline }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between text-sm">
        <span class="text-white">Break your project into clear steps</span>
        <span class="text-[#2bced4]">{{ countLabel }}</span>
      </div>
    </template>

    <!-- Manual working view -->
    <template v-if="workingMode === 'manual'">
      <div class="h-px w-full bg-[#333]" />

      <!-- Added milestones summary -->
      <div v-if="fields.length > 0" class="flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <div class="border-b-2 border-white flex items-center gap-4 py-4 font-bold text-[16px] text-white">
            <p class="flex-1 min-w-0">Milestone Name</p>
            <p class="flex-1 min-w-0">Unlock Amount</p>
            <p class="flex-1 min-w-0 text-center">% of Total</p>
            <p class="flex-1 min-w-0 text-right">Deadline</p>
          </div>
          <div v-for="(field, i) in fields" :key="field.key" class="flex flex-col gap-4 w-full">
            <div class="flex items-center gap-4 font-medium text-base text-white">
              <p class="flex-1 min-w-0">{{ field.value.name || `Milestone ${i + 1}` }}</p>
              <p class="flex-1 min-w-0">{{ formatCurrency(field.value.unlockAmount) }}</p>
              <p class="flex-1 min-w-0 text-center">{{ field.value.pctOfTotal.toFixed(0) }}%</p>
              <p class="flex-1 min-w-0 text-right">{{ field.value.deadline }}</p>
            </div>
            <div v-if="field.value.deliverable" class="text-white text-base leading-[1.5]">
              <span class="font-bold text-[14px]">Deliverable: </span>{{ field.value.deliverable }}
            </div>
            <div v-if="field.value.description" class="text-white text-base leading-[1.5]">
              <span class="font-bold text-[14px]">Milestone Description: </span>{{ field.value.description }}
            </div>
          </div>
        </div>
        <div class="h-px w-full bg-[#333]" />
      </div>

      <!-- Form card -->
      <div class="bg-black rounded-[16px] pt-6 px-6 pb-12 flex flex-col gap-6 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.12)]">
        <div class="flex flex-col gap-2">
          <label class="text-base font-medium text-white">Milestone Name</label>
          <UiInput v-model="draft.name" placeholder="e.g. MVP development, beta launch, marketing campaign" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-base font-medium text-white">Amount to unlock (USDC)</label>
          <UiInput v-model="draft.unlockAmount" placeholder="How much funding you want released for this milestone" />
        </div>

        <div v-if="fields.length >= 1" class="flex flex-col gap-2">
          <label class="text-base font-medium text-white">Percentage % of total raise</label>
          <UiInput v-model="draft.pctOfTotal" placeholder="Must add up to 85% across all milestones" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-base font-medium text-white">Deadline (required)</label>
          <div class="flex flex-col gap-2">
            <div class="relative flex items-center">
              <Calendar :size="20" class="absolute left-5 text-[#d9d8d8] pointer-events-none" />
              <UiInput v-model="draft.deadline" placeholder="mm / dd / yyyy" class="pl-12" />
            </div>
            <p class="text-[12px] text-[#d9d8d8] text-right leading-[1.5]">Set a realistic completion date for this milestone</p>
          </div>
        </div>

        <p class="text-[20px] text-white">What will you deliver?</p>

        <div class="flex flex-col gap-2">
          <label class="text-base font-medium text-white">Deliverable</label>
          <div class="flex flex-col gap-2">
            <UiInput v-model="draft.deliverable" placeholder="Be specific. Investors will use this to decide whether to approve your milestone." />
            <p class="text-[12px] text-[#d9d8d8] text-right leading-[1.5]">What exactly will you deliver in this milestone?</p>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-base font-medium text-white">Milestone Description</label>
          <div class="flex flex-col gap-2">
            <UiTextarea v-model="draft.description" placeholder='Describe what will be delivered and what "done" looks like' class="h-[191px] rounded-[8px] px-4 py-2" />
            <p class="text-[12px] text-[#d9d8d8] text-right leading-[1.5]">Markdown supported - Max ~1,000 characters</p>
          </div>
        </div>

        <!-- Attachments + Link row -->
        <div class="flex gap-10 items-start">
          <div class="flex gap-6 items-start shrink-0">
            <div class="flex flex-col gap-2">
              <p class="text-base font-medium text-white whitespace-nowrap">Attachments (optional)</p>
              <button type="button" class="flex items-center gap-2 px-6 py-2 rounded-full border border-[#156bb7] bg-[#1a1a1a] text-[18px] font-semibold uppercase text-white shadow-[2px_2px_8px_0px_rgba(0,0,0,0.12)] transition-opacity hover:opacity-80 w-[218px]" @click="fileInputRef?.click()">
                <Upload :size="20" />
                Upload doc
              </button>
              <p class="text-[14px] text-[#666]">Pitch deck | Roadmap PDF</p>
              <input ref="fileInputRef" type="file" accept=".pdf,.png,.jpg,.jpeg" multiple class="sr-only" @change="handleFileChange">
            </div>
            <div v-if="draftFiles.length > 0" class="flex gap-3 items-start flex-wrap mt-8">
              <div v-for="(file, fi) in draftFiles" :key="fi" class="flex gap-2 items-center">
                <div class="relative border border-[#333] rounded-[6px] size-[64px] flex flex-col items-center justify-center bg-[#1a1a1a] shrink-0 shadow-[inset_2.9px_2.9px_5.8px_0px_rgba(0,0,0,0.25)]">
                  <span class="text-[10px] text-white font-medium">{{ file.type.includes('pdf') ? 'PDF' : file.type.includes('png') ? 'PNG' : 'DOC' }}</span>
                </div>
                <div class="text-[12.6px] text-white leading-[1.5]">
                  <p>file name:</p>
                  <p>{{ file.name.length > 10 ? file.name.slice(0, 10) + '...' : file.name }}</p>
                </div>
                <button type="button" class="text-white hover:opacity-70" @click="handleRemoveDraftFile(fi)">
                  <XCircle :size="20" />
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2 flex-1 min-w-0">
            <label class="text-base font-medium text-white">Link (optional)</label>
            <div class="flex flex-col gap-2">
              <div class="relative flex items-center border border-[#333] rounded-full bg-[#1a1a1a] overflow-hidden shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.25)]">
                <div class="border-r border-[#333] px-3 py-2 shrink-0">
                  <span class="text-base text-[#d9d8d8] whitespace-nowrap">http://</span>
                </div>
                <input v-model="draft.link" type="text" class="flex-1 min-w-0 bg-transparent px-2 py-2 text-base text-white outline-none placeholder:text-[#d9d8d8]" placeholder="www.abc.io">
              </div>
              <p class="text-[12px] text-[#d9d8d8] text-right leading-[1.5]">Add a supporting link (e.g. demo, website, repo)</p>
            </div>
          </div>
        </div>

        <!-- Footer row -->
        <div class="flex items-center justify-between">
          <div class="flex flex-col gap-2">
            <p class="text-base font-medium text-[#d9d8d8]">Break your project into clear steps</p>
            <p class="text-base font-medium text-[#666]">{{ countLabel }}</p>
          </div>
          <button type="button" class="flex items-center gap-2 px-6 py-3 rounded-full border border-[#156bb7] bg-[#d9d8d8] text-[18px] font-semibold uppercase text-[#002147] shadow-[2px_2px_8px_0px_rgba(0,0,0,0.12)] transition-opacity hover:opacity-80 shrink-0" @click="handleAddMilestone">
            <Plus :size="24" />
            Add milestone
          </button>
        </div>
      </div>
    </template>

    <!-- Navigation -->
    <div class="flex items-end justify-between pb-[72px]">
      <button type="button" class="relative flex items-center gap-2 rounded-full border border-[#156bb7] px-6 py-3 text-[18px] font-semibold uppercase text-white overflow-hidden shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-80" @click="emit('back')">
        <span aria-hidden="true" class="absolute inset-0 pointer-events-none rounded-[inherit]" style="background: linear-gradient(178.13deg, rgba(208,217,226,0.1) 0.467%, rgba(255,255,255,0.1) 96.1%)" />
        <ArrowLeft :size="24" />
        Back
      </button>
      <div class="flex items-center gap-4">
        <button type="button" class="relative flex items-center gap-2 rounded-full border border-[#156bb7] px-6 py-3 text-[18px] font-semibold uppercase text-white overflow-hidden shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-80">
          <span aria-hidden="true" class="absolute inset-0 pointer-events-none rounded-[inherit]" style="background: linear-gradient(178.07deg, rgba(208,217,226,0.1) 0.467%, rgba(255,255,255,0.1) 96.1%)" />
          <Save :size="24" />
          Save
        </button>
        <button type="submit" :disabled="fields.length === 0" class="relative flex items-center gap-2 rounded-full border border-[#156bb7] bg-white px-6 py-3 text-[18px] font-semibold uppercase text-black overflow-hidden shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed">
          Next
          <ArrowRight :size="24" />
        </button>
      </div>
    </div>
  </form>
</template>
