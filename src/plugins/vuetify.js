import Vue from "vue";
import Vuetify from "vuetify/lib";
import i18n from "./i18n";
import en from "vuetify/es5/locale/en";
import de from "vuetify/es5/locale/de";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { en, de },
    current: i18n.locale
  }
});
