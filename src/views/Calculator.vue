<template>
  <div>
    <h2>Calculator</h2>

    <label for="phe">Phe per 100g (in mg)</label>
    <v-text-field id="phe" v-model="phe" type="number"></v-text-field>

    <label for="weight">Weight (in g)</label>
    <v-text-field id="weight" v-model="weight" type="number"></v-text-field>

    <p>= {{ (weight * phe) / 100 }} mg Phe</p>
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
