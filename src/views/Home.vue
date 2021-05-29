<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline mt-1" v-if="!userIsAuthenticated">{{ $t("home.title") }}</h2>
        <h2 class="headline mt-1" v-if="userIsAuthenticated">Hi {{ user.name }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center" class="mb-3">
      <v-col cols="12" md="10" lg="8" xl="6">
        <div v-if="!userIsAuthenticated">
          <p class="mb-6">{{ $t("app.description") }}</p>

          <v-btn depressed rounded to="/phe-search" color="primary" class="mr-3 mb-3">
            <v-icon left>{{ mdiMagnify }}</v-icon>
            {{ $t("phe-search.title") }}
          </v-btn>
          <v-btn depressed rounded to="/phe-calculator" color="primary" class="mr-3 mb-3">
            <v-icon left>{{ mdiCalculator }}</v-icon>
            {{ $t("phe-calculator.title") }}
          </v-btn>
          <v-btn depressed rounded to="/protein-calculator" color="primary" class="mr-3 mb-3">
            <v-icon left>{{ mdiCalculatorVariant }}</v-icon>
            {{ $t("protein-calculator.title") }}
          </v-btn>

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text rounded class="mr-3 mb-3" v-bind="attrs" v-on="on">
                {{ $t("home.more") }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="signInGoogle">
                <span>
                  <v-icon>{{ mdiGoogle }}</v-icon>
                  {{ $t("app.signin-google") }}
                </span>
              </v-list-item>
              <v-list-item @click="signInFacebook">
                <span>
                  <v-icon>{{ mdiFacebook }}</v-icon>
                  {{ $t("app.signin-facebook") }}
                </span>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div v-if="userIsAuthenticated">
          <h3 class="text-caption mt-n3 mb-4 ml-1">{{ $t("app.tools") }}</h3>

          <v-btn depressed rounded to="/phe-search" class="mr-2 mb-3">
            <v-icon left>{{ mdiMagnify }}</v-icon>
            {{ $t("phe-search.title") }}
          </v-btn>
          <v-btn v-if="userIsAuthenticated" depressed rounded to="/own-food" class="mr-2 mb-3">
            <v-icon left>{{ mdiFoodApple }}</v-icon>
            {{ $t("home.own-food") }}
          </v-btn>
          <v-btn depressed rounded to="/phe-calculator" class="mr-2 mb-3">
            <v-icon left>{{ mdiCalculator }}</v-icon>
            {{ $t("phe-calculator.title") }}
          </v-btn>
          <v-btn depressed rounded to="/protein-calculator" class="mr-2 mb-3">
            <v-icon left>{{ mdiCalculatorVariant }}</v-icon>
            {{ $t("protein-calculator.title") }}
          </v-btn>

          <h3 class="text-caption mt-3 mb-5 ml-1">{{ $t("app.logs") }}</h3>

          <v-row no-gutters class="mt-4">
            <v-col cols="6" sm="3" md="3" lg="3">
              <v-card outlined height="200" to="/phe-log" class="mr-1 mb-1 stat-card">
                <v-card-text>
                  <p class="mb-6">{{ $t("phe-log.title") }}</p>
                  <div class="text-center">
                    <v-progress-circular
                      :rotate="-90"
                      :size="110"
                      :width="15"
                      :value="(pheResult * 100) / (settings.maxPhe || 0)"
                      color="primary"
                    >
                      {{ pheResult }}
                    </v-progress-circular>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="6" sm="3" md="3" lg="3">
              <v-card outlined height="200" to="/amino-counter" class="mr-1 mb-1 stat-card">
                <v-card-text>
                  <p class="mb-6">{{ $t("amino-counter.title") }}</p>
                  <div class="text-center">
                    <v-progress-circular
                      :rotate="-90"
                      :size="110"
                      :width="15"
                      :value="(calculateAmino * 100) / (settings.maxAmino || 3)"
                      color="teal"
                    >
                      {{ calculateAmino }}
                    </v-progress-circular>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="6" lg="6">
              <v-card outlined height="200" to="/phe-diary" class="mr-1 mb-1 stat-card">
                <v-card-text>
                  <p class="mb-6">{{ $t("phe-diary.title") }}</p>
                  <p v-if="pheDiary.length < 1" class="text-center mt-16">
                    <v-icon>{{ mdiPoll }}</v-icon>
                  </p>
                  <apexchart
                    v-if="pheDiary.length >= 1"
                    type="bar"
                    height="110"
                    :options="chartOptions"
                    :series="graph"
                    class="ml-n1"
                  ></apexchart>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <div v-if="!userIsAuthenticated">
          <v-img src="../assets/eating-together.svg" alt="Food Illustration" class="mt-4 mb-8 illustration"></v-img>

          <v-btn
            v-if="this.$i18n.locale === 'en'"
            depressed
            rounded
            href="https://youtu.be/lmiejnEFccY"
            target="_blank"
            color="primary"
            class="mr-3 mb-5"
          >
            <v-icon left>{{ mdiPlayCircleOutline }}</v-icon>
            {{ $t("home.video") }}
          </v-btn>

          <v-btn
            v-if="this.$i18n.locale === 'de'"
            depressed
            rounded
            href="https://youtu.be/5_-F4tM8_RQ"
            target="_blank"
            color="primary"
            class="mr-3 mb-5"
          >
            <v-icon left>{{ mdiPlayCircleOutline }}</v-icon>
            {{ $t("home.video") }}
          </v-btn>

          <v-btn text rounded href="https://youtu.be/ITfvSliHwc0" target="_blank" class="mr-3 mb-5">
            <v-icon left>{{ mdiPlay }}</v-icon>
            {{ $t("home.mobile-video") }}
          </v-btn>

          <h2 class="headline mt-4 mb-6">{{ $t("home.features") }}</h2>

          <FeatureComparison home class="mb-6" />

          <v-btn depressed rounded to="/help" color="primary" class="mr-3 mb-3">
            <v-icon left>{{ mdiInformationOutline }}</v-icon>
            {{ $t("home.installation") }}
          </v-btn>

          <v-btn depressed rounded to="/other-apps" class="mr-3 mb-3">
            <v-icon left>{{ mdiCompareHorizontal }}</v-icon>
            {{ $t("home.compare") }}
          </v-btn>
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
import FeatureComparison from "../components/FeatureComparison.vue";
import { mapState } from "vuex";
import VueApexCharts from "vue-apexcharts";
import { parseISO, isToday } from "date-fns";
import {
  mdiGoogle,
  mdiFacebook,
  mdiMagnify,
  mdiCalculator,
  mdiCalculatorVariant,
  mdiFoodApple,
  mdiPoll,
  mdiPlayCircleOutline,
  mdiPlay,
  mdiInformationOutline,
  mdiCompareHorizontal
} from "@mdi/js";

export default {
  components: {
    FeatureComparison,
    apexchart: VueApexCharts
  },
  metaInfo() {
    return {
      title: this.$t("app.title"),
      titleTemplate: null,
      meta: [{ name: "description", content: this.$t("app.description") }]
    };
  },
  data: () => ({
    mdiGoogle,
    mdiFacebook,
    mdiMagnify,
    mdiCalculator,
    mdiCalculatorVariant,
    mdiFoodApple,
    mdiPoll,
    mdiPlayCircleOutline,
    mdiPlay,
    mdiInformationOutline,
    mdiCompareHorizontal,
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
    calculateAmino() {
      return this.aminoCounter.filter(item => {
        return isToday(parseISO(item.date));
      }).length;
    },
    pheResult() {
      let phe = 0;
      this.pheLog.forEach(item => {
        phe += item.phe;
      });
      return Math.round(phe);
    },
    graph() {
      let newPheDiary = this.pheDiary;
      let finalPheDiary = newPheDiary.map(obj => {
        return { x: obj.date, y: obj.phe };
      });
      return [
        {
          name: "Phe",
          data: finalPheDiary
        }
      ];
    },
    chartOptions() {
      return {
        chart: {
          height: 110,
          type: "bar",
          sparkline: {
            enabled: true
          },
          background: "transparent"
        },
        xaxis: {
          type: "datetime"
        },
        theme: {
          mode: this.$vuetify.theme.dark === true ? "dark" : "light"
        },
        colors: ["#3498db"],
        tooltip: {
          enabled: false
        }
      };
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

.v-btn {
  text-transform: none;
}

.stat-card {
  border: none;
}

.theme--light.stat-card {
  background-color: #fafafa;
}
</style>
