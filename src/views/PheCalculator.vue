<template>
  <div>
    <h2 class="headline mt-2 mb-4">Phe Calculator</h2>

    <v-divider class="mb-3"></v-divider>

    <v-row>
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-text-field outlined label="Phe per 100g (in mg)" v-model.number="phe" type="number"></v-text-field>
        <v-text-field outlined label="Weight (in g)" v-model.number="weight" type="number"></v-text-field>
      </v-col>
    </v-row>

    <p class="title font-weight-light mt-n5">= {{ (weight * phe) / 100 }} mg Phe</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    phe: null,
    weight: null
  })
};
</script>
