<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("phe-search.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <!-- Text inputs need keyup on mobile -->
        <v-text-field
          :value="search"
          @keyup="search = $event.target.value"
          append-icon="mdi-magnify"
          :label="$t('phe-search.search')"
          filled
          single-line
        ></v-text-field>

        <v-data-table
          :headers="headers"
          :items="food"
          :search="search"
          disable-pagination
          hide-default-footer
          mobile-breakpoint="0"
        ></v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import food from "../components/data/common-food.json";

export default {
  data: () => ({
    search: "",
    headers: [
      {
        text: "Food Name",
        align: "start",
        value: "name"
      },
      { text: "Phe per 100g (in mg)", value: "phe" }
    ],
    food
  })
};
</script>
