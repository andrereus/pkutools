<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">{{ $t("feature-comparison.subject") }}</th>
          <th class="text-left" v-if="home">{{ $t("feature-comparison.details") }}</th>
          <th class="text-left" v-if="!home">PKU Tools</th>
          <th class="text-left" v-if="!home">PKU Manager</th>
          <th class="text-left" v-if="!home">Phe Rechner</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in features" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.pkutools }}</td>
          <td v-if="!home">{{ item.pkumanager }}</td>
          <td v-if="!home">{{ item.pherechner }}</td>
        </tr>
        <tr v-if="!home">
          <td>{{ $t("feature-comparison.links") }}</td>
          <td></td>
          <td>
            <a href="https://pkumanager.com/" target="_blank">Web</a>
            ,
            <a href="https://play.google.com/store/apps/details?id=com.andrereus.pkumanager" target="_blank">Android</a>
          </td>
          <td>
            <a href="https://pherechner.de/" target="_blank">Web</a>
            ,
            <a href="https://play.google.com/store/apps/details?id=com.endofweb.pherechner" target="_blank">Android</a>
            ,
            <a
              href="https://chrome.google.com/webstore/detail/phe-rechner/phihennkfhbchhbegacdmondhhkpmfjj"
              target="_blank"
            >
              Chrome
            </a>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import enFeatures from "./data/en-features.json";
import deFeatures from "./data/de-features.json";

export default {
  name: "FeatureComparison",
  props: {
    home: Boolean
  },
  data: () => ({
    enFeatures,
    deFeatures
  }),
  computed: {
    features() {
      if (this.$i18n.locale === "de") {
        return this.deFeatures;
      } else {
        return this.enFeatures;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.theme--light.v-data-table {
  background-color: #fafafa;
}
</style>
