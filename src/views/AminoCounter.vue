<template>
  <div>
    <h2 class="headline mt-2 mb-6">Amino Counter</h2>

    <v-container fluid>
      <v-row dense>
        <v-col cols="12" sm="10" md="8" lg="6" xl="4">
          <v-progress-linear :value="(count * 100) / 3" height="35" class="white--text">
            I took {{ count }} of {{ max }} supplements today
          </v-progress-linear>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row dense>
        <v-col cols="12" sm="5" md="4" lg="3" xl="2">
          <v-btn depressed @click="count++" color="primary" class="mr-3 mt-3">Take supplement</v-btn>
          <v-btn depressed @click="count = 0" class="mt-3">Reset</v-btn>
        </v-col>

        <v-col cols="12" sm="5" md="4" lg="3" xl="2">
          <v-text-field
            outlined
            dense
            label="Amount of supplements per day"
            v-model="max"
            type="number"
            class="mt-3"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      count: 0,
      max: 3
    };
  },
  mounted() {
    if (localStorage.aminoCounterCount) {
      this.count = localStorage.aminoCounterCount;
    }
    if (localStorage.aminoCounterMax) {
      this.max = localStorage.aminoCounterMax;
    }
  },
  watch: {
    count(newCount) {
      localStorage.aminoCounterCount = newCount;
    },
    max(newMax) {
      localStorage.aminoCounterMax = newMax;
    }
  }
};
</script>
