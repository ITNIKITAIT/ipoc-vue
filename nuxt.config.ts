import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "IPOC",
      titleTemplate: "IPOC",
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/ipoc-logo.svg" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Roboto:wght@400;700&display=swap",
        },
      ],
      htmlAttrs: { lang: "en" },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});