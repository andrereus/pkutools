<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("amino-counter.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <p>{{ $t("amino-counter.description") }}</p>

        <v-btn depressed v-if="!userIsAuthenticated" @click="signInGoogle" class="mt-2">
          {{ $t("app.signin-google") }}
        </v-btn>

        <div v-if="userIsAuthenticated">
          <v-progress-linear
            :value="(aminoCounter.count * 100) / aminoCounter.max"
            height="40"
            class="white--text my-6"
            rounded
          >
            {{ aminoCounter.count }} {{ $t("amino-counter.progress") }}
          </v-progress-linear>

          <p>{{ $t("amino-counter.date") }}: {{ new Date(aminoCounter.date).toLocaleString() }}</p>

          <v-btn depressed @click="takeAM" color="primary" class="mr-3 mt-3">
            {{ $t("amino-counter.take") }}
          </v-btn>
          <v-btn depressed @click="resetAM" class="mr-3 mt-3">
            {{ $t("amino-counter.reset") }}
          </v-btn>

          <v-dialog v-model="dialog" max-width="500px" @click:outside="setMax">
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed v-bind="attrs" v-on="on" class="mr-3 mt-3">
                {{ $t("amino-counter.settings") }}
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{ $t("amino-counter.settings") }}</span>
              </v-card-title>

              <v-card-text>
                <v-text-field
                  filled
                  :label="$t('amino-counter.amount')"
                  v-model.number="aminoCounter.max"
                  type="number"
                  class="mt-6"
                ></v-text-field>
              </v-card-text>

              <v-card-actions class="mt-n6">
                <v-spacer></v-spacer>
                <v-btn depressed @click="setMax">{{ $t("amino-counter.ok") }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  data: () => ({
    dialog: false
  }),
  methods: {
    signInGoogle() {
      this.$store.dispatch("signInGoogle");
    },
    takeAM() {
      firebase
        .firestore()
        .collection("aminoCounter")
        .doc(this.user.id)
        .update({
          count: this.aminoCounter.count + 1 || 1,
          date: new Date().toUTCString()
        });
    },
    resetAM() {
      firebase
        .firestore()
        .collection("aminoCounter")
        .doc(this.user.id)
        .update({
          count: 0
        });
    },
    setMax() {
      firebase
        .firestore()
        .collection("aminoCounter")
        .doc(this.user.id)
        .update({
          max: this.aminoCounter.max || 0
        });

      this.dialog = false;
    }
  },
  computed: {
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined && this.aminoCounter !== null;
    },
    ...mapState(["user", "aminoCounter"])
  }
};
</script>
