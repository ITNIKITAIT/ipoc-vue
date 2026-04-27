<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { ArrowLeft, ArrowRight, Copy } from "lucide-vue-next";
import {
  profileSettingsSchema,
  type ProfileSettingsFormValues,
} from "~/schemas/profile-settings";

definePageMeta({ layout: "default" });
useHead({ title: "Settings - IPOC" });

const wallet = "0x738E...13b0";

const {
  handleSubmit,
  errors: rawErrors,
  values,
  defineField,
  submitCount,
} = useForm<ProfileSettingsFormValues>({
  validationSchema: toTypedSchema(profileSettingsSchema),
  initialValues: {
    displayName: "",
    bio: "",
    xHandle: "",
    website: "",
    github: "",
    showActivityPublicly: true,
    milestoneAlerts: [false, false, false, false],
    fundraiseAlerts: [false, false, false],
    accountAlerts: [false, false],
  },
});

const submitted = computed(() => submitCount.value > 0);
const errors = computed(() => (submitted.value ? rawErrors.value : {}));

const [displayName, displayNameAttrs] = defineField("displayName");
const [bio, bioAttrs] = defineField("bio");
const [xHandle, xHandleAttrs] = defineField("xHandle");
const [website, websiteAttrs] = defineField("website");
const [github, githubAttrs] = defineField("github");
const [showActivityPublicly] = defineField("showActivityPublicly");
const [milestoneAlerts] = defineField("milestoneAlerts");
const [fundraiseAlerts] = defineField("fundraiseAlerts");
const [accountAlerts] = defineField("accountAlerts");

const onSubmit = handleSubmit(() => {
  navigateTo("/profile");
});

function copyWallet() {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(wallet).catch(() => {});
  }
}
</script>

<template>
  <div
    class="flex min-h-screen w-full flex-col"
    :style="{
      backgroundImage: 'linear-gradient(180deg, #002147 0%, #000000 100%)',
    }">
    <form
      class="mx-auto flex w-full max-w-[572px] flex-1 flex-col gap-8 px-4 py-12"
      @submit.prevent="onSubmit">
      <h1
        class="font-heading text-[32px] font-semibold leading-[1.28] tracking-[-0.5px] text-white">
        Settings
      </h1>

      <!-- Account Details -->
      <section class="flex flex-col gap-2">
        <p class="text-button uppercase tracking-[0.5px] text-white">
          Account Details:
        </p>
        <div class="flex items-center justify-between gap-4">
          <div class="flex flex-col gap-2">
            <p class="text-base leading-[1.7] tracking-[-0.08px] text-white">
              Connected Wallet:
            </p>
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2 text-white">
                <UiSvgIcon src="/icons/wallet.svg" class="size-6 text-white" />
                <span class="font-roboto text-lg font-medium">{{
                  wallet
                }}</span>
              </div>
              <button
                type="button"
                aria-label="Copy wallet address"
                class="text-white/80 transition-colors hover:text-white"
                @click="copyWallet">
                <Copy class="size-5" />
              </button>
            </div>
          </div>
          <button
            type="button"
            class="rounded bg-[#b3b3b3] px-6 py-2 text-base text-black transition-colors hover:bg-[#c4c4c4]">
            Disconnect Wallet
          </button>
        </div>
        <div class="flex items-center gap-7 text-sm text-white">
          <p>Network: BNB Smart Chain</p>
          <p>Token Standard: BEP-20</p>
        </div>
      </section>

      <!-- Display Name -->
      <div class="flex flex-col gap-2">
        <label class="text-base leading-[1.7] tracking-[-0.08px] text-white">
          Display Name
        </label>
        <UiInput
          v-model="displayName"
          v-bind="displayNameAttrs"
          placeholder="Display Name"
          :aria-invalid="!!errors.displayName" />
        <p v-if="errors.displayName" class="text-right text-xs text-red-400">
          {{ errors.displayName }}
        </p>
      </div>

      <!-- Bio -->
      <div class="flex flex-col gap-2">
        <label class="text-base leading-[1.7] tracking-[-0.08px] text-white">
          Bio
        </label>
        <UiTextarea
          v-model="bio"
          v-bind="bioAttrs"
          maxlength="250"
          rows="6"
          placeholder="Tell us about yourself"
          :aria-invalid="!!errors.bio" />
        <p
          class="text-right text-xs text-white"
          :class="errors.bio ? 'text-red-400' : ''">
          {{ errors.bio || `${(bio ?? "").length} / 250` }}
        </p>
      </div>

      <!-- Social inputs -->
      <div class="flex flex-col gap-4">
        <div class="relative flex items-center">
          <img
            src="/icons/X.svg"
            alt="X"
            class="shrink-0 absolute left-4"
            width="24"
            height="24" />
          <UiInput
            v-model="xHandle"
            v-bind="xHandleAttrs"
            placeholder="X Handle (optional)"
            class="pl-12" />
        </div>
        <div class="relative flex items-center">
          <UiSvgIcon
            src="/icons/website.svg"
            class="absolute left-4 size-6 text-white" />
          <UiInput
            v-model="website"
            v-bind="websiteAttrs"
            placeholder="Website (optional)"
            class="pl-12"
            :aria-invalid="!!errors.website" />
        </div>
        <p v-if="errors.website" class="-mt-2 text-right text-xs text-red-400">
          {{ errors.website }}
        </p>
        <div class="relative flex items-center">
          <UiSvgIcon
            src="/icons/github.svg"
            class="absolute left-4 size-6 text-white" />
          <UiInput
            v-model="github"
            v-bind="githubAttrs"
            placeholder="GitHub (optional)"
            class="pl-12" />
        </div>
      </div>

      <!-- Profile Image -->
      <section class="flex flex-col gap-4">
        <p class="text-button uppercase tracking-[0.5px] text-white">
          Profile image
        </p>
        <div
          class="flex items-center justify-center rounded-3xl bg-[#1a1a1a] px-6 py-4">
          <div class="flex w-full items-center justify-between gap-4">
            <img
              src="/person/avatar.jpg"
              alt="Profile avatar"
              class="size-[77px] rounded-md object-cover" />
            <div class="flex flex-col items-end justify-center gap-2">
              <button
                type="button"
                class="rounded-lg bg-white px-6 py-3 text-base text-black transition-colors hover:bg-white/90">
                Edit image
              </button>
              <p class="text-sm text-white/60">Appears on your project card</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Privacy Settings -->
      <section class="flex flex-col gap-4">
        <p class="text-button uppercase tracking-[0.5px] text-white">
          Privacy Settings:
        </p>
        <div
          class="flex items-center justify-between gap-4 rounded-2xl bg-[#1a1a1a] p-6">
          <p class="flex-1 text-xl text-white">
            Show my investment activity publicly
          </p>
          <button
            type="button"
            role="switch"
            :aria-checked="showActivityPublicly"
            class="relative h-7 w-16 shrink-0 rounded-full border transition-colors"
            :class="
              showActivityPublicly
                ? 'border-semantic-success bg-[#9cf]'
                : 'border-[#555] bg-[#333]'
            "
            @click="showActivityPublicly = !showActivityPublicly">
            <span
              class="absolute top-1/2 size-[22px] -translate-y-1/2 rounded-full bg-white transition-all"
              :class="showActivityPublicly ? 'right-1' : 'left-1'" />
          </button>
        </div>
      </section>

      <!-- Notifications -->
      <section class="flex flex-col gap-4">
        <p class="text-button uppercase tracking-[0.5px] text-white">
          Notifications
        </p>
        <ProfileSettingsNotificationGroup
          v-model="milestoneAlerts"
          title="Milestone Alerts:"
          icon="/icons/target.svg"
          :options="[
            'Milestone vote starting soon (48h)',
            'Milestone vote ending soon (24h)',
            'Tokens available to claim',
            'Milestone approved/rejected',
          ]" />
        <ProfileSettingsNotificationGroup
          v-model="fundraiseAlerts"
          title="Fundraise Alerts:"
          icon="/icons/investor.svg"
          :options="[
            'Fundraise reached 100% — trading live',
            'Raise deadline approaching (72h, 24h)',
            'Raise failed — funds available',
          ]" />
        <ProfileSettingsNotificationGroup
          v-model="accountAlerts"
          title="Account Alerts:"
          icon="/icons/fix.svg"
          :options="[
            'Rewards available (Critical)',
            'System updates (Critical)',
          ]" />
      </section>

      <!-- Action bar -->
      <div class="flex items-end justify-between pb-[72px] pt-4">
        <button
          type="button"
          class="relative flex items-center gap-2 overflow-hidden rounded-full border border-[#156bb7] px-6 py-3 text-[18px] font-semibold uppercase text-white shadow-[inset_0px_8px_12px_-4px_rgba(0,0,0,0.5)] transition-opacity hover:opacity-80"
          style="
            background: linear-gradient(
              0deg,
              #21384f 0%,
              #21384f 50%,
              #21384f 100%
            );
          "
          @click="navigateTo('/profile')">
          <ArrowLeft :size="24" />
          Back
        </button>
        <div class="mt-10 flex items-center gap-4">
          <button
            type="button"
            class="relative flex items-center gap-2 overflow-hidden rounded-full border border-[#156bb7] px-6 py-3 text-[18px] font-semibold uppercase text-white shadow-[inset_0px_8px_12px_-4px_rgba(0,0,0,0.5)] transition-opacity hover:opacity-80"
            style="
              background: linear-gradient(
                0deg,
                #21384f 0%,
                #21384f 50%,
                #21384f 100%
              );
            ">
            <UiSvgIcon src="/icons/save.svg" class="relative size-6" />
            <span class="relative">Save</span>
          </button>
          <button
            type="submit"
            class="relative flex items-center gap-2 overflow-hidden rounded-full border border-[#156bb7] bg-white px-6 py-3 text-[18px] font-semibold uppercase text-black shadow-[inset_0px_4px_8px_0px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-80">
            Submit
            <ArrowRight :size="24" />
          </button>
        </div>
      </div>
    </form>

    <CommonFooter />
  </div>
</template>
