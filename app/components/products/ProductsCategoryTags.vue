<script setup lang="ts">
const active = ref("ALL");

const categories = [
  "ALL",
  "AI",
  "DeFi",
  "Gaming",
  "NFT",
  "RWA",
  "Infrastructure",
  "Social/DAO",
  "Other / All (default)",
];
</script>

<template>
  <div class="flex w-full items-center gap-x-10 gap-y-2">
    <UiButton
      v-for="category in categories"
      :key="category"
      type="button"
      :variant="active === category ? 'secondary' : 'ghost'"
      :class="
        cn(
          'shrink-0 rounded-full px-small py-1 text-heading-s text-text-00 transition-all whitespace-nowrap font-normal',
          active === category
            ? 'bg-neutral-10/[0.36] shadow-[inset_1px_1px_3px_0px_rgba(0,0,0,0.25)]'
            : 'hover:bg-white/10',
        )
      "
      @click="active = category">
      {{ category }}
    </UiButton>
  </div>
</template>
