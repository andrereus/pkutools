import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";

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
