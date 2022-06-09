const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

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

    return {
      plugins: [
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, "dist"),
          routes: [
            "/",
            "/phe-search",
            "/phe-calculator",
            "/protein-calculator",
            "/own-food",
            "/phe-log",
            "/phe-diary",
            "/amino-counter",
            "/settings",
            "/help",
            "/other-apps",
            "/about",
            "/disclaimer",
            "/privacy-policy"
          ],
          renderer: new Renderer({
            injectProperty: "__PRERENDER_INJECTED",
            inject: {
              foo: "bar"
            }
          })
        })
      ]
    };
  },

  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass")
      }
    }
  }
};
