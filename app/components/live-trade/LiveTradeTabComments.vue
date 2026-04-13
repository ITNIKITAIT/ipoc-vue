<script setup lang="ts">
import { MessageCircle, Heart, Clock, HelpCircle, AlertTriangle, Info, Shield, User } from "lucide-vue-next"

const comments = [
  { avatar: null, name: "8xSk...Lnw3x", tokens: "10.91M SYB", isVerified: false, tag: "Questions", time: "5m ago", text: "Has the team confirmed the final delivery date for the Mainnet launch? The milestone deadline is approaching and I don\u2019t see the proof uploaded yet.", replies: 2, likes: 1 },
  { avatar: null, name: "Founder", tokens: "4.20M SYB", isVerified: true, tag: "Questions", time: "12m ago", text: "Thanks for flagging this. Final QA is in progress and the proof package (repo link + deployment hash) will be uploaded within 24 hours.", replies: 0, likes: 0 },
  { avatar: null, name: "PnTa...Q3mg", tokens: "850K SYB", isVerified: false, tag: "Risk", time: "18m ago", text: "The GitHub repo hasn\u2019t been updated in the last 10 days. Can the founders clarify if development is still on track for this milestone?", replies: 0, likes: 0 },
]

const tagIcons: Record<string, any> = { Questions: HelpCircle, Risk: AlertTriangle, General: Info }
</script>

<template>
  <div class="flex flex-col gap-6 pb-6 px-6">
    <div class="flex flex-col gap-2 text-[#d9d8d8] leading-[1.5] pt-6">
      <p class="text-[20px]">Comments</p>
      <p class="text-sm">Community discussion and project accountability.<br>Current focus: Milestone 3 — Mainnet Launch</p>
    </div>

    <div class="flex flex-col gap-4">
      <p class="text-sm text-white leading-[1.5]">Write a comment</p>
      <div class="flex flex-col gap-2">
        <textarea class="w-full h-[148px] p-3 bg-transparent border border-white text-white text-sm leading-[1.5] placeholder:text-[#666] resize-none outline-none" placeholder="Ask a question, raise a concern, or comment on milestone progress..." />
        <p class="text-xs text-[#d9d8d8] leading-[1.5] text-right">Comments are public. Low-signal spam may be downranked. Max 800 characters</p>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex gap-2 items-center">
          <div v-for="label in ['Questions', 'Risk', 'General']" :key="label" class="relative flex items-center gap-2 px-4 py-1 rounded-[40px] overflow-hidden">
            <div class="absolute inset-0 bg-[#1a1a1a] rounded-[40px]" />
            <div class="absolute inset-0 shadow-[inset_1px_1px_3px_0px_rgba(0,0,0,0.25)] rounded-[40px]" />
            <component :is="tagIcons[label]" :size="16" class="text-white relative z-10" />
            <span class="text-sm text-white leading-[1.5] relative z-10">{{ label }}</span>
          </div>
        </div>
        <button class="bg-[#1a1a1a] px-6 py-2 rounded text-base text-white leading-[1.5]">Post</button>
      </div>
    </div>

    <div class="h-px bg-[#333] w-full" />

    <div v-for="(c, i) in comments" :key="i" class="flex gap-4 items-start">
      <div class="size-12 rounded-full bg-[#333] shrink-0 flex items-center justify-center">
        <User :size="24" class="text-[#666]" />
      </div>
      <div class="flex flex-col gap-4 flex-1">
        <div class="flex gap-4 items-center">
          <span class="text-sm text-white leading-[1.5]">{{ c.name }}</span>
          <div v-if="c.isVerified" class="flex items-center gap-2 py-1">
            <Shield :size="16" class="text-[#2bced4]" />
            <span class="text-sm text-[#2bced4] leading-[1.5]">Verified</span>
          </div>
          <span class="text-sm text-white leading-[1.5]">{{ c.tokens }}</span>
        </div>
        <div class="flex gap-4 items-center">
          <div class="relative flex items-center gap-2 px-4 py-1 rounded-[40px] overflow-hidden">
            <div class="absolute inset-0 bg-[#1a1a1a] rounded-[40px]" />
            <div class="absolute inset-0 shadow-[inset_1px_1px_3px_0px_rgba(0,0,0,0.25)] rounded-[40px]" />
            <component :is="tagIcons[c.tag] ?? Info" :size="16" class="text-white relative z-10" />
            <span class="text-sm text-white leading-[1.5] relative z-10">{{ c.tag }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Clock :size="20" class="text-white" />
            <span class="text-sm text-white leading-[1.5]">{{ c.time }}</span>
          </div>
        </div>
        <p class="text-xs text-[#d9d8d8] leading-[1.5]">{{ c.text }}</p>
        <div class="flex gap-4 items-center">
          <div class="flex items-center gap-2">
            <MessageCircle :size="20" class="text-white" />
            <span class="text-sm text-white leading-[1.5]">{{ c.replies }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Heart :size="20" class="text-white" />
            <span class="text-sm text-white leading-[1.5]">{{ c.likes }}</span>
          </div>
        </div>
      </div>
    </div>

    <p class="text-sm text-[#666] leading-[1.5] text-center">Founder responses and community discussion inform milestone voting.<br>Funds are released only after proof submission and majority approval.</p>
  </div>
</template>
