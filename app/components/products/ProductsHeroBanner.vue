<template>
  <section
    class="relative flex w-full flex-col gap-5 items-center rounded-lg border border-neutral-90 pt-[72px] pb-10"
    :style="{
      backgroundImage: `url('/bg/hero-bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <div
      class="pointer-events-none absolute inset-0 rounded-lg"
      :style="{
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(15, 56, 100, 0.6) 0%, transparent 70%)',
      }"
    />

    <h1 class="text-heading-m relative z-10 text-center text-neutral-30 max-w-[1000px]">
      Build and invest in transparent,<br>
      milestone-driven startups.
    </h1>

    <p class="relative z-10 text-center text-body-l text-neutral-30">
      <NuxtLink to="#" class="text-brand-secondary-70 underline decoration-solid">
        Connect your wallet
      </NuxtLink>
      to start investing and tracking projects.
    </p>

    <div class="relative z-10 flex items-center gap-6">
      <UiButton as="NuxtLink" variant="outline" class="w-[220px]" to="/create-project">
        Start Building
      </UiButton>
      <UiButton as="NuxtLink" variant="white" class="w-[220px]" to="/products">
        Explore Projects
      </UiButton>
    </div>

    <div class="relative z-10 flex items-end justify-center gap-small py-10">
      <div
        v-for="i in 5"
        :key="i"
        :class="['size-2 rounded-full', i === 1 ? 'bg-brand-primary-30' : 'bg-neutral-70']"
      />
    </div>
  </section>
</template>
