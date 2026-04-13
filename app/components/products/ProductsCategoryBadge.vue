<script setup lang="ts">
defineProps<{
  category: string
}>()
</script>

<template>
  <div class="flex shrink-0 items-center gap-tiny rounded-b-lg bg-neutral-30 px-3 h-9 text-body-s text-oxford-blue">
    <img src="/icons/defi.svg" alt="DeFi" class="size-4">
    {{ category }}
  </div>
</template>
