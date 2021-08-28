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
            <v-icon v-if="item.pkutools === 1" color="success">{{ mdiCheckBold }}</v-icon>
            <v-icon v-if="item.pkutools === 2">{{ mdiCircleHalfFull }}</v-icon>
            <v-icon v-if="item.pkutools === 3">{{ mdiCloseCircleOutline }}</v-icon>
          </td>
          <td v-if="!home">
            <v-icon v-if="item.pkumanager === 1" color="success">{{ mdiCheckBold }}</v-icon>
            <v-icon v-if="item.pkumanager === 2">{{ mdiCircleHalfFull }}</v-icon>
            <v-icon v-if="item.pkumanager === 3">{{ mdiCloseCircleOutline }}</v-icon>
          </td>
          <td v-if="!home">
            <v-icon v-if="item.pherechner === 1" color="success">{{ mdiCheckBold }}</v-icon>
            <v-icon v-if="item.pherechner === 2">{{ mdiCircleHalfFull }}</v-icon>
            <v-icon v-if="item.pherechner === 3">{{ mdiCloseCircleOutline }}</v-icon>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import {
  mdiMagnify,
  mdiCalculator,
  mdiCalculatorVariant,
  mdiFoodApple,
  mdiTextBox,
  mdiBook,
  mdiCupWater,
  mdiWeb,
  mdiAndroid,
  mdiApple,
  mdiMicrosoftWindows,
  mdiDesktopMac,
  mdiCloudOffOutline,
  mdiSync,
  mdiExport,
  mdiTranslate,
  mdiBrightness4,
  mdiFoodAppleOutline,
  mdiCheckBold,
  mdiCircleHalfFull,
  mdiCloseCircleOutline
} from "@mdi/js";

export default {
  name: "FeatureComparison",
  props: {
    home: Boolean
  },
  data: () => ({
    mdiCheckBold,
    mdiCircleHalfFull,
    mdiCloseCircleOutline,
    features: [
      {
        icon: mdiMagnify,
        en: "Phe Search",
        de: "Phe Suche",
        pkutools: 1,
        pkumanager: 1,
        pherechner: 1
      },
      {
        icon: mdiCalculator,
        en: "Phe Calculator",
        de: "Phe Rechner",
        pkutools: 1,
        pkumanager: 1,
        pherechner: 1
      },
      {
        icon: mdiCalculatorVariant,
        en: "Protein Calculator",
        de: "Eiweiß Rechner",
        pkutools: 1,
        pkumanager: 1,
        pherechner: 1
      },
      {
        icon: mdiFoodApple,
        en: "Own Food",
        de: "Eigene Lebensmittel",
        pkutools: 1,
        pkumanager: 2,
        pherechner: 1
      },
      {
        icon: mdiTextBox,
        en: "Phe Log",
        de: "Phe Protokoll",
        pkutools: 1,
        pkumanager: 1,
        pherechner: 1
      },
      {
        icon: mdiBook,
        en: "Phe Diary",
        de: "Phe Tagebuch",
        pkutools: 1,
        pkumanager: 1,
        pherechner: 1
      },
      {
        icon: mdiCupWater,
        en: "Amino Counter",
        de: "Amino Zähler",
        pkutools: 1,
        pkumanager: 3,
        pherechner: 3
      },
      {
        icon: mdiWeb,
        en: "Web App",
        de: "Web App",
        pkutools: 1,
        pkumanager: 1,
        pherechner: 1
      },
      {
        icon: mdiAndroid,
        en: "Android",
        de: "Android",
        pkutools: 1,
        pkumanager: 1,
        pherechner: 1
      },
      {
        icon: mdiApple,
        en: "iOS",
        de: "iOS",
        pkutools: 1,
        pkumanager: 3,
        pherechner: 3
      },
      {
        icon: mdiMicrosoftWindows,
        en: "Windows",
        de: "Windows",
        pkutools: 1,
        pkumanager: 3,
        pherechner: 3
      },
      {
        icon: mdiDesktopMac,
        en: "macOS",
        de: "macOS",
        pkutools: 1,
        pkumanager: 3,
        pherechner: 3
      },
      {
        icon: mdiCloudOffOutline,
        en: "Offline capable",
        de: "Offlinefähig",
        pkutools: 1,
        pkumanager: 2,
        pherechner: 2
      },
      {
        icon: mdiSync,
        en: "Sync",
        de: "Sync",
        pkutools: 1,
        pkumanager: 2,
        pherechner: 3
      },
      {
        icon: mdiExport,
        en: "Export",
        de: "Export",
        pkutools: 1,
        pkumanager: 3,
        pherechner: 3
      },
      {
        icon: mdiTranslate,
        en: "English",
        de: "Englisch",
        pkutools: 1,
        pkumanager: 1,
        pherechner: 3
      },
      {
        icon: mdiTranslate,
        en: "German",
        de: "Deutsch",
        pkutools: 1,
        pkumanager: 2,
        pherechner: 1
      },
      {
        icon: mdiBrightness4,
        en: "Dark Design",
        de: "Dunkles Design",
        pkutools: 1,
        pkumanager: 3,
        pherechner: 3
      },
      {
        icon: mdiFoodAppleOutline,
        en: "Food Icons",
        de: "Lebensmittel Icons",
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
