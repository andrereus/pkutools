<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline mt-3">{{ $t("settings.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <div v-if="!userIsAuthenticated">
          <v-btn depressed rounded @click="signInGoogle" class="mt-2">
            <v-icon left>{{ mdiGoogle }}</v-icon>
            {{ $t("app.signin-google") }}
          </v-btn>
          <br />
          <v-btn depressed rounded @click="signInFacebook" class="mt-2">
            <v-icon left>{{ mdiFacebook }}</v-icon>
            {{ $t("app.signin-facebook") }}
          </v-btn>
          <br />
          <v-btn depressed rounded to="/email-auth" class="mt-2">
            <v-icon left>{{ mdiEmail }}</v-icon>
            {{ $t("email-auth.title") }}
          </v-btn>
        </div>

        <div v-if="userIsAuthenticated">
          <v-text-field
            filled
            rounded
            :label="$t('settings.max-phe')"
            v-model.number="settings.maxPhe"
            type="number"
          ></v-text-field>

          <v-text-field
            filled
            rounded
            :label="$t('settings.max-amino')"
            v-model.number="settings.maxAmino"
            type="number"
          ></v-text-field>

          <v-switch v-model="$vuetify.theme.dark" inset :label="$t('app.dark')" class="mt-n1 mb-2 ml-1"></v-switch>

          <v-btn depressed rounded color="primary" class="mr-3 mb-3" @click="save">{{ $t("common.save") }}</v-btn>

          <h2 class="headline mt-6 mb-4">{{ $t("settings.reset-heading") }}</h2>

          <v-btn depressed rounded class="mr-6 mb-5" @click="resetLog">
            {{ $t("settings.reset-log") }}
          </v-btn>
          <v-btn depressed rounded class="mr-6 mb-5" @click="resetDiary">
            {{ $t("settings.reset-diary") }}
          </v-btn>
          <br />
          <v-btn depressed rounded class="mr-6 mb-5" @click="resetAM">
            {{ $t("settings.reset-am") }}
          </v-btn>
          <v-btn depressed rounded class="mr-6 mb-5" @click="resetOwnFood">
            {{ $t("settings.reset-own-food") }}
          </v-btn>

          <h2 class="headline mt-6 mb-4">{{ $t("settings.delete-account") }}</h2>

          <v-btn outlined rounded color="error" class="mr-6 mb-5" @click="deleteAccount">
            {{ $t("settings.delete-account") }}
          </v-btn>

          <p class="mt-6 mb-8 text--secondary">
            {{ $t("home.support-me") }}
            <a href="https://ko-fi.com/andrereus" target="_blank">
              <v-img
                v-if="!$vuetify.theme.dark"
                src="../assets/kofi.png"
                alt="Support me"
                max-width="200"
                class="mt-2"
              ></v-img>
              <v-img
                v-if="$vuetify.theme.dark"
                src="../assets/kofi-dark.png"
                alt="Support me"
                max-width="200"
                class="mt-2"
              ></v-img>
            </a>
          </p>

          <v-snackbar bottom color="teal" v-model="snackbar">
            {{ $t("settings.saved") }}
            <template v-slot:action="{ attrs }">
              <v-btn text v-bind="attrs" @click="snackbar = false">
                {{ $t("common.close") }}
              </v-btn>
            </template>
          </v-snackbar>
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
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { mdiGoogle, mdiFacebook, mdiEmail } from "@mdi/js";

export default {
  metaInfo() {
    return {
      title: this.$t("settings.title"),
      meta: [{ name: "description", content: this.$t("settings.description") }]
    };
  },
  data: () => ({
    mdiGoogle,
    mdiFacebook,
    mdiEmail,
    snackbar: false,
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
    save() {
      firebase
        .database()
        .ref(this.user.id + "/settings")
        .update({
          maxPhe: this.settings.maxPhe || 0,
          maxAmino: this.settings.maxAmino || 3
        })
        .then(() => {
          localStorage.vuetifyThemeDark = JSON.stringify(this.$vuetify.theme.dark);
          this.snackbar = true;
        });
    },
    resetLog() {
      let r = confirm(this.$t("settings.reset-log") + "?");
      if (r === true) {
        firebase
          .database()
          .ref(this.user.id + "/pheLog")
          .remove();
        this.$router.push("/");
      }
    },
    resetOwnFood() {
      let r = confirm(this.$t("settings.reset-own-food") + "?");
      if (r === true) {
        firebase
          .database()
          .ref(this.user.id + "/ownFood")
          .remove();
        this.$router.push("own-food");
      }
    },
    resetDiary() {
      let r = confirm(this.$t("settings.reset-diary") + "?");
      if (r === true) {
        firebase
          .database()
          .ref(this.user.id + "/pheDiary")
          .remove();
        this.$router.push("phe-diary");
      }
    },
    resetAM() {
      let r = confirm(this.$t("settings.reset-am") + "?");
      if (r === true) {
        firebase
          .database()
          .ref(this.user.id + "/aminoCounter")
          .remove();
        this.$router.push("amino-counter");
      }
    },
    deleteAccount() {
      let r = confirm(this.$t("settings.delete-account") + "?");
      if (r === true) {
        firebase.database().ref(this.user.id).remove();
        firebase
          .auth()
          .currentUser.delete()
          .then(() => {
            this.$store.dispatch("signOut");
            this.$router.push("/");
          })
          .catch(error => {
            alert(error);
          });
      }
    }
  },
  computed: {
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    ...mapState(["user", "settings"])
  }
};
</script>

<style lang="scss" scoped>
.v-btn {
  text-transform: none;
}
</style>
