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

        <v-img src="../assets/the-munchies.png" alt="Food Illustration" class="mt-6 mb-3"></v-img>

        <v-btn depressed to="/phe-calculator" color="primary" class="mr-3 mt-3">{{ $t("phe-calculator.title") }}</v-btn>
        <v-btn depressed to="/phe-search" color="primary" class="mr-3 mt-3">{{ $t("phe-search.title") }}</v-btn>
        <v-btn depressed to="/phe-diary" color="primary" class="mr-3 mt-3">{{ $t("phe-diary.title") }}</v-btn>
        <v-btn depressed to="/amino-counter" color="primary" class="mr-3 mt-3">{{ $t("amino-counter.title") }}</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
