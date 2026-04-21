<script setup lang="ts">
useHead({ title: "Privacy Policy - IPOC" })

const lastUpdated = "April 21, 2026"

const sections = [
  {
    title: "1. Overview",
    body: "This Privacy Policy describes how IPOC collects, uses, and shares information when you use our platform. By using IPOC, you consent to the practices described here.",
  },
  {
    title: "2. Information We Collect",
    body: "We collect information you provide directly (such as wallet addresses, profile details, and project submissions), information generated through your use of the platform (such as transaction records and session logs), and limited technical data from your device (such as browser type and IP address).",
  },
  {
    title: "3. How We Use Information",
    body: "We use collected information to operate and improve the platform, authenticate users, prevent fraud and abuse, communicate important updates, and comply with legal obligations.",
  },
  {
    title: "4. On-Chain Data",
    body: "Transactions executed through IPOC are recorded on public blockchains. Blockchain data is by nature public, permanent, and outside of our control. Do not share sensitive personal data in on-chain transactions.",
  },
  {
    title: "5. Cookies & Analytics",
    body: "We use cookies and similar technologies to remember preferences, maintain sessions, and measure platform usage. You can control cookies through your browser settings, though some features may not work without them.",
  },
  {
    title: "6. Sharing of Information",
    body: "We do not sell personal data. We may share information with service providers who help us operate the platform, with law enforcement when required by law, and with successors in the event of a merger or acquisition.",
  },
  {
    title: "7. Data Retention",
    body: "We retain personal data only as long as necessary to provide the service, comply with legal obligations, resolve disputes, and enforce our agreements.",
  },
  {
    title: "8. Security",
    body: "We implement reasonable technical and organizational measures to protect your information. However, no system is completely secure, and we cannot guarantee absolute security of data transmitted over the internet.",
  },
  {
    title: "9. Your Rights",
    body: "Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict processing of your personal data. Contact us to exercise these rights.",
  },
  {
    title: "10. International Transfers",
    body: "Your information may be processed in countries other than where you reside. We take steps to ensure appropriate safeguards are in place when transferring data across borders.",
  },
  {
    title: "11. Children's Privacy",
    body: "IPOC is not intended for individuals under 18. We do not knowingly collect personal data from children.",
  },
  {
    title: "12. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Material changes will be communicated through the platform or by other reasonable means.",
  },
  {
    title: "13. Contact",
    body: "For questions about this Privacy Policy or to exercise your rights, contact us at privacy@ipoc.example.",
  },
]
</script>

<template>
  <div
    class="flex min-h-screen flex-col gap-10 pt-12"
    :style="{
      backgroundImage:
        'linear-gradient(67deg, rgb(0, 33, 71) 21%, rgb(0, 0, 0) 100%)',
    }"
  >
    <UiContainer class="flex-1 text-text-00">
      <header class="flex flex-col gap-2">
        <h1 class="text-heading-l">
          Privacy Policy
        </h1>
        <p class="text-body-s opacity-70">
          Last updated: {{ lastUpdated }}
        </p>
      </header>

      <div class="flex flex-col gap-8">
        <section
          v-for="section in sections"
          :key="section.title"
          class="flex flex-col gap-2"
        >
          <h2 class="text-heading-s">
            {{ section.title }}
          </h2>
          <p class="text-body-l opacity-90">
            {{ section.body }}
          </p>
        </section>
      </div>
    </UiContainer>
    <CommonFooter />
  </div>
</template>
