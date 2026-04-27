<script setup lang="ts">
import { ArrowUp } from "lucide-vue-next";

type CardStatus = "fundraising" | "live-trading" | "failed";

interface Stat {
  label: string;
  value: string;
  highlight?: boolean;
}

const props = withDefaults(
  defineProps<{
    name: string;
    ticker: string;
    status: CardStatus;
    stats: Stat[];
    detailsHref?: string;
  }>(),
  {
    detailsHref: "/fundraising/1",
  },
);

const statusBadge = computed(() => {
  switch (props.status) {
    case "fundraising":
      return {
        label: "Fundraising",
        icon: "/icons/launch.svg",
        bg: "bg-[#008000]",
      };
    case "live-trading":
      return {
        label: "Live Trading",
        icon: "/icons/lin-cart.svg",
        bg: "bg-[#0080ff]",
      };
    case "failed":
      return {
        label: "Failed",
        icon: "/icons/alert.svg",
        bg: "bg-[#e60000]",
      };
  }
});
</script>

<template>
  <div class="relative flex min-w-[280px] gap-4 rounded-2xl bg-[#1a1a1a] py-4">
    <div
      :class="
        cn(
          'flex w-[34px] shrink-0 items-center justify-center self-stretch rounded-r-lg',
          statusBadge.bg,
        )
      ">
      <div class="-rotate-90 whitespace-nowrap">
        <div class="flex items-center gap-2 px-3 py-2 text-white">
          <UiSvgIcon :src="statusBadge.icon" class="size-4" />
          <span class="text-xs font-bold leading-[1.5]">{{
            statusBadge.label
          }}</span>
        </div>
      </div>
    </div>

    <div class="flex flex-1 flex-col items-start gap-4 py-2 pr-2">
      <p class="text-white">
        <span class="text-sm font-bold leading-[1.5]">{{ name }} </span>
        <span class="text-xs font-bold leading-[1.5]">({{ ticker }})</span>
      </p>

      <div class="flex flex-col items-start gap-1">
        <template v-for="(stat, i) in stats" :key="i">
          <div
            v-if="stat.highlight"
            class="relative inline-flex items-center rounded-3xl bg-[#00e600] px-2 shadow-[inset_0_4px_4px_0_rgba(0,0,0,0.12)]">
            <ArrowUp class="size-5 text-[#1a1a1a]" />
            <span class="text-sm font-bold leading-[1.5] text-[#1a1a1a]">
              {{ stat.label }}: {{ stat.value }}
            </span>
          </div>
          <p v-else class="text-sm leading-[1.5] text-white">
            {{ stat.label }}: {{ stat.value }}
          </p>
        </template>
      </div>

      <NuxtLink
        :to="detailsHref"
        class="relative inline-flex items-center justify-center rounded-full border border-[#156bb7] bg-clip-padding px-6 py-2 text-button font-semibold uppercase leading-[1.5] text-white [background-image:linear-gradient(179deg,rgba(208,217,226,0.12),rgba(255,255,255,0.12))] shadow-[inset_0_4px_8px_0_rgba(0,0,0,0.25)] transition-colors hover:bg-white/5">
        View details
      </NuxtLink>
    </div>
  </div>
</template>
