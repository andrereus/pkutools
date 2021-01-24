<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">{{ $t("feature-comparison.subject") }}</th>
          <th class="text-left" v-if="home">{{ $t("feature-comparison.included") }}</th>
          <th class="text-left" v-if="!home">PKU Tools</th>
          <th class="text-left" v-if="!home">PKU Manager</th>
          <th class="text-left" v-if="!home">Phe Rechner</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in features" :key="item.name" class="tr-read-only">
          <td class="feature-name">
            <v-icon left>{{ item.icon }}</v-icon>
            <span v-if="$i18n.locale === 'en'">{{ item.en }}</span>
            <span v-if="$i18n.locale === 'de'">{{ item.de }}</span>
          </td>
          <td>
            <v-icon v-if="item.pkutools === 1">mdi-checkbox-marked-circle</v-icon>
            <v-icon v-if="item.pkutools === 2">mdi-circle-half-full</v-icon>
            <v-icon v-if="item.pkutools === 3">mdi-close-circle-outline</v-icon>
          </td>
          <td v-if="!home">
            <v-icon v-if="item.pkumanager === 1">mdi-checkbox-marked-circle</v-icon>
            <v-icon v-if="item.pkumanager === 2">mdi-circle-half-full</v-icon>
            <v-icon v-if="item.pkumanager === 3">mdi-close-circle-outline</v-icon>
          </td>
          <td v-if="!home">
            <v-icon v-if="item.pherechner === 1">mdi-checkbox-marked-circle</v-icon>
            <v-icon v-if="item.pherechner === 2">mdi-circle-half-full</v-icon>
            <v-icon v-if="item.pherechner === 3">mdi-close-circle-outline</v-icon>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "FeatureComparison",
  props: {
    home: Boolean
  },
  data: () => ({
    features: [
      {
        icon: "mdi-magnify",
        en: "Phe Search",
        de: "Phe Suche",
        pkutools: 1,
        pkumanager: 1,
        pherechner: 1
      },
      {
        icon: "mdi-calculator",
        en: "Phe Calculator",
        de: "Phe Rechner",
        pkutools: 1,
        pkumanager: 1,
        pherechner: 1
      },
      {
        icon: "mdi-calculator-variant",
        en: "Protein Calculator",
        de: "Eiweiß Rechner",
        pkutools: 1,
        pkumanager: 1,
        pherechner: 1
      },
      {
        icon: "mdi-food-apple",
        en: "Own Food",
        de: "Eigene Lebensmittel",
        pkutools: 1,
        pkumanager: 3,
        pherechner: 1
      },
      {
        icon: "mdi-text-box",
        en: "Phe Log",
        de: "Phe Protokoll",
        pkutools: 1,
        pkumanager: 1,
        pherechner: 1
      },
      {
        icon: "mdi-book",
        en: "Phe Diary",
        de: "Phe Tagebuch",
        pkutools: 1,
        pkumanager: 1,
        pherechner: 1
      },
      {
        icon: "mdi-cup-water",
        en: "Amino Counter",
        de: "Amino Zähler",
        pkutools: 1,
        pkumanager: 3,
        pherechner: 3
      },
      {
        icon: "mdi-web",
        en: "Web",
        de: "Web",
        pkutools: 1,
        pkumanager: 1,
        pherechner: 1
      },
      {
        icon: "mdi-android",
        en: "Android",
        de: "Android",
        pkutools: 1,
        pkumanager: 1,
        pherechner: 1
      },
      {
        icon: "mdi-apple",
        en: "iOS",
        de: "iOS",
        pkutools: 1,
        pkumanager: 3,
        pherechner: 3
      },
      {
        icon: "mdi-microsoft-windows",
        en: "Windows",
        de: "Windows",
        pkutools: 1,
        pkumanager: 3,
        pherechner: 3
      },
      {
        icon: "mdi-desktop-mac",
        en: "macOS",
        de: "macOS",
        pkutools: 1,
        pkumanager: 3,
        pherechner: 3
      },
      {
        icon: "mdi-cloud-off-outline",
        en: "Offline",
        de: "Offline",
        pkutools: 1,
        pkumanager: 2,
        pherechner: 2
      },
      {
        icon: "mdi-sync",
        en: "Sync",
        de: "Sync",
        pkutools: 1,
        pkumanager: 2,
        pherechner: 3
      },
      {
        icon: "mdi-export",
        en: "Export",
        de: "Export",
        pkutools: 1,
        pkumanager: 3,
        pherechner: 3
      },
      {
        icon: "mdi-translate",
        en: "English",
        de: "Englisch",
        pkutools: 1,
        pkumanager: 1,
        pherechner: 3
      },
      {
        icon: "mdi-translate",
        en: "German",
        de: "Deutsch",
        pkutools: 1,
        pkumanager: 2,
        pherechner: 1
      },
      {
        icon: "mdi-brightness-4",
        en: "Dark Design",
        de: "Dunkles Design",
        pkutools: 1,
        pkumanager: 3,
        pherechner: 3
      }
    ]
  })
};
</script>

<style lang="scss" scoped>
.theme--light.v-data-table {
  background-color: #fafafa;
}

.feature-name {
  white-space: nowrap;
}

.tr-read-only:hover {
  background-color: inherit !important;
}
</style>
