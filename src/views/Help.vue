<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline mt-3">{{ $t("help.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-expansion-panels v-model="panel" multiple class="mb-8">
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold">{{ $t("help.install") }}</v-expansion-panel-header>

            <v-expansion-panel-content>
              <p>{{ $t("help.install-p1") }}</p>
              <p>
                <span class="font-weight-bold">{{ $t("help.install-p2") }}</span>
                <a href="https://play.google.com/store/apps/details?id=com.pkutools.twa" target="_blank">
                  <img
                    alt="Get it on Google Play"
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    class="gplay-btn"
                  />
                </a>
              </p>

              <p>
                <span class="font-weight-bold">iOS:</span>
                {{ $t("help.install-p3") }}
              </p>
              <p>
                <span class="font-weight-bold">Desktop:</span>
                {{ $t("help.install-p4") }}
              </p>
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
              <p>{{ $t("help.roadmap-p1") }}</p>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>{{ $t("help.support") }}</v-expansion-panel-header>

            <v-expansion-panel-content>
              <p>{{ $t("help.support-p1") }}</p>

              <a href="https://ko-fi.com/andrereus" target="_blank">
                <v-img src="../assets/kofi.png" alt="Support me" max-width="200" class="mb-4"></v-img>
              </a>

              <p class="mt-2">{{ $t("help.support-p2") }}</p>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>{{ $t("help.translate") }}</v-expansion-panel-header>

            <v-expansion-panel-content>
              <p>{{ $t("help.translate-p1") }}</p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-btn
          v-if="this.$i18n.locale === 'en'"
          depressed
          rounded
          href="https://youtu.be/lmiejnEFccY"
          target="_blank"
          class="mr-3 mb-3"
        >
          <v-icon left>{{ mdiPlayCircleOutline }}</v-icon>
          {{ $t("home.video") }}
        </v-btn>

        <v-btn
          v-if="this.$i18n.locale === 'de'"
          depressed
          rounded
          href="https://youtu.be/5_-F4tM8_RQ"
          target="_blank"
          class="mr-3 mb-3"
        >
          <v-icon left>{{ mdiPlayCircleOutline }}</v-icon>
          {{ $t("home.video") }}
        </v-btn>

        <v-btn depressed rounded href="https://youtu.be/ITfvSliHwc0" target="_blank" class="mr-3 mb-3">
          <v-icon left>{{ mdiPlay }}</v-icon>
          {{ $t("home.mobile-video") }}
        </v-btn>

        <!-- prettier-ignore -->
        <p class="mt-6"><v-icon>{{ mdiAt }}</v-icon> {{ $t("help.contact-me") }} {{ part1 }}@<span class="hidden">null</span>{{ part2 }}.{{ part3 }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiPlayCircleOutline, mdiPlay, mdiAt, mdiDownload } from "@mdi/js";

export default {
  metaInfo() {
    return {
      title: this.$t("help.title"),
      meta: [{ name: "description", content: this.$t("help.description") }]
    };
  },
  data: () => ({
    mdiPlayCircleOutline,
    mdiPlay,
    mdiAt,
    mdiDownload,
    panel: [0],
    part1: "heypku",
    part2: "gmail",
    part3: "com"
  })
};
</script>

<style lang="scss" scoped>
.v-btn {
  text-transform: none;
}

.gplay-btn {
  max-width: 100px;
  vertical-align: middle;
}

.contact-form {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.9);
}

.hidden {
  display: none;
}
</style>
