<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">{{ $t("feature-comparison.name") }}</th>
          <th class="text-left" v-if="home">{{ $t("feature-comparison.description") }}</th>
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
