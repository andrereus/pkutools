<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline mt-1">{{ $t("help.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-btn
          v-if="this.$i18n.locale === 'en'"
          depressed
          rounded
          href="https://youtu.be/lmiejnEFccY"
          target="_blank"
          color="primary"
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
          color="primary"
          class="mr-3 mb-3"
        >
          <v-icon left>{{ mdiPlayCircleOutline }}</v-icon>
          {{ $t("home.video") }}
        </v-btn>

        <v-btn text rounded href="https://youtu.be/ITfvSliHwc0" target="_blank" class="mr-3 mb-3">
          <v-icon left>{{ mdiPlay }}</v-icon>
          {{ $t("home.mobile-video") }}
        </v-btn>

        <h2 class="headline my-6">{{ $t("help.faq") }}</h2>

        <v-expansion-panels v-model="panel">
          <v-expansion-panel>
            <v-expansion-panel-header>{{ $t("help.install") }}</v-expansion-panel-header>

            <v-expansion-panel-content>
              <p>{{ $t("help.install-p1") }}</p>
              <p>
                {{ $t("help.install-p2") }}
                <a href="https://play.google.com/store/apps/details?id=com.pkutools.twa" target="_blank">
                  <img
                    alt="Get it on Google Play"
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    class="gplay-btn mb-1"
                  />
                </a>
              </p>

              <p>{{ $t("help.install-p3") }}</p>
              <p>{{ $t("help.install-p4") }}</p>
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

              <a href="https://www.buymeacoffee.com/andrereus" target="_blank">
                <img
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-white.png"
                  alt="Buy Me A Coffee"
                  style="height: 60px !important; width: 217px !important"
                />
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

        <h2 class="headline mt-9 mb-3">{{ $t("help.contact") }}</h2>

        <iframe
          src="https://tally.so/embed/mRW5v3?hideTitle=1&alignLeft=1&transparentBackground=1"
          width="100%"
          height="400"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          title="Contact"
          class="contact-form"
        ></iframe>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiPlayCircleOutline, mdiPlay } from "@mdi/js";

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
    panel: 0
  })
};
</script>

<style lang="scss" scoped>
.v-btn {
  text-transform: none;
}

.gplay-btn {
  max-width: 125px;
  vertical-align: middle;
}

.contact-form {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
