import Vue from "vue";
import Vuetify from "vuetify/lib";
import i18n from "./i18n";
import en from "vuetify/es5/locale/en";
import de from "vuetify/es5/locale/de";
import fr from "vuetify/es5/locale/fr";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#3498db"
      }
    }
  },
  lang: {
    locales: { en, de, fr },
    current: i18n.locale
  },
  icons: {
    iconfont: "mdiSvg"
  }
});
