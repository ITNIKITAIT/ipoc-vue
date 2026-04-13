<script setup lang="ts">
import { Search, ChevronDown } from "lucide-vue-next"
</script>

<template>
  <div class="flex w-full items-end gap-10">
    <div class="flex w-[370px] shrink-0 flex-col">
      <h2 class="text-heading-m text-text-00">New to Web3?</h2>
      <p class="text-body-l text-text-00">Start by exploring live projects below.</p>
    </div>

    <div class="flex flex-1 items-center justify-end gap-inner">
      <div class="flex items-center gap-inner">
        <UiButton
          variant="ghost"
          class="text-text-00 hover:bg-white/10"
          aria-label="Search"
        >
          <Search class="size-6" />
        </UiButton>

        <UiButton variant="grey" class="w-[173px] rounded-lg font-normal">
          <img src="/icons/filter.svg" alt="Filter" class="size-6">
          Filter
        </UiButton>
      </div>

      <div class="flex items-center gap-tiny">
        <span class="text-body-l text-text-00">Sort:</span>
        <UiButton variant="grey" class="w-[197px] justify-between rounded-lg font-normal">
          Trending
          <ChevronDown class="size-6" />
        </UiButton>
      </div>
    </div>
  </div>
</template>
