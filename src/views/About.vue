<template>
  <div>
    <h2 class="my-4">Support</h2>

    <hr class="mb-4" />

    <p>Updates, Roadmap, Bugs, FAQs and Contact:</p>
    <b-button href="https://www.producthero.app/89/pku-tools" target="_blank" variant="primary">
      Support Center
      <b-icon icon="box-arrow-up-right"></b-icon>
    </b-button>

    <h2 class="mt-5 mb-4">About</h2>

    <hr class="mb-4" />

    <p>Tools and apps for phenylketonuria</p>
    <p>Author: André Reus</p>
    <!-- prettier-ignore -->
    <p>E-Mail: {{ part1 }}@<span class="hidden">null</span>{{ part2 }}.{{ part3 }}</p>
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
