<script setup lang="ts">
defineProps<{
  title: string
  description: string
  actionLabel: string
  onAction?: () => void
}>()
</script>

<template>
  <div class="flex w-full items-center gap-[22px] rounded-2xl border border-[#ffcc80] bg-[rgba(255,153,0,0.38)] px-6 py-4">
    <UiSvgIcon src="/icons/warn.svg" class="size-10 text-[#ff9900]" />
    <div class="flex flex-1 flex-col">
      <p class="text-xl leading-[1.5] text-white">{{ title }}</p>
      <p class="text-base font-medium leading-[1.5] text-white">{{ description }}</p>
    </div>
    <button
      class="shrink-0 rounded-full border border-[#156bb7] bg-[rgba(255,153,0,0.68)] px-6 py-3 text-lg font-semibold uppercase text-[#002147] hover:bg-[rgba(255,153,0,0.85)]"
      @click="onAction?.()"
    >
      {{ actionLabel }}
    </button>
  </div>
</template>
