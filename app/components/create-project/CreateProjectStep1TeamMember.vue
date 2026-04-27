<script setup lang="ts">
import { useField } from "vee-validate"
import { Upload } from "lucide-vue-next"

const props = defineProps<{
  index: number
  canRemove: boolean
  submitAttempted: boolean
}>()

const emit = defineEmits<{ remove: [] }>()

const namePath = computed(() => `teamMembers[${props.index}].name`)
const rolePath = computed(() => `teamMembers[${props.index}].role`)
const bioPath = computed(() => `teamMembers[${props.index}].bio`)
const linksPath = computed(() => `teamMembers[${props.index}].links`)
const imagePath = computed(() => `teamMembers[${props.index}].image`)

const { value: name, errorMessage: nameError, meta: nameMeta, handleBlur: nameBlur } = useField<string>(namePath, undefined, { validateOnValueUpdate: true })
const { value: role, errorMessage: roleError, meta: roleMeta, handleBlur: roleBlur } = useField<string>(rolePath, undefined, { validateOnValueUpdate: true })
const { value: bio, errorMessage: bioError, meta: bioMeta, handleBlur: bioBlur } = useField<string>(bioPath, undefined, { validateOnValueUpdate: true })
const { value: links } = useField<string>(linksPath)
const { value: image, setValue: setImage } = useField<File | undefined>(imagePath)

const showNameError = computed(() => !!nameError.value && (nameMeta.touched || props.submitAttempted))
const showRoleError = computed(() => !!roleError.value && (roleMeta.touched || props.submitAttempted))
const showBioError = computed(() => !!bioError.value && (bioMeta.touched || props.submitAttempted))

const imagePreview = computed(() => (image.value instanceof File ? URL.createObjectURL(image.value) : undefined))
const imageInput = useTemplateRef<HTMLInputElement>("imageInput")

function handleImageChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) setImage(file)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex gap-6 items-start">
      <div class="flex flex-col gap-6 flex-1 min-w-0">
        <div class="flex flex-col gap-2">
          <label class="text-white text-base font-medium">Name</label>
          <div class="flex flex-col gap-2">
            <UiInput
              v-model="name"
              placeholder="e.g. Alex Chen"
              :aria-invalid="showNameError"
              @blur="nameBlur"
            />
            <p v-if="showNameError" class="text-xs text-red-400 text-right">{{ nameError }}</p>
            <p v-else class="text-xs text-[#d9d8d8] text-right">Required - 3-60 characters</p>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-white text-base font-medium">Role</label>
          <div class="flex flex-col gap-2">
            <UiInput
              v-model="role"
              placeholder="e.g. Founder & CEO"
              :aria-invalid="showRoleError"
              @blur="roleBlur"
            />
            <p v-if="showRoleError" class="text-xs text-red-400 text-right">{{ roleError }}</p>
            <p v-else class="text-xs text-[#d9d8d8] text-right">Required - 3-60 characters</p>
          </div>
        </div>
      </div>

      <div class="shrink-0 w-[316px]">
        <div class="flex flex-col gap-2 items-end">
          <div class="text-right">
            <span class="text-white text-base font-medium whitespace-nowrap">Profile image (Recommended)</span>
          </div>
          <div class="flex gap-4 items-start">
            <button
              type="button"
              class="bg-[rgba(242,242,242,0.2)] border border-[#333] rounded-xl flex items-center justify-center shrink-0 size-[79px] overflow-hidden hover:border-[#156bb7] transition-colors"
              :class="imagePreview ? 'p-0' : 'p-5'"
              @click="imageInput?.click()"
            >
              <img v-if="imagePreview" :src="imagePreview" alt="preview" class="size-full object-cover">
              <UiSvgIcon v-else src="/icons/img.svg" class="size-10 text-[#d9d8d8]" />
            </button>
            <div class="flex flex-col gap-2 w-[218px]">
              <button
                type="button"
                class="w-full flex gap-2 items-center justify-center px-6 py-3 border border-[#156bb7] bg-[#333] rounded-full text-[#d9d8d8] text-[18px] font-semibold uppercase shadow-[2px_2px_8px_0px_rgba(0,0,0,0.12)] hover:bg-[#444] transition-colors"
                @click="imageInput?.click()"
              >
                <Upload :size="24" />
                Upload Image
              </button>
              <p class="text-sm text-[#d9d8d8]">Appears on your project card</p>
            </div>
          </div>
          <input
            ref="imageInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleImageChange"
          >
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-white text-base font-medium">Bio</label>
      <UiTextarea
        v-model="bio"
        placeholder="Short Bio"
        class="min-h-[191px]"
        @blur="bioBlur"
      />
      <p v-if="showBioError" class="text-xs text-red-400 text-right">{{ bioError }}</p>
      <p v-else class="text-xs text-[#d9d8d8] text-right">Markdown supported - Max ~100 characters</p>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-white text-base font-medium">Links (optional)</label>
      <div class="flex flex-col gap-2">
        <UiInput v-model="links" placeholder="LinkedIn / X / GitHub" />
        <p class="text-xs text-[#d9d8d8] text-right">Optional</p>
      </div>
    </div>

    <div v-if="canRemove" class="flex justify-end">
      <button
        type="button"
        class="text-sm text-[#d9d8d8] hover:text-red-400 transition-colors"
        @click="emit('remove')"
      >
        Remove member
      </button>
    </div>
  </div>
</template>
