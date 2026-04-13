<script setup lang="ts">
import { Check } from "lucide-vue-next"

const model = defineModel<boolean>({ default: false })

defineProps<{
  class?: string
  disabled?: boolean
}>()
</script>

<template>
  <button
    type="button"
    role="checkbox"
    :aria-checked="model"
    :disabled="disabled"
    :class="cn(
      'peer size-4 shrink-0 rounded-[4px] border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50',
      model ? 'border-[#156bb7] bg-[#156bb7] text-white' : 'border-[#555] bg-transparent',
      $props.class,
    )"
    @click="model = !model"
  >
    <Check v-if="model" class="size-3 mx-auto" />
  </button>
</template>
