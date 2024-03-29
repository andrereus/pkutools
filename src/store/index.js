import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { vuexfireMutations, firebaseAction } from "vuexfire";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    pheLog: [],
    aminoCounter: [],
    pheDiary: [],
    ownFood: [],
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
        .signInWithPopup(new firebase.auth.GoogleAuthProvider().addScope("email"))
        .then(result => {
          const newUser = {
            id: result.user.uid,
            name: result.user.displayName,
            email: result.additionalUserInfo.profile.email,
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
    signInFacebook({ commit }) {
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.FacebookAuthProvider().addScope("email"))
        .then(result => {
          const newUser = {
            id: result.user.uid,
            name: result.user.displayName,
            email: result.additionalUserInfo.profile.email,
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
        email: payload.providerData[0].email,
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
      context.bindFirebaseRef("ownFood", firebase.database().ref(context.state.user.id + "/ownFood"));
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
