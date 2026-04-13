<script setup lang="ts">
import { Sun } from "lucide-vue-next"

const isConnected = ref(false)
const route = useRoute()

const navLinks = [
  { label: "Marketplace", href: "/products" },
  { label: "Create Project", href: "/create-project" },
  { label: "Learning Hub", href: "#" },
]

const roleTabs = [
  { label: "Investor", icon: "/icons/investor.svg", href: "/dashboard/investor" },
  { label: "Creator", icon: "/icons/creator.svg", href: "/dashboard" },
]

const activeRole = computed(() => {
  if (route.path.startsWith("/dashboard/investor")) return "Investor"
  if (route.path.startsWith("/dashboard")) return "Creator"
  return null
})
</script>

<template>
  <nav class="flex w-full items-center justify-between bg-black px-12 py-4">
    <UiContainer class="flex-row items-center justify-between">
      <NuxtLink to="/products" class="relative flex items-center shrink-0 text-heading-s text-white">
        <img src="/ipoc-logo.svg" alt="IPOC" class="object-contain">
      </NuxtLink>

      <div class="flex items-center gap-small">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.href"
          :to="link.href"
          class="px-4 py-3 text-lg font-semibold uppercase text-white transition-colors hover:text-brand-primary-20"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <div class="flex items-center gap-4">
        <Sun class="size-6 text-white cursor-pointer" />

        <template v-if="isConnected">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-4">
              <NuxtLink
                v-for="role in roleTabs"
                :key="role.label"
                :to="role.href"
                :class="cn(
                  'flex items-center gap-1 px-4 py-[9px] text-xl font-medium leading-[1.5] transition-colors',
                  activeRole === role.label
                    ? 'border-b-2 border-brand-secondary-50 text-brand-secondary-50'
                    : 'text-[#666] hover:text-white',
                )"
              >
                <UiSvgIcon
                  :src="role.icon"
                  :class="cn(
                    'size-6',
                    activeRole === role.label
                      ? 'text-brand-secondary-50'
                      : 'text-[#666]',
                  )"
                />
                {{ role.label }}
              </NuxtLink>
            </div>

            <button
              class="size-14 rounded-full border border-[#156bb7] overflow-hidden shrink-0"
              @click="isConnected = false"
            >
              <img src="/person/avatar.jpg" alt="Profile" class="size-full object-cover">
            </button>
          </div>
        </template>

        <template v-else>
          <UiButton
            variant="white"
            class="uppercase font-semibold rounded-full"
            @click="isConnected = true"
          >
            <UiSvgIcon src="/icons/wallet.svg" class="size-5 text-black" />
            Connect Wallet
          </UiButton>
        </template>
      </div>
    </UiContainer>
  </nav>
</template>
