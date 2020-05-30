import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations } from "vuexfire";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    // other mutations
    ...vuexfireMutations
  },
  actions: {},
  modules: {}
});
