<script setup lang="ts">
const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('mx-auto w-full max-w-[1200px] px-4 flex flex-col gap-10', props.class)">
    <slot />
  </div>
</template>
