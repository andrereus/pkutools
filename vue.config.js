module.exports = {
  transpileDependencies: ["vuetify"],
  productionSourceMap: false,

  pwa: {
    name: "PKU Tools",
    themeColor: "#3498db",
    msTileColor: "#3498db",
    manifestOptions: {
      description: "Free tools and apps for PKU."
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
  },

  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass")
      }
    }
  }
};
