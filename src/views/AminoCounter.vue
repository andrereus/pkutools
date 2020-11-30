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
        <br />
        <v-btn depressed v-if="!userIsAuthenticated" @click="signInFacebook" class="mt-2">
          <v-icon left>mdi-facebook</v-icon>
          {{ $t("app.signin-facebook") }}
        </v-btn>

        <div v-if="userIsAuthenticated">
          <p>{{ $t("amino-counter.description") }}</p>

          <v-progress-linear
            :value="((aminoCounter.count || 0) * 100) / (settings.maxAmino || 3)"
            height="40"
            class="white--text my-6"
            rounded
          >
            {{ aminoCounter.count || 0 }} {{ $t("amino-counter.progress") }}
          </v-progress-linear>

          <p>{{ $t("amino-counter.date") }}: {{ getlocalDate(aminoCounter.date) }}</p>

          <v-btn depressed @click="takeAM" color="primary" class="mr-3 mt-3">
            {{ $t("amino-counter.take") }}
          </v-btn>
          <v-btn depressed @click="resetAM" class="mr-3 mt-3">
            {{ $t("common.reset") }}
          </v-btn>

          <v-dialog v-model="dialog" max-width="500px" @click:outside="setMax">
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed v-bind="attrs" v-on="on" class="mr-3 mt-3">
                {{ $t("common.settings") }}
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{ $t("common.settings") }}</span>
              </v-card-title>

              <v-card-text>
                <v-text-field
                  filled
                  :label="$t('amino-counter.amount')"
                  v-model.number="settings.maxAmino"
                  type="number"
                  class="mt-6"
                ></v-text-field>
              </v-card-text>

              <v-card-actions class="mt-n6">
                <v-spacer></v-spacer>
                <v-btn depressed @click="setMax">{{ $t("common.ok") }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>

    <v-snackbar bottom color="warning" v-model="offlineInfo">
      {{ $t("app.offline") }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="offlineInfo = false">
          {{ $t("common.close") }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { formatRelative, parseISO } from "date-fns";
import { enUS, de } from "date-fns/locale";

export default {
  metaInfo() {
    return {
      title: this.$t("amino-counter.title"),
      meta: [{ name: "description", content: this.$t("amino-counter.description") }]
    };
  },
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
    signInFacebook() {
      if (navigator.onLine) {
        this.$store.dispatch("signInFacebook");
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
          date: new Date().toISOString()
        });
    },
    resetAM() {
      let r = confirm(this.$t("common.reset") + "?");
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
        .ref(this.user.id + "/settings")
        .update({
          maxAmino: this.settings.maxAmino || 3
        });

      this.dialog = false;
    },
    getlocalDate(date) {
      if (date) {
        const locales = { enUS, de };
        return formatRelative(parseISO(new Date(date).toISOString()), new Date(), {
          locale: locales[this.$i18n.locale]
        });
      } else {
        return "";
      }
    }
  },
  computed: {
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    ...mapState(["user", "aminoCounter", "settings"])
  }
};
</script>

<style lang="scss" scoped>
.v-btn {
  text-transform: none;
}
</style>
