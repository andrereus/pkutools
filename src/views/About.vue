<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline mt-1">{{ $t("about.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
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

        <p class="mt-6 mb-8 text--secondary">
          {{ $t("home.support-me") }}
          <a href="https://ko-fi.com/andrereus" target="_blank">
            <v-img
              v-if="!$vuetify.theme.dark"
              src="../assets/kofi.png"
              alt="Support me"
              max-width="200"
              class="mt-2"
            ></v-img>
            <v-img
              v-if="$vuetify.theme.dark"
              src="../assets/kofi-dark.png"
              alt="Support me"
              max-width="200"
              class="mt-2"
            ></v-img>
          </a>
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$t("about.title"),
      meta: [{ name: "description", content: this.$t("about.description") }]
    };
  },
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
