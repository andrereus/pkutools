<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline" v-if="!userIsAuthenticated">{{ $t("home.title") }}</h2>
        <h2 class="headline" v-if="userIsAuthenticated">Hi {{ user.name }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center" class="mb-3">
      <v-col cols="12" md="10" lg="8" xl="6">
        <p v-if="!userIsAuthenticated" class="mb-6">{{ $t("app.description") }}</p>

        <div class="cards-clearfix mb-1" v-if="userIsAuthenticated">
          <v-card max-width="135" to="/phe-log" class="float-left mr-3 mb-3">
            <v-card-text>
              <p>{{ $t("phe-log.title") }}</p>
              <v-progress-circular
                :rotate="-90"
                :size="105"
                :width="10"
                :value="(pheResult * 100) / (settings.maxPhe || 0)"
                color="primary"
              >
                {{ pheResult }}
              </v-progress-circular>
            </v-card-text>
          </v-card>

          <v-card max-width="135" to="/amino-counter" class="float-left mr-3 mb-3">
            <v-card-text>
              <p>{{ $t("amino-counter.title") }}</p>
              <v-progress-circular
                :rotate="-90"
                :size="105"
                :width="10"
                :value="((aminoCounter.count || 0) * 100) / (settings.maxAmino || 3)"
                color="teal"
              >
                {{ aminoCounter.count || 0 }}
              </v-progress-circular>
            </v-card-text>
          </v-card>

          <v-card width="280" height="175" to="/phe-diary" class="float-left mr-3 mb-3">
            <v-card-text>
              <p>{{ $t("phe-diary.title") }}</p>
              <p v-if="graph.length < 2">{{ $t("phe-diary.chart") }}</p>
              <v-sparkline :value="graph" fill smooth height="125"></v-sparkline>
            </v-card-text>
          </v-card>
        </div>

        <div v-if="!userIsAuthenticated">
          <v-btn depressed to="/phe-search" color="primary" class="mr-3 mb-3">
            <v-icon left>mdi-magnify</v-icon>
            {{ $t("phe-search.title") }}
          </v-btn>
          <v-btn depressed to="/phe-calculator" color="primary" class="mr-3 mb-3">
            <v-icon left>mdi-calculator</v-icon>
            {{ $t("phe-calculator.title") }}
          </v-btn>
          <v-btn depressed to="/protein-calculator" color="primary" class="mr-3 mb-3">
            <v-icon left>mdi-calculator-variant</v-icon>
            {{ $t("protein-calculator.title") }}
          </v-btn>

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text class="mr-3 mb-3" v-bind="attrs" v-on="on">
                {{ $t("home.more") }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="signInGoogle">
                <span>
                  <v-icon>mdi-google</v-icon>
                  {{ $t("app.signin-google") }}
                </span>
              </v-list-item>
              <v-list-item @click="signInFacebook">
                <span>
                  <v-icon>mdi-facebook</v-icon>
                  {{ $t("app.signin-facebook") }}
                </span>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <v-img src="../assets/eating-together.svg" alt="Food Illustration" class="mt-4 mb-8 illustration"></v-img>

        <div v-if="!userIsAuthenticated">
          <v-btn
            v-if="this.$i18n.locale === 'en'"
            depressed
            href="https://youtu.be/lmiejnEFccY"
            target="_blank"
            color="primary"
            class="mr-3 mb-5"
          >
            <v-icon left>mdi-play-circle-outline</v-icon>
            {{ $t("home.video") }}
          </v-btn>

          <v-btn
            v-if="this.$i18n.locale === 'de'"
            depressed
            href="https://youtu.be/5_-F4tM8_RQ"
            target="_blank"
            color="primary"
            class="mr-3 mb-5"
          >
            <v-icon left>mdi-play-circle-outline</v-icon>
            {{ $t("home.video") }}
          </v-btn>

          <v-btn text href="https://youtu.be/ITfvSliHwc0" target="_blank" class="mr-3 mb-5">
            <v-icon left>mdi-play</v-icon>
            {{ $t("home.mobile-video") }}
          </v-btn>

          <h2 class="headline mt-4 mb-6">{{ $t("home.features") }}</h2>
          <FeatureComparison home class="mb-8" />
        </div>

        <v-card class="mt-4">
          <v-card-text>
            <p>
              <v-icon>mdi-information-outline</v-icon>
              {{ $t("app.installation") }}
            </p>
            <pwa-install :installbuttontext="$t('app.install')"></pwa-install>
          </v-card-text>
        </v-card>
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
import FeatureComparison from "../components/FeatureComparison.vue";
import { mapState } from "vuex";
import "@pwabuilder/pwainstall";

export default {
  metaInfo() {
    return {
      title: this.$t("app.title"),
      titleTemplate: null,
      meta: [{ name: "description", content: this.$t("app.description") }]
    };
  },
  components: {
    FeatureComparison
  },
  data: () => ({
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
    }
  },
  computed: {
    pheResult() {
      let phe = 0;
      this.pheLog.forEach(item => {
        phe += item.phe;
      });
      return Math.round(phe);
    },
    graph() {
      let newPheDiary = this.pheDiary;
      return newPheDiary
        .sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        })
        .map(obj => obj.phe);
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    ...mapState(["user", "pheLog", "aminoCounter", "pheDiary", "settings"])
  }
};
</script>

<style lang="scss" scoped>
.illustration {
  max-width: 550px;
}

.cards-clearfix:after {
  display: block;
  content: "";
  clear: both;
}

pwa-install::part(openButton) {
  background: #3498db;
  border-radius: 4px;
  padding: 4px 16px;
}

.v-btn {
  text-transform: none;
}
</style>
