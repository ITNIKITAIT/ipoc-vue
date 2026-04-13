<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="card-title"
    :class="cn('font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm', $props.class)"
  >
    <slot />
  </div>
</template>
