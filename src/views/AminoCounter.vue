<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("amino-counter.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-btn depressed v-if="!userIsAuthenticated" @click="signInGoogle" class="mt-2">
          <v-icon left>mdi-google</v-icon>
          {{ $t("app.signin-google") }}
        </v-btn>

        <div v-if="userIsAuthenticated">
          <p>{{ $t("amino-counter.description") }}</p>

          <v-progress-linear
            :value="((aminoCounter.count || 0) * 100) / (aminoCounter.max || 3)"
            height="40"
            class="white--text my-6"
            rounded
          >
            {{ aminoCounter.count || 0 }} {{ $t("amino-counter.progress") }}
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

    <v-snackbar top color="warning" v-model="offlineInfo">
      {{ $t("app.offline") }}
      <v-btn text @click="offlineInfo = false">
        {{ $t("app.close") }}
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default {
  data: () => ({
    dialog: false,
    offlineInfo: false
  }),
  methods: {
    signInGoogle() {
      if (navigator.onLine) {
        this.$store.dispatch("signInGoogle");
      } else {
        this.offlineInfo = true;
      }
    },
    takeAM() {
      firebase
        .database()
        .ref(this.user.id + "/aminoCounter")
        .update({
          count: this.aminoCounter.count + 1 || 1,
          date: new Date().toUTCString()
        });
    },
    resetAM() {
      let r = confirm(this.$t("amino-counter.reset") + "?");
      if (r === true) {
        firebase
          .database()
          .ref(this.user.id + "/aminoCounter")
          .update({
            count: 0
          });
      }
    },
    setMax() {
      firebase
        .database()
        .ref(this.user.id + "/aminoCounter")
        .update({
          max: this.aminoCounter.max || 3
        });

      this.dialog = false;
    }
  },
  computed: {
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    ...mapState(["user", "aminoCounter"])
  }
};
</script>
