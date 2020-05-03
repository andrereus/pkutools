<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">Home</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <p>Tools and apps for phenylketonuria.</p>

        <v-btn depressed to="/phe-calculator" color="primary" class="mr-3 mt-3">Phe Calculator</v-btn>
        <v-btn depressed to="/phe-search" color="primary" class="mr-3 mt-3">Phe Search</v-btn>
        <v-btn depressed to="/amino-counter" color="primary" class="mr-3 mt-3">Amino Counter</v-btn>
        <v-btn disabled class="mt-3">More in progress</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
