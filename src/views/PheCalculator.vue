<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("phe-calculator.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-text-field filled :label="$t('phe-calculator.phe')" v-model.number="phe" type="number"></v-text-field>
        <v-text-field filled :label="$t('phe-calculator.weight')" v-model.number="weight" type="number"></v-text-field>

        <p class="title font-weight-regular mt-n2">= {{ (weight * phe) / 100 }} mg Phe</p>
      </v-col>
    </v-row>
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
