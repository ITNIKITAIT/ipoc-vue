<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    orientation?: "horizontal" | "vertical"
    class?: string
  }>(),
  { orientation: "horizontal" },
)
</script>

<template>
  <div
    role="separator"
    data-slot="separator"
    :data-orientation="props.orientation"
    :class="cn(
      'shrink-0 bg-border',
      props.orientation === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch',
      props.class,
    )"
  />
</template>
