module.exports = {
  transpileDependencies: ["vuetify"],

  pwa: {
    name: "PKU Tools",
    themeColor: "#f5f5f5",
    msTileColor: "#3498db"
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
