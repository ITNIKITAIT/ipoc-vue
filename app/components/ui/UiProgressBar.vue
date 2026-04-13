<script setup lang="ts">
defineProps<{
  label: string
  percentage: number
  description: string
  color?: "fundraising" | "milestone"
}>()
</script>

<template>
  <div class="flex w-full flex-col gap-1">
    <div class="flex flex-col gap-1">
      <p class="text-body-m text-text-00">{{ label }}</p>
      <div class="relative grid w-full">
        <div class="col-start-1 row-start-1 h-4 w-full rounded-full bg-[#A6A6A6]" />
        <div
          :class="cn(
            'col-start-1 row-start-1 h-4 rounded-full',
            color === 'milestone'
              ? 'bg-status-milestone-bar'
              : 'bg-status-fundraising-bar',
          )"
          :style="{ width: `${percentage}%` }"
        />
      </div>
    </div>
    <p class="text-body-s text-text-00">{{ description }}</p>
  </div>
</template>
