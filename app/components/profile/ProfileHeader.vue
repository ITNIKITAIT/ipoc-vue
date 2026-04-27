<script setup lang="ts">
import { Globe, Twitter, Github, Share2 } from "lucide-vue-next";

const socialButtons = [
  { icon: Globe, label: "Website" },
  { icon: Twitter, label: "X" },
  { icon: Github, label: "Github" },
  { icon: Share2, label: "Share" },
];
</script>

<template>
  <div class="relative w-full">
    <div class="relative h-[102px] w-full overflow-hidden">
      <img src="/images/bg-profile.jpg" alt="" class="size-full object-cover" />
    </div>
    <div class="mx-auto max-w-[1200px] relative w-full">
      <div class="absolute right-5 -top-3 flex flex-col items-end gap-4">
        <NuxtLink
          to="/profile/setting"
          class="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/20 px-6 py-3 text-base font-semibold uppercase text-white backdrop-blur-md transition-colors hover:bg-white/30">
          <UiSvgIcon src="/icons/edit.svg" class="size-5 text-white" />
          Edit profile
        </NuxtLink>

        <div class="flex items-center gap-4">
          <button
            v-for="btn in socialButtons"
            :key="btn.label"
            type="button"
            :aria-label="btn.label"
            class="flex items-center justify-center rounded-full border border-white/80 bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20">
            <component :is="btn.icon" class="size-5" />
          </button>
        </div>
      </div>

      <div class="relative -mt-12 flex flex-col items-center gap-2">
        <div
          class="size-24 overflow-hidden rounded-full border-2 border-white/40 shadow-lg">
          <img
            src="/person/avatar.jpg"
            alt="Profile avatar"
            class="size-full object-cover" />
        </div>
        <p class="text-tiny text-white">Member since May 2024</p>
      </div>
    </div>
  </div>
</template>
