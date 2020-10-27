<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline" v-if="!userIsAuthenticated">{{ $t("home.title") }}</h2>
        <h2 class="headline" v-if="userIsAuthenticated">Hi {{ user.name }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <div v-if="!userIsAuthenticated">
          <p>{{ $t("app.description") }}</p>
          <p>
            <v-icon>mdi-information-outline</v-icon>
            {{ $t("app.install") }}
          </p>
        </div>

        <div class="cards-clearfix" v-if="userIsAuthenticated">
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
                :value="((aminoCounter.count || 0) * 100) / (aminoCounter.max || 3)"
                color="primary"
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

        <v-btn depressed to="/phe-search" color="primary" class="mr-3 mt-3">{{ $t("phe-search.title") }}</v-btn>
        <v-btn depressed to="/phe-calculator" color="primary" class="mr-3 mt-3">{{ $t("phe-calculator.title") }}</v-btn>
        <v-btn depressed to="/protein-calculator" color="primary" class="mr-3 mt-3">
          {{ $t("protein-calculator.title") }}
        </v-btn>
        <v-btn depressed to="/phe-log" color="primary" class="mr-3 mt-3">{{ $t("phe-log.title") }}</v-btn>
        <v-btn depressed to="/phe-diary" color="primary" class="mr-3 mt-3">{{ $t("phe-diary.title") }}</v-btn>
        <v-btn depressed to="/amino-counter" color="primary" class="mr-3 mt-3">{{ $t("amino-counter.title") }}</v-btn>

        <v-img src="../assets/eating-together.svg" alt="Food Illustration" class="mt-8 illustration"></v-img>

        <div v-if="!userIsAuthenticated">
          <h2 class="headline my-6">{{ $t("home.features") }}</h2>
          <FeatureComparison home />
          <v-btn depressed to="/other-apps" class="mt-6">{{ $t("other-apps.title") }}</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FeatureComparison from "../components/FeatureComparison.vue";
import { mapState } from "vuex";

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
    ...mapState(["user", "pheLog", "pheDiary", "aminoCounter", "settings"])
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
</style>
