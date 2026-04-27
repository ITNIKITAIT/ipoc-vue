<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  options: string[]
}>()

const model = defineModel<boolean[]>({ required: true })
</script>

<template>
  <div class="rounded-2xl bg-[#1a1a1a] p-4">
    <div class="flex items-start gap-3">
      <div class="flex size-12 shrink-0 items-center justify-center rounded-lg border border-[#333] bg-[#1a1a1a] shadow-[inset_2px_2px_4px_0_rgba(0,0,0,0.25)]">
        <UiSvgIcon :src="icon" class="size-6 text-white" />
      </div>

      <div class="flex flex-1 flex-col justify-center gap-3">
        <p class="text-base font-medium text-white">{{ title }}</p>
        <label
          v-for="(option, i) in options"
          :key="i"
          class="flex cursor-pointer items-center gap-4"
        >
          <UiCheckbox v-model="model[i]" />
          <span class="text-base leading-[1.7] text-white">{{ option }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
