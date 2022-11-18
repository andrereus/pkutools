const { VuetifyPlugin } = require("webpack-plugin-vuetify");

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set("vue", "@vue/compat");

    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        };
      });
  },

  transpileDependencies: ["vuetify"],
  productionSourceMap: false,

  pwa: {
    name: "PKU Tools",
    themeColor: "#3498db",
    msTileColor: "#3498db",
    manifestOptions: {
      description: "Tools and apps for PKU."
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

  configureWebpack: {
    plugins: [new VuetifyPlugin()]
  },

  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass")
      }
    }
  }
};
