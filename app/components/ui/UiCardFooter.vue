<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="card-footer"
    :class="cn('flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3', $props.class)"
  >
    <slot />
  </div>
</template>
