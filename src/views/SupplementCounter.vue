<template>
  <div>
    <h2 class="my-4">Supplement Counter</h2>

    <b-row class="mb-3">
      <b-col>
        <span>I took {{ count }} of {{ max }} supplement{{ max === 1 ? "" : "s" }} today</span>

        <b-button v-b-modal.amount variant="link" size="sm" class="float-right">
          <b-icon icon="gear"></b-icon>
          Amount
        </b-button>

        <b-modal id="amount" title="Amount" ok-only hide-header-close>
          <label for="amount-input">Amount of supplements per day</label>
          <b-form-input id="amount-input" v-model="max" type="number"></b-form-input>
        </b-modal>
      </b-col>
    </b-row>

    <b-progress :value="count" :max="max" class="mb-4"></b-progress>

    <b-row>
      <b-col>
        <b-button v-on:click="count++" variant="success" size="sm">
          <b-icon icon="plus"></b-icon>
          Take supplement
        </b-button>

        <b-button v-on:click="count = 0" variant="outline-danger" size="sm" class="float-right">
          <b-icon icon="trash"></b-icon>
          Reset
        </b-button>
      </b-col>
    </b-row>
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
