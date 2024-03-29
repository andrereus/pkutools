<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline mt-3">{{ $t("amino-counter.title") }}</h2>
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

          <v-img
            src="../assets/en-amino-counter.png"
            :alt="$t('amino-counter.title')"
            max-width="400"
            class="mt-10"
            v-if="$i18n.locale === 'en'"
          ></v-img>
          <v-img
            src="../assets/de-amino-counter.png"
            :alt="$t('amino-counter.title')"
            max-width="400"
            class="mt-10"
            v-if="$i18n.locale === 'de'"
          ></v-img>
        </div>

        <div v-if="userIsAuthenticated">
          <p>{{ $t("amino-counter.description") }}</p>

          <v-progress-linear
            :value="(calculateAmino * 100) / (settings.maxAmino || 3)"
            height="40"
            class="white--text my-6 amino-progress"
            rounded
            color="teal"
          >
            {{ calculateAmino }} {{ $t("amino-counter.progress") }}
          </v-progress-linear>

          <v-timeline dense>
            <v-timeline-item fill-dot color="primary" large :icon="mdiCupWater">
              <v-btn depressed rounded @click="takeAM" color="primary" class="mr-2 mt-2">
                {{ $t("amino-counter.take") }}
              </v-btn>
              <v-btn depressed rounded class="mr-2 mt-2" @click="resetAM">
                {{ $t("common.reset") }}
              </v-btn>
            </v-timeline-item>

            <v-timeline-item v-for="(item, index) in reverseAminoCounter" :key="index" small>
              <p class="mb-0">{{ $t("amino-counter.serving") }} {{ getlocalDate(item.date) }}</p>
            </v-timeline-item>
          </v-timeline>

          <p class="text--secondary mt-5">
            <v-icon>{{ mdiInformationVariant }}</v-icon>
            {{ $t("amino-counter.note") }}
          </p>

          <v-dialog v-model="alert" max-width="300">
            <v-card>
              <v-card-title>{{ $t("common.note") }}</v-card-title>
              <v-card-text>{{ $t("amino-counter.limit") }}</v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="alert = false">{{ $t("common.ok") }}</v-btn>
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
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { formatRelative, isToday, parseISO } from "date-fns";
import { enUS, de, fr, es } from "date-fns/locale";
import { mdiGoogle, mdiFacebook, mdiCupWater, mdiInformationVariant, mdiEmail } from "@mdi/js";

export default {
  metaInfo() {
    return {
      title: this.$t("amino-counter.title"),
      meta: [{ name: "description", content: this.$t("amino-counter.description") }]
    };
  },
  data: () => ({
    mdiGoogle,
    mdiFacebook,
    mdiCupWater,
    mdiInformationVariant,
    mdiEmail,
    alert: false,
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
      if (this.aminoCounter.length >= 100) {
        this.alert = true;
      } else {
        firebase
          .database()
          .ref(this.user.id + "/aminoCounter")
          .push({
            date: new Date().toISOString()
          });
      }
    },
    getlocalDate(date) {
      if (date) {
        const locales = { enUS, de, fr, es };
        return formatRelative(parseISO(new Date(date).toISOString()), new Date(), {
          locale: locales[this.$i18n.locale]
        });
      } else {
        return "";
      }
    },
    resetAM() {
      let r = confirm(this.$t("common.reset") + "?");
      if (r === true) {
        firebase
          .database()
          .ref(this.user.id + "/aminoCounter")
          .remove();
      }
    }
  },
  computed: {
    reverseAminoCounter() {
      return [...this.aminoCounter].reverse();
    },
    calculateAmino() {
      return this.aminoCounter.filter(item => {
        return isToday(parseISO(item.date));
      }).length;
    },
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

.amino-progress {
  border-radius: 20px;
}
</style>
