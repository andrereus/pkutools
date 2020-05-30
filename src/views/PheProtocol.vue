<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("phe-protocol.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-btn depressed disabled color="primary" @click="authenticate">Sign in with Google</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  methods: {
    authenticate: function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
      firebase
        .auth()
        .getRedirectResult()
        .then(function(result) {
          console.log(result);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
