<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
  class?: string
}>()
</script>

<template>
  <span
    role="img"
    :aria-label="alt ?? ''"
    :class="cn('inline-block shrink-0 bg-current', $props.class)"
    :style="{
      maskImage: `url(${src})`,
      WebkitMaskImage: `url(${src})`,
      maskSize: 'contain',
      WebkitMaskSize: 'contain',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskPosition: 'center',
    }"
  />
</template>
