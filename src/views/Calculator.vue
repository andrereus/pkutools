<template>
  <div>
    <h2 class="my-4">Calculator</h2>

    <label for="phe">Phe per 100g (in mg)</label>
    <b-form-input id="phe" v-model="phe" type="number" class="mb-3"></b-form-input>

    <label for="weight">Weight (in g)</label>
    <b-form-input id="weight" v-model="weight" type="number" class="mb-3"></b-form-input>

    <p class="font-weight-bold">= {{ (weight * phe) / 100 }} mg Phe</p>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      phe: null,
      weight: null
    };
  }
};
</script>
