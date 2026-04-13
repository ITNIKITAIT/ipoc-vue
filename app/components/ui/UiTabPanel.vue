<script setup lang="ts">
defineProps<{
  tabs: string[]
  activeTab: string
}>()

const emit = defineEmits<{
  "update:activeTab": [tab: string]
}>()
</script>

<template>
  <div class="flex flex-col">
    <div class="flex gap-2 items-end">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="activeTab === tab
          ? 'flex-1 flex items-center justify-center px-4 py-2 text-sm text-white bg-black border-t border-l border-r border-black rounded-tl-lg rounded-tr-lg'
          : 'flex-1 flex items-center justify-center px-4 py-2 text-sm text-white rounded-lg hover:bg-white/5 transition-colors'"
        @click="emit('update:activeTab', tab)"
      >
        {{ tab }}
      </button>
    </div>
    <div class="bg-black border border-[#1a1a1a] rounded-bl-2xl rounded-br-2xl p-6">
      <slot />
    </div>
  </div>
</template>
