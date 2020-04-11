<template>
  <div>
    <b-jumbotron class="mt-3">
      <template v-slot:header>PKU Tools</template>
      <template v-slot:lead>Tools and apps for phenylketonuria</template>
    </b-jumbotron>

    <h2>Apps</h2>

    <hr class="my-4" />

    <b-card-group deck>
      <b-card
        title="Phe Rechner"
        img-src="../assets/pherechner-app.png"
        img-alt="Phe Rechner App"
        img-top
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          German PKU app that combines calculator, pen, paper and nutrition table.
        </b-card-text>

        <b-button href="https://pherechner.de/" target="_blank" variant="primary">
          Website
          <b-icon icon="box-arrow-up-right"></b-icon>
        </b-button>
      </b-card>

      <b-card
        title="PKU Manager"
        img-src="../assets/pkumanager-app.png"
        img-alt="PKU Manager App"
        img-top
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          English PKU app for searching, calculating and tracking food.
        </b-card-text>

        <b-button href="https://pkumanager.com/" target="_blank" variant="primary">
          Website
          <b-icon icon="box-arrow-up-right"></b-icon>
        </b-button>
      </b-card>

      <b-card
        title="Simple Nutrition Calculator"
        img-src="../assets/simple-nutrition-calculator-app.png"
        img-alt="Simple Nutrition Calculator App"
        img-top
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          General purpose app for calculating with any nutrient.
        </b-card-text>

        <b-button href="https://simple-nutrition-calculator.com/" target="_blank" variant="primary">
          Website
          <b-icon icon="box-arrow-up-right"></b-icon>
        </b-button>
      </b-card>
    </b-card-group>
  </div>
</template>
