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
        <v-alert text type="info" v-if="!userIsAuthenticated">{{ $t("amino-counter.signin") }}</v-alert>

        <div v-if="userIsAuthenticated">
          <v-progress-linear
            :value="(userData.aminoCounterCount * 100) / userData.aminoCounterMax"
            height="40"
            class="white--text mt-6 mb-4"
          >
            {{ userData.aminoCounterCount }} {{ $t("amino-counter.progress") }}
          </v-progress-linear>

          <v-btn depressed @click="takeAM" color="primary" class="mr-3 mt-3">
            {{ $t("amino-counter.take") }}
          </v-btn>
          <v-btn depressed @click="resetAM" class="mr-3 mt-3">
            {{ $t("amino-counter.reset") }}
          </v-btn>

          <v-dialog v-model="dialog" max-width="500px">
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
                  outlined
                  :label="$t('amino-counter.amount')"
                  v-model.number="userData.aminoCounterMax"
                  type="number"
                  class="mt-6"
                ></v-text-field>
              </v-card-text>

              <v-card-actions class="mt-n6">
                <v-spacer></v-spacer>
                <v-btn depressed @click="setMax">{{ $t("amino-counter.save") }}</v-btn>
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
    takeAM() {
      let initCount = (this.userData.aminoCounterCount || 0) + 1;
      let initMax = this.userData.aminoCounterMax || 3;

      firebase
        .firestore()
        .collection("userData")
        .doc(this.user.id)
        .set({
          aminoCounterCount: initCount,
          aminoCounterMax: initMax
        });
    },
    resetAM() {
      let initCount = 0;
      let initMax = this.userData.aminoCounterMax || 3;

      firebase
        .firestore()
        .collection("userData")
        .doc(this.user.id)
        .set({
          aminoCounterCount: initCount,
          aminoCounterMax: initMax
        });
    },
    setMax() {
      let initCount = this.userData.aminoCounterCount || 0;
      let initMax = this.userData.aminoCounterMax || 0; // TODO

      firebase
        .firestore()
        .collection("userData")
        .doc(this.user.id)
        .set({
          aminoCounterCount: initCount,
          aminoCounterMax: initMax
        });

      this.dialog = false;
    }
  },
  watch: {
    userIsAuthenticated(newState) {
      if (newState === true) {
        this.$store.dispatch("bindRef", this.user.id);
      }
    }
  },
  computed: {
    userIsAuthenticated() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
    },
    ...mapState(["user", "userData"])
  }
};
</script>
