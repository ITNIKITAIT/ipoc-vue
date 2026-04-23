<script setup lang="ts">
withDefaults(defineProps<{
  content: string
  size?: number
  side?: "left" | "right"
}>(), {
  size: 20,
  side: "right",
})
</script>

<template>
  <span class="relative inline-flex group">
    <button
      type="button"
      aria-label="More info"
      :style="{ width: `${size}px`, height: `${size}px` }"
      class="flex shrink-0 items-center justify-center rounded-full bg-white font-bold leading-none text-[#002147]"
    >
      <span :style="{ fontSize: `${Math.round(size * 0.65)}px` }">i</span>
    </button>
    <span
      role="tooltip"
      :class="[
        'pointer-events-none absolute top-full z-20 mt-2 w-max max-w-[260px] rounded-lg bg-white px-3 py-2 text-sm leading-[1.5] text-[#002147] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100',
        side === 'right' ? 'right-0' : 'left-0',
      ]"
    >
      {{ content }}
    </span>
  </span>
</template>
