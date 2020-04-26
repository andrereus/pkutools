<template>
  <div>
    <h2>Supplement Counter</h2>

    <span>I took {{ count }} of {{ max }} supplements today</span>
    <v-progress-linear :value="(count * 100) / 3"></v-progress-linear>

    <v-btn v-on:click="count++">Take supplement</v-btn>
    <v-btn v-on:click="count = 0">Reset</v-btn>

    <br />
    <br />

    <label for="amount-input">Amount of supplements per day</label>
    <v-text-field id="amount-input" v-model="max" type="number"></v-text-field>
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
    if (localStorage.supplementCounterCount) {
      this.count = localStorage.supplementCounterCount;
    }
    if (localStorage.supplementCounterMax) {
      this.max = localStorage.supplementCounterMax;
    }
  },
  watch: {
    count(newCount) {
      localStorage.supplementCounterCount = newCount;
    },
    max(newMax) {
      localStorage.supplementCounterMax = newMax;
    }
  }
};
</script>
