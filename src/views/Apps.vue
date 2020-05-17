<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" lg="9">
        <h2 class="headline">{{ $t("apps.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card max-width="400">
          <v-img src="../assets/pherechner-app.png" alt="Phe Rechner App"></v-img>
          <v-card-title>Phe Rechner</v-card-title>

          <v-card-text>
            <div>{{ $t("apps.phe-rechner") }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn text href="https://pherechner.de/" target="_blank">{{ $t("apps.link") }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card max-width="400">
          <v-img src="../assets/pkumanager-app.png" alt="PKU Manager App"></v-img>
          <v-card-title>PKU Manager</v-card-title>

          <v-card-text>
            <div>{{ $t("apps.pku-manager") }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn text href="https://pkumanager.com/" target="_blank">{{ $t("apps.link") }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card max-width="400">
          <v-img src="../assets/simple-nutrition-calculator-app.png" alt="Simple Nutrition Calculator App"></v-img>
          <v-card-title>Simple Nutrition Calculator</v-card-title>

          <v-card-text>
            <div>{{ $t("apps.simple-nutrition-calculator") }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn text href="https://simple-nutrition-calculator.com/" target="_blank">{{ $t("apps.link") }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
