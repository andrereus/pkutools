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
                :width="12"
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
                :width="12"
                :value="(calculateAmino * 100) / (settings.maxAmino || 3)"
                color="teal"
              >
                {{ calculateAmino }}
              </v-progress-circular>
            </v-card-text>
          </v-card>

          <v-card width="280" height="175" to="/phe-diary" class="float-left mr-3 mb-3">
            <v-card-text>
              <p>{{ $t("phe-diary.title") }}</p>
              <p v-if="pheDiary.length < 1" class="text-center mt-12">
                <v-icon>mdi-poll</v-icon>
              </p>
              <apexchart
                v-if="pheDiary.length >= 1"
                type="bar"
                height="115"
                :options="chartOptions"
                :series="graph"
                class="mt-n2"
              ></apexchart>
            </v-card-text>
          </v-card>
        </div>

        <div v-if="!userIsAuthenticated">
          <v-btn depressed rounded to="/phe-search" color="primary" class="mr-3 mb-3">
            <v-icon left>mdi-magnify</v-icon>
            {{ $t("phe-search.title") }}
          </v-btn>
          <v-btn depressed rounded to="/phe-calculator" color="primary" class="mr-3 mb-3">
            <v-icon left>mdi-calculator</v-icon>
            {{ $t("phe-calculator.title") }}
          </v-btn>
          <v-btn depressed rounded to="/protein-calculator" color="primary" class="mr-3 mb-3">
            <v-icon left>mdi-calculator-variant</v-icon>
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
            rounded
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
            rounded
            href="https://youtu.be/5_-F4tM8_RQ"
            target="_blank"
            color="primary"
            class="mr-3 mb-5"
          >
            <v-icon left>mdi-play-circle-outline</v-icon>
            {{ $t("home.video") }}
          </v-btn>

          <v-btn text rounded href="https://youtu.be/ITfvSliHwc0" target="_blank" class="mr-3 mb-5">
            <v-icon left>mdi-play</v-icon>
            {{ $t("home.mobile-video") }}
          </v-btn>

          <h2 class="headline mt-4 mb-6">{{ $t("home.features") }}</h2>

          <FeatureComparison home class="mb-6" />

          <v-btn depressed rounded to="/other-apps" class="mr-3 mb-3">
            <v-icon left>mdi-compare-horizontal</v-icon>
            {{ $t("home.compare") }}
          </v-btn>
          <v-btn depressed rounded to="/help" class="mr-3 mb-3">
            <v-icon left>mdi-information-outline</v-icon>
            {{ $t("home.installation") }}
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
          height: 115,
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

.cards-clearfix:after {
  display: block;
  content: "";
  clear: both;
}

.v-btn {
  text-transform: none;
}
</style>
