<template>
  <div>
    <h2 class="headline my-6">{{ $t("feature-comparison.title") }}</h2>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Feature</th>
            <th class="text-left">PKU Tools</th>
            <th class="text-left">PKU Manager</th>
            <th class="text-left">Phe Rechner</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in features" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.pkutools }}</td>
            <td>{{ item.pkumanager }}</td>
            <td>{{ item.pherechner }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import enFeatures from "./data/en-features.json";
import deFeatures from "./data/de-features.json";

export default {
  name: "FeatureComparison",
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
