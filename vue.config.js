const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");

module.exports = {
  transpileDependencies: ["vuetify"],

  pwa: {
    name: "PKU Tools",
    themeColor: "#f5f5f5",
    msTileColor: "#3498db",
    manifestOptions: {
      description: "Free tools and apps for people with PKU."
    }
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    }
  },

  configureWebpack: () => {
    if (process.env.NODE_ENV !== "production") return;

    return {
      plugins: [
        new PrerenderSPAPlugin(path.join(__dirname, "dist"), [
          "/",
          "/phe-search",
          "/phe-calculator",
          "/protein-calculator",
          "/own-food",
          "/phe-log",
          "/phe-diary",
          "/amino-counter",
          "/help",
          "/other-apps",
          "/about",
          "/disclaimer",
          "/privacy-policy"
        ])
      ]
    };
  }
};
