<script setup lang="ts">
// import { Moon, Sun } from "lucide-vue-next"

const isConnected = ref(false)
const route = useRoute()
// const { isDark, toggle: toggleColorMode, initialize: initializeColorMode } = useColorMode()

// onMounted(initializeColorMode)

const navLinks = [
  { label: "Marketplace", href: "/marketplace" },
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
      <NuxtLink to="/marketplace" class="relative flex items-center shrink-0 text-heading-s text-white">
        <img src="/ipoc-logo.svg" alt="IPOC" class="object-contain">
      </NuxtLink>

      <div class="flex items-center gap-small">
        <template v-for="link in navLinks" :key="link.href">
          <span
            v-if="link.href === '#'"
            class="px-4 py-3 text-lg font-semibold uppercase text-white opacity-60 cursor-not-allowed"
            :title="`${link.label} — coming soon`"
          >
            {{ link.label }}
          </span>
          <NuxtLink
            v-else
            :to="link.href"
            class="px-4 py-3 text-lg font-semibold uppercase text-white transition-colors hover:text-brand-primary-20"
          >
            {{ link.label }}
          </NuxtLink>
        </template>
      </div>

      <div class="flex items-center gap-4">
        <!-- <button
          type="button"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          :aria-pressed="isDark"
          class="flex items-center justify-center rounded-full p-1 text-white transition-colors hover:text-brand-primary-20"
          @click="toggleColorMode"
        >
          <component :is="isDark ? Sun : Moon" class="size-6" />
        </button> -->


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

            <NuxtLink
              to="/profile"
              aria-label="Profile"
              class="size-14 rounded-full border border-[#156bb7] overflow-hidden shrink-0"
            >
              <img src="/person/avatar.jpg" alt="Profile" class="size-full object-cover">
            </NuxtLink>
          </div>
        </template>

        <template v-else>
          <UiButton
            variant="white"
            class="uppercase font-semibold rounded-full"
            @click="isConnected = true"
          >
            <UiSvgIcon src="/icons/wallet.svg" class="size-5" />
            Connect Wallet
          </UiButton>
        </template>
      </div>
    </UiContainer>
  </nav>
</template>
