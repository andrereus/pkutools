import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { vuexfireMutations, firestoreAction } from "vuexfire";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    userData: {}
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
    bindRef: firestoreAction((context, userId) => {
      context.bindFirestoreRef(
        "userData",
        firebase
          .firestore()
          .collection("userData")
          .doc(userId)
      );
    })
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  modules: {}
});
