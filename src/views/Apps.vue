<template>
  <div>
    <h2 class="headline mt-2 mb-3">Apps</h2>

    <v-container fluid>
      <v-row dense>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card max-width="400">
            <v-img src="../assets/pherechner-app.png" alt="Phe Rechner App"></v-img>
            <v-card-title>Phe Rechner</v-card-title>

            <v-card-text>
              <div>German PKU app that combines calculator, pen, paper and nutrition table (~ 2017).</div>
            </v-card-text>

            <v-card-actions>
              <v-btn text href="https://pherechner.de/" target="_blank">Website</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card max-width="400">
            <v-img src="../assets/pkumanager-app.png" alt="PKU Manager App"></v-img>
            <v-card-title>PKU Manager</v-card-title>

            <v-card-text>
              <div>English PKU app for searching, calculating and tracking food (~ 2018).</div>
            </v-card-text>

            <v-card-actions>
              <v-btn text href="https://pkumanager.com/" target="_blank">Website</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card max-width="400">
            <v-img src="../assets/simple-nutrition-calculator-app.png" alt="Simple Nutrition Calculator App"></v-img>
            <v-card-title>Simple Nutrition Calculator</v-card-title>

            <v-card-text>
              <div>General purpose app for calculating with any nutrient (~ 2019).</div>
            </v-card-text>

            <v-card-actions>
              <v-btn text href="https://simple-nutrition-calculator.com/" target="_blank">Website</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
