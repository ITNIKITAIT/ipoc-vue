<script setup lang="ts">
interface NavItem {
  label: string
  href: string
  icon: string
  badge?: number
}

defineProps<{
  navItems: NavItem[]
}>()

const route = useRoute()

const dashboardRoots = ["/dashboard", "/dashboard/investor"]

function isActive(href: string) {
  if (dashboardRoots.includes(href)) return route.path === href
  return route.path.startsWith(href)
}
</script>

<template>
  <aside class="flex w-[278px] shrink-0 flex-col gap-5 px-4 pb-6">
    <div class="flex flex-col gap-4 border-b border-[#333] pb-4">
      <div class="flex items-center gap-[23px]">
        <div class="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-[#333] bg-[#1a1a1a] p-3">
          <UiSvgIcon src="/icons/wallet.svg" class="size-6 text-white" />
        </div>
        <div class="flex flex-col">
          <p class="text-2xl font-semibold leading-[1.28] tracking-tight text-white">Alex</p>
          <p class="text-sm leading-[1.5] text-[#666]">0x8xSk...Lnw3x</p>
        </div>
      </div>

      <div class="flex items-start text-sm leading-[1.5]">
        <div class="flex flex-1 flex-col gap-4">
          <span class="text-[#666]">Projects backed</span>
          <span class="text-[#666]">Unclaimed tokens</span>
        </div>
        <div class="ml-5 flex min-w-[72px] flex-col gap-4 pl-4 text-left">
          <span class="text-[#b3b3b3]">5</span>
          <span class="text-brand-secondary-50">$450</span>
        </div>
      </div>
    </div>

    <nav class="flex flex-col gap-2">
      <NuxtLink
        v-for="item in navItems"
        :key="item.href"
        :to="item.href"
        :class="cn(
          'flex h-12 items-center justify-between px-4 py-2 text-xl font-medium leading-[1.5] text-white transition-colors',
          isActive(item.href)
            ? 'border-l-[3px] border-brand-secondary-50 bg-[rgba(17,82,85,0.8)]'
            : 'border-l-[3px] border-transparent hover:bg-white/5',
        )"
      >
        <div class="flex items-center gap-3">
          <UiSvgIcon :src="item.icon" class="size-6 text-white" />
          <span>{{ item.label }}</span>
        </div>
        <span
          v-if="item.badge"
          class="flex h-7 min-w-[22px] items-center justify-center rounded-full bg-[rgba(255,153,0,0.68)] px-1.5 text-xs leading-none text-[#002147]"
        >
          {{ item.badge }}
        </span>
      </NuxtLink>
    </nav>
  </aside>
</template>
