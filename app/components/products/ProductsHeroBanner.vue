<template>
  <section
    class="relative flex w-full flex-col gap-5 items-center rounded-lg border border-neutral-90 pt-[72px] pb-10"
    :style="{
      backgroundImage: `url('/bg/hero-bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }">
    <div
      class="pointer-events-none absolute inset-0 rounded-lg"
      :style="{
        backgroundImage:
          'radial-gradient(ellipse at 50% 0%, rgba(15, 56, 100, 0.6) 0%, transparent 70%)',
      }" />

    <h1
      class="text-heading-m !font-roboto font-bold relative z-10 text-center text-white max-w-[1000px]">
      Build and invest in transparent,<br />
      milestone-driven startups.
    </h1>

    <p class="relative z-10 text-center !font-roboto text-[18px] text-white">
      <NuxtLink to="#" class="text-[#1a7c7f] underline decoration-solid">
        Connect your wallet
      </NuxtLink>
      to start investing and tracking projects.
    </p>

    <div class="relative z-10 flex items-center gap-6">
      <UiButton
        as="NuxtLink"
        variant="outline"
        class="!font-roboto font-bold w-[204px] text-center justify-center rounded-lg border-white text-white"
        to="/create-project">
        Start Building
      </UiButton>
      <UiButton
        as="NuxtLink"
        variant="white"
        class="!font-roboto font-bold w-[204px] text-center justify-center rounded-lg border-[#002147] text-[#002147]"
        to="/marketplace">
        Explore Projects
      </UiButton>
    </div>

    <div class="relative z-10 flex items-end justify-center gap-4 py-10">
      <div
        v-for="i in 5"
        :key="i"
        :class="[
          'size-2 rounded-full',
          i === 1 ? 'bg-[#1a7c7f]' : 'bg-neutral-70',
        ]" />
    </div>
  </section>
</template>
