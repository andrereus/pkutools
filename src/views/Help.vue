<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("help.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-btn
          v-if="this.$i18n.locale === 'en'"
          depressed
          href="https://youtu.be/lmiejnEFccY"
          target="_blank"
          color="primary"
          class="mr-3 mb-3"
        >
          <v-icon left>mdi-play-circle-outline</v-icon>
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
          <v-icon left>mdi-play-circle-outline</v-icon>
          {{ $t("home.video") }}
        </v-btn>

        <v-btn text href="https://youtu.be/ITfvSliHwc0" target="_blank" class="mr-3 mb-3">
          <v-icon left>mdi-play</v-icon>
          {{ $t("home.mobile-video") }}
        </v-btn>

        <h2 class="headline my-6">{{ $t("help.faq") }}</h2>

        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>{{ $t("help.install") }}</v-expansion-panel-header>

            <v-expansion-panel-content>
              <p>{{ $t("help.install-p1") }}</p>

              <a href="https://play.google.com/store/apps/details?id=com.pkutools.twa" target="_blank">
                <img
                  alt="Get it on Google Play"
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  class="gplay-btn ml-n2 mt-n1 mb-3"
                />
              </a>

              <p>{{ $t("help.install-p2") }}</p>
              <p>{{ $t("help.install-p3") }}</p>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>{{ $t("help.sign-in") }}</v-expansion-panel-header>

            <v-expansion-panel-content>
              <p>{{ $t("help.sign-in-p1") }}</p>
              <p>{{ $t("help.sign-in-p2") }}</p>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>{{ $t("help.roadmap") }}</v-expansion-panel-header>

            <v-expansion-panel-content>
              <p>
                {{ $t("help.roadmap-p1") }}
                <a href="https://trello.com/b/jJiZ0tJm" target="_blank">https://trello.com/b/jJiZ0tJm</a>
              </p>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>{{ $t("help.support") }}</v-expansion-panel-header>

            <v-expansion-panel-content>
              <p>
                {{ $t("help.support-p1") }}
                <a href="https://www.buymeacoffee.com/andrereus" target="_blank">
                  https://www.buymeacoffee.com/andrereus
                </a>
                😉
              </p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <h2 class="headline my-6">{{ $t("help.more") }}</h2>

        <!-- prettier-ignore -->
        <p><v-icon left>mdi-email</v-icon>{{ part1 }}@<span class="hidden">null</span>{{ part2 }}.{{ part3 }}</p>

        <v-btn
          v-if="this.$i18n.locale === 'en'"
          depressed
          outlined
          href="https://andre.getform.com/q0ko3"
          color="primary"
          class="mr-3 mb-3"
        >
          <v-icon left>mdi-comment-quote-outline</v-icon>
          {{ $t("help.feedback") }}
        </v-btn>

        <v-btn
          v-if="this.$i18n.locale === 'de'"
          depressed
          outlined
          href="https://andre.getform.com/69zrd"
          color="primary"
          class="mr-3 mb-3"
        >
          <v-icon left>mdi-comment-quote-outline</v-icon>
          {{ $t("help.feedback") }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$t("help.title"),
      meta: [{ name: "description", content: this.$t("help.description") }]
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

.v-btn {
  text-transform: none;
}

.gplay-btn {
  max-width: 150px;
  vertical-align: middle;
}
</style>
