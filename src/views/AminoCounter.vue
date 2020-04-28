<template>
  <div>
    <h2 class="headline mt-2 mb-4">Amino Counter</h2>

    <v-divider class="mb-3"></v-divider>

    <v-row>
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-text-field outlined label="Amount of supplements per day" v-model.number="max" type="number"></v-text-field>

        <v-progress-linear :value="(count * 100) / max" height="40" class="white--text">
          I took {{ count }} of {{ max }} supplements today
        </v-progress-linear>
      </v-col>
    </v-row>

    <v-btn depressed @click="count++" color="primary" class="mr-3 mt-3">Take supplement</v-btn>
    <v-btn depressed @click="count = 0" class="mt-3">Reset</v-btn>
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
