import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { vuexfireMutations, firebaseAction } from "vuexfire";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    pheLog: [],
    aminoCounter: {},
    pheDiary: [],
    settings: {}
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    ...vuexfireMutations
  },
  actions: {
    signInGoogle({ commit }) {
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(result => {
          const newUser = {
            id: result.user.uid,
            name: result.user.displayName,
            email: result.user.email,
            photoUrl: result.user.photoURL
          };
          commit("setUser", newUser);
        })
        .then(() => {
          this.dispatch("initRef");
        })
        .catch(error => {
          console.log(error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL
      });
    },
    signOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setUser", null);
        })
        .catch(error => {
          console.log(error);
        });
    },
    initRef: firebaseAction(context => {
      context.bindFirebaseRef("pheLog", firebase.database().ref(context.state.user.id + "/pheLog"));
      context.bindFirebaseRef("aminoCounter", firebase.database().ref(context.state.user.id + "/aminoCounter"));
      context.bindFirebaseRef("pheDiary", firebase.database().ref(context.state.user.id + "/pheDiary"));
      context.bindFirebaseRef("settings", firebase.database().ref(context.state.user.id + "/settings"));
    })
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  modules: {}
});
