<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("help.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline mb-6">{{ $t("help.video") }}</h2>

        <v-btn
          v-if="this.$i18n.locale === 'en'"
          depressed
          href="https://youtu.be/lmiejnEFccY"
          target="_blank"
          color="primary"
          class="mr-3 mb-3"
        >
          <v-icon left>mdi-youtube</v-icon>
          {{ $t("home.video") }}
        </v-btn>

        <v-btn
          v-if="this.$i18n.locale === 'de'"
          depressed
          href="https://youtu.be/5_-F4tM8_RQ"
          target="_blank"
          color="primary"
          class="mr-3 mb-3"
        >
          <v-icon left>mdi-youtube</v-icon>
          {{ $t("home.video") }}
        </v-btn>

        <v-btn text href="https://youtu.be/ITfvSliHwc0" target="_blank" class="mr-3 mb-3">
          {{ $t("home.mobile-video") }}
        </v-btn>

        <h2 class="headline my-6">{{ $t("help.faq") }}</h2>

        <h3>{{ $t("help.install") }}</h3>
        <p>{{ $t("help.install-p1") }}</p>
        <p>{{ $t("help.install-p2") }}</p>

        <h3>{{ $t("help.sign-in") }}</h3>
        <p>{{ $t("help.sign-in-p1") }}</p>
        <p>{{ $t("help.sign-in-p2") }}</p>

        <h3>{{ $t("help.support") }}</h3>
        <p>
          {{ $t("help.support-p1") }}
          <a href="https://www.buymeacoffee.com/andrereus" target="_blank">https://www.buymeacoffee.com/andrereus</a>
          😉
        </p>

        <h2 class="headline my-6">{{ $t("help.contact") }}</h2>

        <!-- prettier-ignore -->
        <p>{{ $t("help.email") }}: {{ part1 }}@<span class="hidden">null</span>{{ part2 }}.{{ part3 }}</p>
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
