<template>
  <div class="min-h-screen flex flex-col">
    <CommonNavbar />
    <div class="min-h-screen bg-[#021a34] relative flex-1">
      <div
        class="absolute top-0 left-0 w-full h-[800px] pointer-events-none overflow-hidden">
        <img
          src="/bg/bg.jpg"
          alt=""
          class="size-full object-cover object-top" />
        <div
          class="absolute inset-0 bg-gradient-to-b from-[#021a34]/20 via-[#021a34]/40 to-[#021a34]"></div>
      </div>
      <div
        class="relative max-w-[1020px] mx-auto px-6 py-20 flex flex-col gap-6">
        <slot />
      </div>
    </div>
  </div>
</template>
