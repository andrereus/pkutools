<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("protein-calculator.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-text-field
          filled
          :label="$t('protein-calculator.protein')"
          v-model.number="protein"
          type="number"
        ></v-text-field>

        <p class="mt-n2 mb-5">~ {{ protein * 50 }} mg {{ $t("protein-calculator.phe") }}</p>

        <v-text-field
          filled
          :label="$t('protein-calculator.weight')"
          v-model.number="weight"
          type="number"
        ></v-text-field>

        <p class="title font-weight-regular mt-n2">= {{ (weight * (protein * 50)) / 100 }} mg Phe</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    protein: null,
    weight: null
  })
};
</script>
