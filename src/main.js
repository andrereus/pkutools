import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import i18n from "./plugins/i18n";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives
});

Vue.use(vuetify);

Vue.config.productionTip = false;

const root = new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
});

document.addEventListener("DOMContentLoaded", function () {
  root.$mount("#app");
});
