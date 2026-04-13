<script setup lang="ts">
import { useForm, useFieldArray } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"
import { ArrowLeft, ArrowRight, Plus, Upload } from "lucide-vue-next"
import { step1Schema, type Step1FormValues } from "~/schemas/create-project"

const props = defineProps<{
  defaultValues?: Partial<Step1FormValues>
}>()

const emit = defineEmits<{
  next: [data: Step1FormValues]
  back: []
}>()

const { handleSubmit, errors: rawErrors, values, setFieldValue, defineField, submitCount } = useForm<Step1FormValues>({
  validationSchema: toTypedSchema(step1Schema),
  initialValues: {
    projectName: "",
    tagline: "",
    tokenSymbol: "",
    links: {
      twitter: "",
      website: "",
      telegram: "",
      linkedin: "",
      github: "",
    },
    overview: "",
    categories: [],
    teamMembers: [{ name: "", role: "", bio: "", links: "" }],
    ...props.defaultValues,
  },
})

const { fields: teamFields, push: addTeamMember, remove: removeTeamMember } = useFieldArray<Step1FormValues, "teamMembers">("teamMembers")

const [projectName, projectNameAttrs] = defineField("projectName")
const [tagline, taglineAttrs] = defineField("tagline")
const [tokenSymbol, tokenSymbolAttrs] = defineField("tokenSymbol")
const [overview, overviewAttrs] = defineField("overview")
const [linksTwitter, linksTwitterAttrs] = defineField("links.twitter")
const [linksWebsite, linksWebsiteAttrs] = defineField("links.website")
const [linksTelegram, linksTelegramAttrs] = defineField("links.telegram")
const [linksLinkedin, linksLinkedinAttrs] = defineField("links.linkedin")
const [linksGithub, linksGithubAttrs] = defineField("links.github")

const submitted = computed(() => submitCount.value > 0)
const errors = computed(() => submitted.value ? rawErrors.value : {})

const CATEGORIES = ["AI", "DeFi", "Gaming", "NFT", "RWA", "Infrastructure", "Social/DAO"]

const selectedCategories = computed(() => values.categories ?? [])

function toggleCategory(tag: string) {
  const current = selectedCategories.value
  if (current.includes(tag)) {
    setFieldValue("categories", current.filter((c) => c !== tag))
  } else if (current.length < 3) {
    setFieldValue("categories", [...current, tag])
  }
}

const projectImagePreview = ref<string | undefined>()
const projectImageInput = useTemplateRef<HTMLInputElement>("projectImageInput")

function handleProjectImageChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    setFieldValue("projectImage", file)
    projectImagePreview.value = URL.createObjectURL(file)
  }
}

function teamMemberImagePreview(index: number): string | undefined {
  const val = values.teamMembers?.[index]?.image
  if (val instanceof File) return URL.createObjectURL(val)
  return undefined
}

const onSubmit = handleSubmit((data) => {
  emit("next", data as Step1FormValues)
})
</script>

<template>
  <form class="flex flex-col gap-6 w-full" @submit="onSubmit">
    <h1 class="text-[32px] font-semibold text-white tracking-tight leading-tight">
      Project Identity
    </h1>

    <div class="flex flex-col gap-2">
      <p class="text-lg font-semibold text-white uppercase tracking-wide">Overview</p>
      <p class="text-base text-white">
        Explain what your project does and why it matters. Keep it clear and concise.
      </p>
    </div>

    <!-- Project name + tagline + image -->
    <div class="flex gap-6 items-start w-full">
      <div class="flex flex-col gap-6 flex-1 min-w-0">
        <!-- Project name -->
        <div class="flex flex-col gap-2">
          <label class="text-white text-base font-medium">Project name</label>
          <div class="flex flex-col gap-2">
            <UiInput
              v-model="projectName"
              v-bind="projectNameAttrs"
              placeholder="e.g., Therapy Dog Coin"
              :aria-invalid="!!errors.projectName"
            />
            <p v-if="errors.projectName" class="text-xs text-red-400 text-right">{{ errors.projectName }}</p>
            <p v-else class="text-xs text-[#d9d8d8] text-right">Required - 3-60 characters</p>
          </div>
        </div>

        <!-- Tagline -->
        <div class="flex flex-col gap-2">
          <label class="text-white text-base font-medium">Short tagline (max 32 characters)</label>
          <div class="flex flex-col gap-2">
            <div class="relative flex items-center">
              <UiInput
                v-model="tagline"
                v-bind="taglineAttrs"
                placeholder='e.g., "Healing the world, one paw at a time."'
                class="pr-32"
                :aria-invalid="!!errors.tagline"
              />
              <button
                type="button"
                class="absolute right-2 flex gap-1 items-center px-4 py-1 bg-[#333] rounded-2xl text-sm text-white hover:bg-[#444] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L9.19 8.63L2 9.24L7 13.97L5.82 21L12 17.27L18.18 21L17 13.97L22 9.24L14.81 8.63L12 2Z" />
                </svg>
                Suggest
              </button>
            </div>
            <p v-if="errors.tagline" class="text-xs text-red-400 text-right">{{ errors.tagline }}</p>
            <p v-else class="text-xs text-[#d9d8d8] text-right">This will appear under your project name.</p>
          </div>
        </div>
      </div>

      <!-- Project image upload -->
      <div class="w-[316px] shrink-0">
        <div class="flex flex-col gap-2">
          <span class="text-white text-base font-medium">Project Image</span>
          <div class="flex gap-4 items-center">
            <button
              type="button"
              class="bg-[rgba(242,242,242,0.2)] border border-[#333] rounded-xl p-5 flex items-center justify-center shrink-0 hover:border-[#156bb7] transition-colors"
              style="width: 79px; height: 79px"
              @click="projectImageInput?.click()"
            >
              <img v-if="projectImagePreview" :src="projectImagePreview" alt="preview" class="size-full object-cover rounded-lg">
              <Upload v-else class="text-[#d9d8d8]" :size="32" />
            </button>
            <div class="flex flex-col gap-2">
              <button
                type="button"
                class="flex gap-2 items-center px-6 py-3 border border-[#156bb7] bg-[#333] rounded-full text-[#d9d8d8] text-sm font-semibold uppercase hover:bg-[#444] transition-colors"
                @click="projectImageInput?.click()"
              >
                <Upload :size="16" />
                Upload Image
              </button>
              <p class="text-xs text-[#d9d8d8]">Appears as your project card cover on the marketplace. Recommended: 4:3 landscape ratio.</p>
            </div>
          </div>
          <input
            ref="projectImageInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleProjectImageChange"
          >
        </div>
      </div>
    </div>

    <!-- Token symbol -->
    <div class="flex flex-col gap-2">
      <label class="text-white text-base font-medium">Token symbol</label>
      <div class="flex flex-col gap-2">
        <UiInput
          v-model="tokenSymbol"
          v-bind="tokenSymbolAttrs"
          placeholder="A short code (e.g. TDOG, AI-FARM) used for trading, charts, and wallets."
        />
        <p class="text-xs text-[#d9d8d8] text-right">Optional now - required before launch.</p>
      </div>
    </div>

    <!-- Links & community -->
    <div class="flex flex-col gap-2">
      <label class="text-white text-base font-medium">Links & community</label>
      <div class="flex flex-col gap-2">
        <div class="flex gap-4 items-center">
          <img src="/icons/X.svg" alt="X" class="shrink-0" width="24" height="24">
          <UiInput v-model="linksTwitter" v-bind="linksTwitterAttrs" placeholder="Twitter / X" />
          <img src="/icons/website.svg" alt="Website" class="shrink-0" width="24" height="24">
          <UiInput v-model="linksWebsite" v-bind="linksWebsiteAttrs" placeholder="Website" />
        </div>
        <div class="flex gap-4 items-center">
          <div class="flex flex-1 gap-4 items-center min-w-0">
            <img src="/icons/tg.svg" alt="Telegram" class="shrink-0" width="24" height="24">
            <UiInput v-model="linksTelegram" v-bind="linksTelegramAttrs" placeholder="Telegram" />
          </div>
          <div class="flex flex-1 gap-4 items-center min-w-0">
            <img src="/icons/in.svg" alt="LinkedIn" class="shrink-0" width="24" height="24">
            <UiInput v-model="linksLinkedin" v-bind="linksLinkedinAttrs" placeholder="LinkedIn" />
          </div>
          <div class="flex flex-1 gap-4 items-center min-w-0">
            <img src="/icons/github.svg" alt="GitHub" class="shrink-0" width="24" height="24">
            <UiInput v-model="linksGithub" v-bind="linksGithubAttrs" placeholder="GitHub" />
          </div>
        </div>
        <p class="text-xs text-[#d9d8d8] text-right">Optional - add as many as you like</p>
      </div>
    </div>

    <!-- Overview textarea -->
    <div class="flex flex-col gap-2">
      <label class="text-white text-base font-medium">Overview</label>
      <UiTextarea
        v-model="overview"
        v-bind="overviewAttrs"
        placeholder="Explain what your project does and why it matters. Keep it clear and concise."
        class="min-h-[191px]"
        :aria-invalid="!!errors.overview"
      />
      <p v-if="errors.overview" class="text-xs text-red-400 text-right">{{ errors.overview }}</p>
      <p v-else class="text-xs text-[#d9d8d8] text-right">Markdown supported - Max ~1,000 characters</p>
    </div>

    <!-- Categories -->
    <div class="flex flex-col gap-4">
      <div>
        <p class="text-white text-base font-medium">Categories</p>
        <p class="text-white text-base font-medium">Select up to 3 tags that best describe your project.</p>
      </div>
      <div class="flex flex-wrap gap-4 items-center">
        <button
          v-for="tag in CATEGORIES"
          :key="tag"
          type="button"
          :class="[
            'px-4 py-1 rounded-full text-sm transition-colors',
            selectedCategories.includes(tag)
              ? 'bg-white text-black'
              : 'border border-white/30 bg-white/10 text-white hover:bg-white/20',
          ]"
          @click="toggleCategory(tag)"
        >
          {{ tag }}
        </button>
      </div>
      <p v-if="errors.categories" class="text-xs text-red-400">{{ errors.categories }}</p>
    </div>

    <!-- Team section -->
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <p class="text-lg font-semibold text-white uppercase tracking-wide">Team</p>
        <p class="text-base text-white">Add core team members. Investors will evaluate credibility before reading further.</p>
      </div>

      <div v-for="(entry, index) in teamFields" :key="entry.key" class="flex flex-col gap-6">
        <div class="flex gap-6 items-start">
          <div class="flex flex-col gap-6 flex-1 min-w-0">
            <!-- Name -->
            <div class="flex flex-col gap-2">
              <label class="text-white text-base font-medium">Name</label>
              <div class="flex flex-col gap-2">
                <UiInput
                  :model-value="values.teamMembers?.[index]?.name"
                  placeholder="e.g. Alex Chen"
                  :aria-invalid="!!errors[`teamMembers[${index}].name`]"
                  @update:model-value="setFieldValue(`teamMembers.${index}.name`, $event)"
                />
                <p v-if="errors[`teamMembers[${index}].name`]" class="text-xs text-red-400 text-right">
                  {{ errors[`teamMembers[${index}].name`] }}
                </p>
                <p v-else class="text-xs text-[#d9d8d8] text-right">Required - 3-60 characters</p>
              </div>
            </div>

            <!-- Role -->
            <div class="flex flex-col gap-2">
              <label class="text-white text-base font-medium">Role</label>
              <div class="flex flex-col gap-2">
                <UiInput
                  :model-value="values.teamMembers?.[index]?.role"
                  placeholder="e.g. Founder & CEO"
                  :aria-invalid="!!errors[`teamMembers[${index}].role`]"
                  @update:model-value="setFieldValue(`teamMembers.${index}.role`, $event)"
                />
                <p v-if="errors[`teamMembers[${index}].role`]" class="text-xs text-red-400 text-right">
                  {{ errors[`teamMembers[${index}].role`] }}
                </p>
                <p v-else class="text-xs text-[#d9d8d8] text-right">Required - 3-60 characters</p>
              </div>
            </div>
          </div>

          <!-- Profile image -->
          <div class="shrink-0">
            <div class="flex flex-col gap-2">
              <span class="text-white text-base font-medium">Profile image (Recommended)</span>
              <div class="flex gap-4 items-center">
                <button
                  type="button"
                  class="bg-[rgba(242,242,242,0.2)] border border-[#333] rounded-xl p-5 flex items-center justify-center shrink-0 hover:border-[#156bb7] transition-colors"
                  style="width: 79px; height: 79px"
                  @click="($refs[`teamImageInput${index}`] as HTMLInputElement)?.click()"
                >
                  <img v-if="teamMemberImagePreview(index)" :src="teamMemberImagePreview(index)" alt="preview" class="size-full object-cover rounded-lg">
                  <Upload v-else class="text-[#d9d8d8]" :size="32" />
                </button>
                <div class="flex flex-col gap-2">
                  <button
                    type="button"
                    class="flex gap-2 items-center px-6 py-3 border border-[#156bb7] bg-[#333] rounded-full text-[#d9d8d8] text-sm font-semibold uppercase hover:bg-[#444] transition-colors"
                    @click="($refs[`teamImageInput${index}`] as HTMLInputElement)?.click()"
                  >
                    <Upload :size="16" />
                    Upload Image
                  </button>
                  <p class="text-xs text-[#d9d8d8]">Appears on your project card</p>
                </div>
              </div>
              <input
                :ref="`teamImageInput${index}`"
                type="file"
                accept="image/*"
                class="hidden"
                @change="(e: Event) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) setFieldValue(`teamMembers.${index}.image`, file)
                }"
              >
            </div>
          </div>
        </div>

        <!-- Bio -->
        <div class="flex flex-col gap-2">
          <label class="text-white text-base font-medium">Bio</label>
          <UiTextarea
            :model-value="values.teamMembers?.[index]?.bio"
            placeholder="Short Bio"
            class="min-h-[191px]"
            @update:model-value="setFieldValue(`teamMembers.${index}.bio`, $event)"
          />
          <p v-if="errors[`teamMembers[${index}].bio`]" class="text-xs text-red-400 text-right">
            {{ errors[`teamMembers[${index}].bio`] }}
          </p>
          <p v-else class="text-xs text-[#d9d8d8] text-right">Markdown supported - Max ~100 characters</p>
        </div>

        <!-- Links optional -->
        <div class="flex flex-col gap-2">
          <label class="text-white text-base font-medium">Links (optional)</label>
          <div class="flex flex-col gap-2">
            <UiInput
              :model-value="values.teamMembers?.[index]?.links"
              placeholder="LinkedIn / X / GitHub"
              @update:model-value="setFieldValue(`teamMembers.${index}.links`, $event)"
            />
            <p class="text-xs text-[#d9d8d8] text-right">Optional</p>
          </div>
        </div>

        <!-- Remove button -->
        <div v-if="teamFields.length > 1" class="flex justify-end">
          <button
            type="button"
            class="text-sm text-[#d9d8d8] hover:text-red-400 transition-colors"
            @click="removeTeamMember(index)"
          >
            Remove member
          </button>
        </div>
      </div>

      <!-- Add team member -->
      <div class="flex justify-end">
        <button
          type="button"
          class="flex gap-2 items-center px-6 py-3 border border-[#156bb7] rounded-full text-white text-base font-semibold uppercase hover:bg-white/5 transition-colors"
          @click="addTeamMember({ name: '', role: '', bio: '', links: '' })"
        >
          <Plus :size="20" />
          Add team member
        </button>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex items-end justify-between py-6">
      <button
        type="button"
        class="flex gap-2 items-center px-6 py-3 border border-[#156bb7] rounded-full text-white text-base font-semibold uppercase hover:bg-white/5 transition-colors"
        @click="emit('back')"
      >
        <ArrowLeft :size="20" />
        Back
      </button>
      <button
        type="submit"
        class="flex gap-2 items-center px-6 py-3 bg-white border border-[#156bb7] rounded-full text-[#002147] text-base font-semibold uppercase hover:bg-white/90 transition-colors"
      >
        Next
        <ArrowRight :size="20" />
      </button>
    </div>
  </form>
</template>
