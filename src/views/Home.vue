<template>
  <div>
    <h2 class="my-4">Tools</h2>

    <hr class="mb-4" />

    <b-button to="/supplement-counter" variant="primary" class="mr-2">Supplement Counter</b-button>
    <b-button to="/calculator" variant="primary" class="mr-2">Calculator</b-button>

    <h2 class="mt-5 mb-4">Apps</h2>

    <hr class="mb-4" />

    <b-card-group deck>
      <b-card img-src="../assets/pherechner-app.png" img-alt="Phe Rechner App" img-top>
        <b-card-title>Phe Rechner</b-card-title>
        <b-card-text>German PKU app that combines calculator, pen, paper and nutrition table (~ 2017).</b-card-text>

        <b-button href="https://pherechner.de/" target="_blank" variant="primary">
          Website
          <b-icon icon="box-arrow-up-right"></b-icon>
        </b-button>
      </b-card>

      <b-card img-src="../assets/pkumanager-app.png" img-alt="PKU Manager App" img-top>
        <b-card-title>PKU Manager</b-card-title>
        <b-card-text>English PKU app for searching, calculating and tracking food (~ 2018).</b-card-text>

        <b-button href="https://pkumanager.com/" target="_blank" variant="primary">
          Website
          <b-icon icon="box-arrow-up-right"></b-icon>
        </b-button>
      </b-card>

      <b-card img-src="../assets/simple-nutrition-calculator-app.png" img-alt="Simple Nutrition Calculator App" img-top>
        <b-card-title>Simple Nutrition Calculator</b-card-title>
        <b-card-text>General purpose app for calculating with any nutrient (~ 2019).</b-card-text>

        <b-button href="https://simple-nutrition-calculator.com/" target="_blank" variant="primary">
          Website
          <b-icon icon="box-arrow-up-right"></b-icon>
        </b-button>
      </b-card>
    </b-card-group>
  </div>
</template>
