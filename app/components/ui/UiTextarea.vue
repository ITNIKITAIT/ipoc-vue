<script setup lang="ts">
const model = defineModel<string>()

defineProps<{
  class?: string
}>()
</script>

<template>
  <textarea
    v-model="model"
    data-slot="textarea"
    :class="cn(
      'w-full min-w-0 resize-y rounded-lg border border-[#333] bg-[#1a1a1a] px-4 py-2 text-base text-white outline-none transition-colors placeholder:text-[#d9d8d8] shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.25)] focus-visible:border-[#156bb7] focus-visible:ring-2 focus-visible:ring-[#156bb7]/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-2 aria-invalid:ring-red-500/20',
      $props.class,
    )"
  />
</template>
