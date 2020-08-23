<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("phe-search.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-alert text color="info" v-if="this.$i18n.locale === 'de'">
          Übersetzt aus dem Englischen mit Google Translate. Optimierungen folgen.
        </v-alert>

        <!-- Text inputs need keyup on mobile -->
        <v-text-field
          :value="search"
          @keyup="search = $event.target.value"
          append-icon="mdi-magnify"
          :label="$t('phe-search.search')"
          filled
          single-line
          @click:append="closeKeys"
          ref="foodSearch"
        ></v-text-field>

        <v-data-table
          :headers="headers"
          :items="loadedFood"
          :search="search"
          sort-by="name"
          disable-pagination
          hide-default-footer
          mobile-breakpoint="0"
        ></v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import enFood from "../components/data/en-food.json";
import deFood from "../components/data/de-food.json";

export default {
  data: () => ({
    search: null,
    headers: [
      {
        text: "Food Name",
        align: "start",
        value: "name"
      },
      { text: "Phe per 100g (in mg)", value: "phe" }
    ],
    enFood,
    deFood
  }),
  methods: {
    closeKeys() {
      this.$refs.foodSearch.blur();
    }
  },
  computed: {
    loadedFood() {
      if (this.$i18n.locale === "de") {
        return this.deFood;
      } else {
        return this.enFood;
      }
    }
  }
};
</script>
