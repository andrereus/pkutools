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

        <h3>{{ $t("help.install") }}</h3>
        <p>{{ $t("help.install-p1") }}</p>

        <pwa-install :installbuttontext="$t('app.install-pwa')" usecustom></pwa-install>

        <v-btn depressed outlined color="primary" @click="refreshPage" class="mr-3 mb-3">
          <v-icon left>mdi-refresh</v-icon>
          {{ $t("app.refresh") }}
        </v-btn>

        <v-btn depressed color="primary" @click="installPWA" class="mr-3 mb-3">
          <v-icon left>mdi-download</v-icon>
          {{ $t("app.install") }}
        </v-btn>

        <span class="mr-3">{{ $t("help.install-p2") }}</span>

        <a
          href="https://play.google.com/store/apps/details?id=com.pkutools.twa&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
        >
          <img
            alt="Get it on Google Play"
            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            class="gplay-btn ml-n2 mb-3"
          />
        </a>

        <p>{{ $t("help.install-p3") }}</p>

        <h3>{{ $t("help.sign-in") }}</h3>
        <p>{{ $t("help.sign-in-p1") }}</p>
        <p>{{ $t("help.sign-in-p2") }}</p>

        <h3>{{ $t("help.roadmap") }}</h3>
        <p>
          {{ $t("help.roadmap-p1") }}
          <a href="https://trello.com/b/jJiZ0tJm" target="_blank">https://trello.com/b/jJiZ0tJm</a>
        </p>

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
import "@pwabuilder/pwainstall";

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
  }),
  methods: {
    refreshPage() {
      location.reload();
    },
    installPWA() {
      document.querySelector("pwa-install").openPrompt();
    }
  }
};
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}

.v-btn {
  text-transform: none;
}

//pwa-install::part(openButton) {
//  background: #3498db;
//  border-radius: 4px;
//  padding: 4px 16px;
//}

.gplay-btn {
  max-width: 150px;
  vertical-align: middle;
}
</style>
