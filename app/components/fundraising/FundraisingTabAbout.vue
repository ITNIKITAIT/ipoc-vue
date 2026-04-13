<script setup lang="ts">
const teamMembers = [
  { name: "Alex Chen", role: "Founder & CEO", bio: "Former Product Lead at Binance with 8+ years in crypto and fintech. Focused on token economics, product strategy, and ecosystem growth.", image: "/person/1.jpg" },
  { name: "Sarah Lim", role: "CTO", bio: "Ex-Google engineer specializing in blockchain infrastructure and smart contract development. Leads technical architecture and security.", image: "/person/2.jpg" },
  { name: "David Wong", role: "Head of Growth", bio: "Previously part of StepN's growth team. Expert in Web3 community building, partnerships, and user acquisition strategies.", image: "/person/3.jpg" },
]

const techDetails = [
  { label: "Category", value: "Move-to-Earn / DeFi" },
  { label: "Blockchain", value: "BNB Smart Chain" },
  { label: "Token Standard", value: "BEP-20" },
  { label: "Launch Phase", value: "Fundraising" },
  { label: "Initial Fundraise", value: "$50,000" },
  { label: "Current Status", value: "Active with milestone-based fund release" },
]
</script>

<template>
  <div class="flex flex-col gap-6 p-6">
    <p class="text-[20px] text-white leading-[1.5]">Team</p>
    <div class="flex gap-4 w-full">
      <div v-for="m in teamMembers" :key="m.name" class="flex-1 bg-[#333] rounded-lg p-4 flex flex-col gap-4 items-center">
        <div class="size-16 rounded-full overflow-hidden relative shrink-0">
          <img :src="m.image" :alt="m.name" class="size-full object-cover">
        </div>
        <div class="text-center">
          <p class="text-sm text-white leading-[1.5]">{{ m.name }}</p>
          <p class="text-sm text-white leading-[1.5]">{{ m.role }}</p>
        </div>
        <p class="text-sm text-white leading-[1.5]">{{ m.bio }}</p>
      </div>
    </div>

    <p class="text-sm font-bold text-white leading-[1.5]">About the project</p>
    <div class="flex flex-col gap-2">
      <p class="text-sm text-white leading-[1.5]">Sneaker-Yield Bro is a Web3 move-to-earn platform that rewards users with tokens for real-world activity. By combining NFT-based sneakers with gamified fitness mechanics, the project creates a system where users earn, upgrade, and trade digital assets.</p>
      <p class="text-sm text-white leading-[1.5]">The platform connects lifestyle and decentralized finance, encouraging daily movement while generating token-based rewards through participation.</p>
    </div>

    <div class="flex flex-col gap-4">
      <div v-for="d in techDetails" :key="d.label" class="flex gap-8 items-center text-base text-white leading-[1.5]">
        <span class="w-[168px] shrink-0 font-medium">{{ d.label }}</span>
        <span>{{ d.value }}</span>
      </div>
    </div>

    <div class="flex flex-col gap-2 text-center">
      <p class="text-xs text-[#f2f2f2] leading-[1.5]">Funds are held in a secure on-chain vault and released only after milestone approval by the community.</p>
      <p class="text-xs text-[#ff9900] leading-[1.5]">You are participating in an early-stage project. Returns are not guaranteed.</p>
    </div>
  </div>
</template>
