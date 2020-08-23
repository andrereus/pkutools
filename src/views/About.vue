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
        <p>{{ $t("app.install") }}</p>

        <p>
          André Reus
          <br />
          Obere Gasse 38
          <br />
          71120 Grafenau
        </p>

        <!-- prettier-ignore -->
        <p>{{ $t("about.email") }}: {{ part1 }}@<span class="hidden">null</span>{{ part2 }}.{{ part3 }}</p>

        <p>{{ $t("about.sources") }}</p>
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
