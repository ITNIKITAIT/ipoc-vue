<script setup lang="ts">
import { resolveComponent } from "vue"
import { NuxtLink } from "#components"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "group/button cursor-pointer inline-flex px-6 py-3 gap-2 font-semibold shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-base whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "bg-transparent border border-neutral-30 text-neutral-30 hover:bg-neutral-70 hover:text-neutral-00",
        secondary: "bg-[#F2F2F25C]",
        ghost: "bg-transparent border border-transparent",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        white: "bg-white text-dark-blue hover:bg-white/80",
        grey: "text-text-00 [background-image:linear-gradient(90deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.2)_100%),linear-gradient(90deg,rgba(242,242,242,0.36)_0%,rgba(242,242,242,0.36)_100%)] shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)]",
        glass:
          "border-white/30 text-text-00 [background-image:linear-gradient(179deg,rgba(208,217,226,0.12),rgba(255,255,255,0.12))] shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] hover:bg-white/10",
      },
      size: {
        default: "px-6 py-3 text-base",
        xs: "",
        sm: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type ButtonVariants = VariantProps<typeof buttonVariants>

const props = withDefaults(
  defineProps<{
    variant?: NonNullable<ButtonVariants["variant"]>
    size?: NonNullable<ButtonVariants["size"]>
    as?: string | object
    class?: string
  }>(),
  {
    variant: "default",
    size: "default",
    as: "button",
  },
)

const HTML_TAG = /^[a-z]/
const resolvedAs = computed(() => {
  if (typeof props.as !== "string") return props.as
  if (HTML_TAG.test(props.as)) return props.as
  if (props.as === "NuxtLink") return NuxtLink
  return resolveComponent(props.as)
})
</script>

<template>
  <component
    :is="resolvedAs"
    :data-slot="'button'"
    :data-variant="props.variant"
    :data-size="props.size"
    :class="cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)"
  >
    <slot />
  </component>
</template>
