<template>
  <div>
    <b-jumbotron class="mt-3">
      <template v-slot:header>About</template>

      <hr class="my-4" />

      <!-- prettier-ignore -->
      <p>Contact: {{ part1 }}@<span class="hidden">null</span>{{ part2 }}.{{ part3 }}</p>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      part1: "heypku",
      part2: "gmail",
      part3: "com"
    };
  }
};
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
</style>
