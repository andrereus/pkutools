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
  }
};
