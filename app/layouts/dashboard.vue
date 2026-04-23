<script setup lang="ts">
const route = useRoute()

const creatorNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: "/icons/Dashboard.svg" },
  { label: "Projects", href: "/dashboard/projects", icon: "/icons/projects.svg", badge: 2 },
]

const investorNavItems = [
  { label: "Dashboard", href: "/dashboard/investor", icon: "/icons/Dashboard.svg" },
  { label: "Projects", href: "/dashboard/investor/projects", icon: "/icons/projects.svg", badge: 3 },
  { label: "Votes", href: "/dashboard/investor/votes", icon: "/votes.svg", badge: 2 },
]

const navItems = computed(() =>
  route.path.startsWith("/dashboard/investor") ? investorNavItems : creatorNavItems
)
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <CommonNavbar />
    <div class="flex min-h-[calc(100vh-88px)] bg-gradient-to-b from-[#002147] to-black pb-20">
      <div class="mx-auto mt-15 flex w-full max-w-[1280px] flex-row gap-6 px-4">
        <DashboardSidebar :nav-items="navItems" />
        <main class="min-w-0 flex-1 overflow-y-auto">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
