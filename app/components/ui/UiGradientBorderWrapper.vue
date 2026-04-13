<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    class?: string
    innerClassName?: string
    gradientClassName?: string
    borderClassName?: string
  }>(),
  {
    gradientClassName: "bg-linear-to-r from-fuchsia-500 to-cyan-500",
    borderClassName: "p-px",
  },
)
</script>

<template>
  <div
    data-slot="gradient-border-wrapper"
    :class="cn('inline-flex rounded-md', props.gradientClassName, props.borderClassName, props.class)"
  >
    <div :class="cn('inline-flex rounded-[inherit]', props.innerClassName)">
      <slot />
    </div>
  </div>
</template>
