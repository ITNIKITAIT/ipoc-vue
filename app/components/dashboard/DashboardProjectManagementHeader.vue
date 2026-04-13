<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  ticker: string
  tagline: string
  status: "fundraising" | "post-raise"
  category: string
  imageUrl?: string
}>(), {
  imageUrl: "/previews/3.png",
})
</script>

<template>
  <div class="flex items-start gap-6">
    <div class="size-[72px] shrink-0 overflow-hidden rounded border-2 border-[#1a7c7f]">
      <img :src="imageUrl" :alt="name" class="size-full object-cover">
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <h1 class="text-[32px] font-bold leading-[1.3] text-white">{{ name }}</h1>
        <span class="text-xl leading-[1.5] text-white">{{ ticker }}</span>
      </div>

      <div class="flex gap-2">
        <div v-if="status === 'fundraising'" class="flex w-[123px] items-center gap-2 rounded-lg bg-[green] px-3 py-2 text-xs font-bold text-white">
          <UiSvgIcon src="/icons/launch.svg" class="size-4 text-white" />
          Fundraising
        </div>
        <div v-else class="flex w-[123px] items-center gap-2 rounded-lg border border-[#156bb7] bg-[rgba(0,0,128,0.68)] px-3 py-2 text-xs font-bold text-white">
          Post-raise
        </div>
        <div class="flex items-center gap-2 rounded-lg bg-[#d9d8d8] px-3 py-2 text-xs text-[#002147]">
          <UiSvgIcon src="/icons/defi.svg" class="size-4 text-[#002147]" />
          {{ category }}
        </div>
      </div>

      <p class="text-xl font-medium leading-[1.5] text-white">{{ tagline }}</p>
    </div>
  </div>
</template>
