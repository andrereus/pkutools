<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("home.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <p>{{ $t("app.description") }}</p>
        <p>
          <v-icon>mdi-information-outline</v-icon>
          {{ $t("app.install") }}
        </p>

        <v-btn depressed to="/phe-search" color="primary" class="mr-3 mt-3">{{ $t("phe-search.title") }}</v-btn>
        <v-btn depressed to="/phe-calculator" color="primary" class="mr-3 mt-3">{{ $t("phe-calculator.title") }}</v-btn>
        <v-btn depressed to="/protein-calculator" color="primary" class="mr-3 mt-3">
          {{ $t("protein-calculator.title") }}
        </v-btn>
        <v-btn depressed to="/phe-log" color="primary" class="mr-3 mt-3">{{ $t("phe-log.title") }}</v-btn>
        <v-btn depressed to="/amino-counter" color="primary" class="mr-3 mt-3">{{ $t("amino-counter.title") }}</v-btn>

        <v-img src="../assets/eating-together.svg" alt="Food Illustration" class="mt-8 illustration"></v-img>

        <h2 class="headline my-6">{{ $t("home.features") }}</h2>
        <FeatureComparison home />
        <v-btn depressed to="/other-apps" class="mt-6">{{ $t("other-apps.title") }}</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FeatureComparison from "../components/FeatureComparison.vue";

export default {
  components: {
    FeatureComparison
  }
};
</script>

<style lang="scss" scoped>
.illustration {
  max-width: 550px;
}
</style>
