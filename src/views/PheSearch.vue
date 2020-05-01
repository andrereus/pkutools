<template>
  <div>
    <h2 class="headline mt-2 mb-4">Phe Search</h2>

    <v-divider class="mb-3"></v-divider>

    <v-row>
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" hide-details outlined></v-text-field>

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
