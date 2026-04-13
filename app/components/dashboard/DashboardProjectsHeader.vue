<script setup lang="ts">
import { Plus } from "lucide-vue-next"
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="text-[32px] font-bold leading-[1.3] text-white">My Projects</h1>
    <NuxtLink
      to="/create-project"
      class="flex items-center gap-2 rounded-full border border-[#156bb7] px-6 py-3 text-lg font-semibold uppercase text-white hover:bg-white/5"
    >
      <Plus class="size-6" />
      Create Project
    </NuxtLink>
  </div>
</template>
