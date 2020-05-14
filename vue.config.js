module.exports = {
  transpileDependencies: ["vuetify"],

  pwa: {
    name: "PKU Tools",
    themeColor: "#343a40",
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
