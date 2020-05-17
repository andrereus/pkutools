<template>
  <div>
    <v-row justify="center" class="mb-1">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("amino-counter.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-text-field outlined :label="$t('amino-counter.amount')" v-model.number="max" type="number"></v-text-field>

        <v-progress-linear :value="(count * 100) / max" height="40" class="white--text mb-4">
          {{ $t("amino-counter.progress", { count, max }) }}
        </v-progress-linear>

        <v-btn depressed @click="count++" color="primary" class="mr-3 mt-3">{{ $t("amino-counter.take") }}</v-btn>
        <v-btn depressed @click="count = 0" class="mt-3">{{ $t("amino-counter.reset") }}</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    count: 0,
    max: 3
  }),
  mounted() {
    if (localStorage.aminoCounterCount) {
      this.count = JSON.parse(localStorage.aminoCounterCount);
    }
    if (localStorage.aminoCounterMax) {
      this.max = JSON.parse(localStorage.aminoCounterMax);
    }
  },
  watch: {
    count(newCount) {
      localStorage.aminoCounterCount = JSON.stringify(newCount);
    },
    max(newMax) {
      localStorage.aminoCounterMax = JSON.stringify(newMax);
    }
  }
};
</script>
