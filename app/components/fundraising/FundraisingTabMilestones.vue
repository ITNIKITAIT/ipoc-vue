<script setup lang="ts">
import { Lock } from "lucide-vue-next"

defineProps<{ isConnected?: boolean }>()

const milestones = [
  { title: "Milestone 1 \u2014 MVP Development", description: "Deliver working web app with wallet connect, project creation, and marketplace browse.", unlock: "Unlocks $10,000 \u2014 20% of vault", deadline: "Dec 15, 2025", status: "Locked" },
  { title: "Milestone 2 \u2014 Mainnet Deployment", description: "Deploy token contract on BNB Chain, activate liquidity pool staging, and complete security audit.", unlock: "Unlocks $15,000 \u2014 30% of vault", deadline: "Jan 20, 2026", status: "Locked" },
  { title: "Milestone 3 \u2014 Community growth \u2014 10,000 active users", description: "Reach 10,000 monthly active wallets with verified walk-to-earn activity and DAO participation.", unlock: "Unlocks $17,500 \u2014 35% of vault", deadline: "Jun 30, 2026", status: "Locked" },
]
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <div class="flex flex-col gap-0 w-full text-white">
      <p class="text-[20px] font-bold leading-[1.4]">Funding Milestones</p>
      <p class="text-base font-medium leading-[1.5]">Each milestone unlocks a portion of the raised funds.</p>
    </div>

    <div class="flex gap-6 items-start w-full">
      <div class="relative shrink-0 w-[41px] self-stretch">
        <div class="absolute left-1/2 top-4 bottom-4 w-[2px] bg-[#333] -translate-x-1/2" />
        <div v-for="i in 3" :key="i" class="absolute left-1/2 -translate-x-1/2 size-[18px] rounded-full border-2 border-[#2bced4] bg-[#1a1a1a]" :style="{ top: `calc(${(i - 1) * 33 + 5}%)` }" />
      </div>

      <div class="flex flex-col gap-6 flex-1">
        <div v-for="(m, i) in milestones" :key="i" class="relative bg-[#1a1a1a] rounded-2xl p-6 flex flex-col gap-2">
          <div class="absolute top-6 right-6 flex flex-col items-center gap-1">
            <span class="text-xs text-white text-center">{{ m.status }}</span>
            <div class="relative flex items-center justify-center p-3 rounded-full overflow-hidden shadow-[0px_0px_2px_0px_rgba(0,0,0,0.1),0px_1px_8px_0px_rgba(0,0,0,0.1)]">
              <div class="absolute inset-0 backdrop-blur-md bg-[rgba(51,51,51,0.38)]" />
              <Lock :size="24" class="text-white relative z-10" />
            </div>
          </div>
          <div class="flex flex-col gap-2 pr-20">
            <h3 class="text-[20px] font-semibold text-white leading-[1.5]">{{ m.title }}</h3>
            <p class="text-base font-medium text-white leading-[1.5]">{{ m.description }}</p>
            <div class="flex gap-8 items-center text-base font-medium text-white leading-[1.5]">
              <span class="w-[120px]">Unlock:</span><span>{{ m.unlock }}</span>
            </div>
            <div class="flex gap-8 items-center text-base font-medium text-white leading-[1.5]">
              <span class="w-[120px]">Deadline:</span><span>{{ m.deadline }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-if="isConnected" class="text-base font-medium text-white leading-[1.5]">
      Funds are securely held in the project vault and released only after successful milestone completion and community approval.
    </p>
  </div>
</template>
