<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" lg="9">
        <h2 class="headline mt-1">{{ $t("other-apps.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card max-width="400">
          <v-img src="../assets/pkumanager-app.png" alt="PKU Manager App"></v-img>
          <v-card-title>PKU Manager</v-card-title>

          <v-card-text>
            <div>{{ $t("other-apps.pku-manager") }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn text rounded href="https://pkumanager.com/" target="_blank">Web</v-btn>
            <v-btn
              text
              rounded
              href="https://play.google.com/store/apps/details?id=com.andrereus.pkumanager"
              target="_blank"
            >
              Android
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card max-width="400">
          <v-img src="../assets/pherechner-app.png" alt="Phe Rechner App"></v-img>
          <v-card-title>Phe Rechner</v-card-title>

          <v-card-text>
            <div>{{ $t("other-apps.phe-rechner") }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn text rounded href="https://pherechner.de/" target="_blank">Web</v-btn>
            <v-btn
              text
              rounded
              href="https://play.google.com/store/apps/details?id=com.endofweb.pherechner"
              target="_blank"
            >
              Android
            </v-btn>
            <v-btn
              text
              rounded
              href="https://chrome.google.com/webstore/detail/phe-rechner/phihennkfhbchhbegacdmondhhkpmfjj"
              target="_blank"
            >
              Chrome
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" lg="9">
        <h2 class="headline my-6">{{ $t("other-apps.features") }}</h2>
        <FeatureComparison />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FeatureComparison from "../components/FeatureComparison.vue";

export default {
  metaInfo() {
    return {
      title: this.$t("other-apps.title"),
      meta: [{ name: "description", content: this.$t("other-apps.description") }]
    };
  },
  components: {
    FeatureComparison
  }
};
</script>

<style lang="scss" scoped>
.v-btn {
  text-transform: none;
}
</style>
