<template>
  <div>
    <h2 class="headline mt-2 mb-4">About</h2>

    <v-divider class="mb-6"></v-divider>

    <p>Tools and apps for phenylketonuria.</p>
    <p>Author: André Reus</p>

    <!-- prettier-ignore -->
    <p>Email: {{ part1 }}@<span class="hidden">null</span>{{ part2 }}.{{ part3 }}</p>

    <p>Food source: Common food from the USDA National Nutrient Database</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    part1: "heypku",
    part2: "gmail",
    part3: "com"
  })
};
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
</style>
