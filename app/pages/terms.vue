<script setup lang="ts">
useHead({ title: "Terms & Conditions - IPOC" })

const lastUpdated = "April 21, 2026"

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using the IPOC platform, you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree, you may not use the platform.",
  },
  {
    title: "2. Eligibility",
    body: "You must be at least 18 years old and legally permitted to participate in digital asset transactions in your jurisdiction. You are responsible for ensuring your use of IPOC complies with all applicable laws.",
  },
  {
    title: "3. Accounts & Wallets",
    body: "IPOC is a non-custodial platform. You are solely responsible for the security of your wallet, private keys, and any credentials used to access the platform. We cannot recover lost keys or reverse transactions.",
  },
  {
    title: "4. Platform Usage",
    body: "IPOC provides tools for creators to launch tokenized projects and for investors to fund, trade, and track them. IPOC does not provide investment, financial, legal, or tax advice. All decisions are made at your own risk.",
  },
  {
    title: "5. Creator Obligations",
    body: "Project creators are responsible for the accuracy of all information provided, for delivering on stated milestones, and for complying with applicable securities, consumer protection, and tax regulations.",
  },
  {
    title: "6. Risk Disclosure",
    body: "Digital asset markets are volatile. Tokens listed on IPOC may lose all value. Past performance is not indicative of future results. You should only commit funds you can afford to lose entirely.",
  },
  {
    title: "7. Prohibited Conduct",
    body: "You agree not to use IPOC for fraud, market manipulation, money laundering, sanctions evasion, or any unlawful activity. We may suspend or terminate access for any violation.",
  },
  {
    title: "8. Intellectual Property",
    body: "All IPOC branding, interface, code, and content are owned by IPOC or its licensors. You may not copy, modify, or redistribute any part of the platform without written permission.",
  },
  {
    title: "9. Limitation of Liability",
    body: "To the maximum extent permitted by law, IPOC and its affiliates are not liable for indirect, incidental, or consequential damages, including lost profits or lost data, arising from your use of the platform.",
  },
  {
    title: "10. Changes to These Terms",
    body: "We may update these Terms from time to time. Continued use of the platform after changes are posted constitutes acceptance of the updated Terms.",
  },
  {
    title: "11. Contact",
    body: "For questions about these Terms, contact us at legal@ipoc.example.",
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
          Terms &amp; Conditions
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
