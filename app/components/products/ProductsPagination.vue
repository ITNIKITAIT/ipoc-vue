<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "lucide-vue-next"

const props = withDefaults(
  defineProps<{
    currentPage?: number
    totalPages?: number
  }>(),
  {
    currentPage: 1,
    totalPages: 10,
  },
)

const emit = defineEmits<{
  pageChange: [page: number]
}>()

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | "...")[] = [1, 2]

  if (current > 4) pages.push("...")

  for (let i = current - 1; i <= current + 1; i++) {
    if (i > 2 && i < total - 1) pages.push(i)
  }

  if (current < total - 3) pages.push("...")

  pages.push(total - 1, total)

  const seen = new Set<number | "...">()
  return pages.filter((p) => {
    if (p === "...") return true
    if (seen.has(p)) return false
    seen.add(p)
    return true
  })
}

const pages = computed(() => getPageNumbers(props.currentPage, props.totalPages))
</script>

<template>
  <div class="flex w-full items-center justify-between py-inner">
    <button
      :disabled="currentPage === 1"
      class="flex items-center gap-2 rounded-full border border-text-00/30 px-5 py-2.5 text-body-m text-text-00 transition-colors hover:bg-white/10 disabled:opacity-40"
      @click="emit('pageChange', currentPage - 1)"
    >
      <ChevronLeft class="size-4" />
      Prev
    </button>

    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <template v-for="(page, i) in pages" :key="`page-${i}`">
          <span v-if="page === '...'" class="px-1 text-body-m text-text-00">...</span>
          <button
            v-else
            :class="[
              'flex size-9 items-center justify-center text-body-m text-text-00 transition-colors hover:bg-white/10',
              page === currentPage ? 'border border-text-00' : '',
            ]"
            @click="emit('pageChange', page)"
          >
            {{ page }}
          </button>
        </template>
      </div>

      <div class="h-5 w-px bg-text-00/40" />

      <span class="text-body-m text-text-00">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
    </div>

    <button
      :disabled="currentPage === totalPages"
      class="flex items-center gap-2 rounded-full border border-text-00/30 px-5 py-2.5 text-body-m text-text-00 transition-colors hover:bg-white/10 disabled:opacity-40"
      @click="emit('pageChange', currentPage + 1)"
    >
      Next
      <ChevronRight class="size-4" />
    </button>
  </div>
</template>
