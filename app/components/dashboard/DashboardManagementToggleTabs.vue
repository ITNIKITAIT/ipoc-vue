<script setup lang="ts">
defineProps<{
  activeTab: string
}>()

const emit = defineEmits<{
  "update:activeTab": [value: string]
}>()
</script>

<template>
  <div class="flex items-center gap-4">
    <button
      :class="cn(
        'flex items-center gap-2 px-4 py-[9px] text-xl font-medium leading-[1.5] transition-colors',
        activeTab === 'fundraising'
          ? 'border-b-2 border-brand-secondary-50 text-brand-secondary-50'
          : 'text-[#666] hover:text-white',
      )"
      @click="emit('update:activeTab', 'fundraising')"
    >
      <UiSvgIcon
        src="/icons/launch.svg"
        :class="cn('size-6', activeTab === 'fundraising' ? 'text-brand-secondary-50' : 'text-[#666]')"
      />
      Fundraising
    </button>
    <button
      :class="cn(
        'flex items-center gap-2 px-4 py-[9px] text-xl font-medium leading-[1.5] transition-colors',
        activeTab === 'post-raise'
          ? 'border-b-2 border-[#0080ff] text-[#0080ff]'
          : 'text-[#666] hover:text-white',
      )"
      @click="emit('update:activeTab', 'post-raise')"
    >
      <UiSvgIcon
        src="/icons/lin-cart.svg"
        :class="cn('size-6', activeTab === 'post-raise' ? 'text-[#0080ff]' : 'text-[#666]')"
      />
      Post-raise
    </button>
  </div>
</template>
