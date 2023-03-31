<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline mt-1">{{ $t("email-auth.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <div v-if="userIsAuthenticated">
          <p>{{ $t("email-auth.signedin") }}</p>
        </div>
        <div v-if="!userIsAuthenticated">
          <p class="mb-6">{{ $t("email-auth.description") }}</p>

          <v-card outlined>
            <v-tabs v-model="tab">
              <v-tabs-slider></v-tabs-slider>

              <v-tab>
                {{ $t("email-auth.signin") }}
              </v-tab>

              <v-tab>
                {{ $t("email-auth.register") }}
              </v-tab>

              <v-tab>
                {{ $t("email-auth.forgot-password") }}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-container fluid>
                  <v-text-field
                    filled
                    rounded
                    :label="$t('email-auth.email')"
                    type="email"
                    class="mt-6"
                    v-model="email"
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>
                  <v-text-field
                    filled
                    rounded
                    :label="$t('email-auth.password')"
                    :type="show1 ? 'text' : 'password'"
                    v-model="password"
                    :append-icon="show1 ? mdiEye : mdiEyeOff"
                    :rules="[rules.required, rules.min]"
                    :hint="$t('email-auth.min-length')"
                    @click:append="show1 = !show1"
                  ></v-text-field>

                  <v-btn depressed rounded color="primary" class="mr-3 mb-3" @click="signInEmailPassword">
                    {{ $t("email-auth.signin") }}
                  </v-btn>
                </v-container>
              </v-tab-item>

              <v-tab-item>
                <v-container fluid>
                  <p class="mt-2">{{ $t("email-auth.register-note") }}</p>

                  <v-text-field
                    filled
                    rounded
                    :label="$t('email-auth.name')"
                    type="text"
                    class="mt-8"
                    v-model="name"
                  ></v-text-field>
                  <v-text-field
                    filled
                    rounded
                    :label="$t('email-auth.email')"
                    type="email"
                    v-model="email"
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>
                  <v-text-field
                    filled
                    rounded
                    :label="$t('email-auth.password')"
                    :type="show1 ? 'text' : 'password'"
                    v-model="password"
                    :append-icon="show1 ? mdiEye : mdiEyeOff"
                    :rules="[rules.required, rules.min]"
                    :hint="$t('email-auth.min-length')"
                    @click:append="show1 = !show1"
                  ></v-text-field>

                  <v-btn depressed rounded color="primary" class="mr-3 mb-3" @click="registerEmailPassword">
                    {{ $t("email-auth.register") }}
                  </v-btn>
                </v-container>
              </v-tab-item>

              <v-tab-item>
                <v-container fluid>
                  <p class="mt-2">{{ $t("email-auth.reset-note") }}</p>

                  <v-text-field
                    filled
                    rounded
                    :label="$t('email-auth.email')"
                    type="email"
                    class="mt-8"
                    v-model="email"
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>

                  <v-btn depressed rounded color="primary" class="mr-3 mb-3" @click="resetPassword">
                    {{ $t("email-auth.reset-password") }}
                  </v-btn>
                </v-container>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
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
import { mdiEye, mdiEyeOff } from "@mdi/js";

export default {
  metaInfo() {
    return {
      title: this.$t("email-auth.title"),
      meta: [{ name: "description", content: this.$t("email-auth.description") }]
    };
  },
  data: () => ({
    mdiEye,
    mdiEyeOff,
    offlineInfo: false,
    tab: null,
    name: null,
    email: null,
    password: null,
    show1: false
  }),
  methods: {
    registerEmailPassword() {
      firebase.auth().useDeviceLanguage();
      if (navigator.onLine) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(result => {
            result.user.updateProfile({
              displayName: this.name
            });
            const newUser = {
              id: result.user.uid,
              name: result.user.displayName,
              email: result.additionalUserInfo.profile.email,
              photoUrl: result.user.photoURL
            };
            this.$store.commit("setUser", newUser);
          })
          .then(() => {
            this.$store.dispatch("initRef");
            this.$router.push("/");
          })
          .catch(error => {
            alert(this.$t("email-auth.error"));
            console.log(error);
          });
      } else {
        this.offlineInfo = true;
      }
    },
    signInEmailPassword() {
      firebase.auth().useDeviceLanguage();
      if (navigator.onLine) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(result => {
            const newUser = {
              id: result.user.uid,
              name: result.user.displayName,
              email: result.additionalUserInfo.profile.email,
              photoUrl: result.user.photoURL
            };
            this.$store.commit("setUser", newUser);
          })
          .then(() => {
            this.$store.dispatch("initRef");
            this.$router.push("/");
          })
          .catch(error => {
            alert(this.$t("email-auth.error"));
            console.log(error);
          });
      } else {
        this.offlineInfo = true;
      }
    },
    resetPassword() {
      firebase.auth().useDeviceLanguage();
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          alert("Email for password reset has been sent. Please check your emails.");
        })
        .catch(error => {
          alert(this.$t("email-auth.error"));
          console.log(error);
        });
    }
  },
  computed: {
    rules() {
      return {
        required: value => !!value || "Required",
        min: v => (v !== null && v.length >= 8) || "Min. 8 characters",
        email: value => {
          const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return pattern.test(value) || "Invalid";
        }
      };
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    ...mapState(["user"])
  }
};
</script>

<style lang="scss" scoped>
.v-btn {
  text-transform: none;
}
</style>
