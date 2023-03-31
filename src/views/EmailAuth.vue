<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline mt-1">{{ $t("email-auth.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
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
                    class="mt-4"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    filled
                    rounded
                    :label="$t('email-auth.password')"
                    type="password"
                    v-model="password"
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
                    :label="$t('email-auth.email')"
                    type="email"
                    class="mt-6"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    filled
                    rounded
                    :label="$t('email-auth.password')"
                    type="password"
                    v-model="password"
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
                    class="mt-6"
                    v-model="email"
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

export default {
  metaInfo() {
    return {
      title: this.$t("email-auth.title"),
      meta: [{ name: "description", content: this.$t("email-auth.description") }]
    };
  },
  data: () => ({
    offlineInfo: false,
    tab: null,
    email: null,
    password: null
  }),
  methods: {
    registerEmailPassword() {
      if (navigator.onLine) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
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
            this.dispatch("initRef");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.offlineInfo = true;
      }
    },
    signInEmailPassword() {
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
            this.dispatch("initRef");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.offlineInfo = true;
      }
    },
    resetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          alert("Email for password reset has been sent. Please check your emails.");
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
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
