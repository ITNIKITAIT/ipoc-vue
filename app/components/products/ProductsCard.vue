<script setup lang="ts">
import type {
  ProjectStatus,
  ProjectData,
  ProjectDetail,
  FundraisingData,
  LiveTradingData,
  FailedData,
} from "~/types/products";

const props = defineProps<{
  name: string;
  ticker: string;
  description: string;
  image: string;
  status: ProjectStatus;
  trustScore: number;
  category: string;
  data: ProjectData;
}>();

function getDetailRows(details: ProjectDetail[]): ProjectDetail[][] {
  const rows: ProjectDetail[][] = [];
  for (let i = 0; i < details.length; i += 2) {
    rows.push(details.slice(i, i + 2));
  }
  return rows;
}

const detailsLink = computed(() => {
  const slug = props.ticker.replace(/^\$/, "").toLowerCase();
  const base = props.status === "live-trading" ? "/live-trade" : "/fundraising";
  return `${base}/${slug}`;
});
</script>

<template>
  <div
    class="flex w-full h-fit flex-col gap-small rounded-b-lg border-[0.15px] border-[#C0C0C0]/30 bg-oxford-blue px-4 pt-0 pb-6 shadow-[2px_4px_8px_0px_rgba(0,0,0,0.16)]">
    <div class="flex items-start justify-center gap-tiny">
      <ProductsStatusBadge :status="status" />
      <ProductsTrustScoreBadge :score="trustScore" :status="status" />
      <ProductsCategoryBadge :category="category" />
    </div>

    <div class="flex flex-col gap-tiny">
      <div class="flex flex-col">
        <h3
          class="text-body-l font-semibold uppercase tracking-[0.5px] text-text-00">
          {{ name }} ({{ ticker }})
        </h3>
        <p class="text-body-m font-medium text-text-00">{{ description }}</p>
      </div>

      <div class="relative h-[150px] w-full overflow-hidden">
        <img :src="image" :alt="name" class="size-full object-cover" />
      </div>

      <!-- Fundraising details -->
      <template v-if="data.type === 'fundraising'">
        <UiProgressBar
          label="Fundraising progress"
          :percentage="(data as FundraisingData).progress"
          :description="`${(data as FundraisingData).funded} funded | ${(data as FundraisingData).raised} raised of ${(data as FundraisingData).target}`"
          color="fundraising" />
        <div
          v-for="(row, idx) in getDetailRows((data as FundraisingData).details)"
          :key="idx"
          class="flex items-start justify-between">
          <div
            v-for="detail in row"
            :key="detail.label"
            class="flex flex-1 flex-col">
            <span class="text-body-s text-text-70">{{ detail.label }}</span>
            <span
              :class="
                detail.highlight
                  ? 'text-body-m text-semantic-success'
                  : 'text-body-m text-text-00'
              ">
              {{ detail.value }}
            </span>
          </div>
        </div>
      </template>

      <!-- Live trading details -->
      <template v-if="data.type === 'live-trading'">
        <UiProgressBar
          label="Milestones Progress"
          :percentage="(data as LiveTradingData).milestoneProgress"
          :description="`${(data as LiveTradingData).milestonesCompleted} of ${(data as LiveTradingData).milestonesTotal} milestones completed`"
          color="milestone" />
        <div
          v-for="(row, idx) in getDetailRows((data as LiveTradingData).details)"
          :key="idx"
          class="flex items-start justify-between">
          <div
            v-for="detail in row"
            :key="detail.label"
            class="flex flex-1 flex-col">
            <span class="text-body-s text-text-70">{{ detail.label }}</span>
            <span
              :class="
                detail.highlight
                  ? 'text-body-m text-semantic-success'
                  : 'text-body-m text-text-00'
              ">
              {{ detail.value }}
            </span>
          </div>
        </div>
      </template>

      <!-- Failed details -->
      <template v-if="data.type === 'failed'">
        <p class="text-body-m font-bold text-text-00">
          {{ (data as FailedData).message }}
        </p>
        <div
          v-for="(row, idx) in getDetailRows((data as FailedData).details)"
          :key="idx"
          class="flex items-start justify-between">
          <div
            v-for="detail in row"
            :key="detail.label"
            class="flex flex-1 flex-col">
            <span class="text-body-s text-text-70">{{ detail.label }}</span>
            <span
              :class="
                detail.highlight
                  ? 'text-body-m text-semantic-success'
                  : 'text-body-m text-text-00'
              ">
              {{ detail.value }}
            </span>
          </div>
        </div>
      </template>
    </div>

    <NuxtLink :to="detailsLink" class="w-full">
      <UiButton variant="glass" class="w-full rounded-full uppercase">
        View Details
      </UiButton>
    </NuxtLink>
  </div>
</template>
