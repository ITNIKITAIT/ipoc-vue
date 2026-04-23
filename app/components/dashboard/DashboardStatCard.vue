<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  value: string
  subtitle: string
  valueColor?: string
}>(), {
  valueColor: "text-white",
})
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 rounded-3xl border border-[#1a1a1a] bg-[#1a1a1a] p-6">
    <p class="text-base font-medium leading-[1.5] text-white">{{ props.title }}</p>
    <p :class="cn('text-[30px] font-semibold leading-[1.28] tracking-tight', props.valueColor)">{{ props.value }}</p>
    <p class="text-sm leading-[1.5] text-[#666]">{{ props.subtitle }}</p>
  </div>
</template>
