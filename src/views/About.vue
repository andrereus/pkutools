<template>
  <div>
    <h2 class="headline mt-2 mb-6">About</h2>

    <p>Tools and apps for phenylketonuria.</p>
    <p>Author: André Reus</p>

    <!-- prettier-ignore -->
    <p>Email: {{ part1 }}@<span class="hidden">null</span>{{ part2 }}.{{ part3 }}</p>
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
