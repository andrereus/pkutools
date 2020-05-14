<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("about.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <p>{{ $t("app.description") }}</p>
        <p>Author: André Reus</p>

        <!-- prettier-ignore -->
        <p>Email: {{ part1 }}@<span class="hidden">null</span>{{ part2 }}.{{ part3 }}</p>

        <p>Food source: Common food from the USDA National Nutrient Database</p>
      </v-col>
    </v-row>
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
