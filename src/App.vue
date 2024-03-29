<template>
  <v-app>
    <v-navigation-drawer app clipped v-model="drawer" floating class="nav-layout">
      <v-list-item v-if="$vuetify.breakpoint.mdAndDown">
        <v-list-item-content class="flex-nowrap mt-2">
          <v-img src="./assets/pkutools-logo.png" alt="PKU Tools Logo" max-width="25" class="ml-2 mr-4 mb-1"></v-img>
          <v-list-item-title>PKU Tools</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider v-if="$vuetify.breakpoint.mdAndDown"></v-divider>

      <v-list rounded dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>{{ mdiHomeSearch }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ $t("home.title") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item-group>
          <v-subheader>{{ $t("app.tools") }}</v-subheader>

          <v-list-item to="/phe-calculator">
            <v-list-item-action>
              <v-icon>{{ mdiCalculator }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("phe-calculator.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/protein-calculator">
            <v-list-item-action>
              <v-icon>{{ mdiCalculatorVariant }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("protein-calculator.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/barcode-scanner">
            <v-list-item-action>
              <v-icon>{{ mdiBarcodeScan }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("barcode-scanner.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/own-food">
            <v-list-item-action>
              <v-icon>{{ mdiFoodApple }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("own-food.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <v-list-item-group>
          <v-subheader>{{ $t("app.logs") }}</v-subheader>

          <v-list-item to="/phe-diary">
            <v-list-item-action>
              <v-icon>{{ mdiBook }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("phe-diary.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item dense to="/amino-counter">
            <v-list-item-action>
              <v-icon>{{ mdiCupWater }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("amino-counter.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/statistics">
            <v-list-item-action>
              <v-icon>{{ mdiChartBox }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("statistics.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/settings">
            <v-list-item-action>
              <v-icon>{{ mdiCog }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("settings.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <v-list-group :prepend-icon="mdiInformation">
          <template v-slot:activator>
            <v-list-item-title>{{ $t("app.more") }}</v-list-item-title>
          </template>

          <v-list-item dense to="/help">
            <v-list-item-action>
              <v-icon></v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("app.help") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            dense
            href="https://docs.google.com/forms/d/e/1FAIpQLSfct-_DFHBZMe7morO3sKalidwx3Y_rPtn1xaQtPLIa_roBdg/viewform?usp=sf_link"
            target="_blank"
          >
            <v-list-item-action>
              <v-icon></v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("app.feedback") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item dense to="/about">
            <v-list-item-action>
              <v-icon></v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("about.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item dense to="/disclaimer">
            <v-list-item-action>
              <v-icon></v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("disclaimer.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item dense to="/privacy-policy">
            <v-list-item-action>
              <v-icon></v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("privacy-policy.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item dense to="/other-apps" class="mb-10">
            <v-list-item-action>
              <v-icon></v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("other-apps.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left flat dark class="nav-layout custom-app-bar">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" :aria-label="$t('app.main-menu')" />
      <router-link to="/" class="app-logo">
        <v-img src="./assets/pkutools-logo.png" alt="PKU Tools Logo" max-width="25" class="ml-1 mr-4"></v-img>
        <v-toolbar-title v-if="$vuetify.breakpoint.lgAndUp">PKU Tools</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" class="lang-button">{{ locale }}</v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(lang, i) in lang" :key="i" @click="locale = lang.abbr">
            <v-list-item-title>{{ lang.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" :aria-label="$t('app.account-menu')">
            <v-avatar size="32">
              <v-icon v-if="!userIsAuthenticated">{{ mdiAccountCircle }}</v-icon>
              <v-icon v-if="userIsAuthenticated && !userPhotoUrl">{{ mdiAccountCircleOutline }}</v-icon>
              <img v-if="userIsAuthenticated && userPhotoUrl" :src="userPhotoUrl" :alt="$t('app.profile-picture')" />
            </v-avatar>
          </v-btn>
        </template>

        <v-list class="account-menu">
          <v-list-item v-if="!userIsAuthenticated" @click="signInGoogle">
            <span>
              <v-icon>{{ mdiGoogle }}</v-icon>
              {{ $t("app.signin-google") }}
            </span>
          </v-list-item>

          <v-list-item v-if="!userIsAuthenticated" @click="signInFacebook">
            <span>
              <v-icon>{{ mdiFacebook }}</v-icon>
              {{ $t("app.signin-facebook") }}
            </span>
          </v-list-item>

          <v-list-item v-if="!userIsAuthenticated" to="/email-auth">
            <span>
              <v-icon>{{ mdiEmail }}</v-icon>
              {{ $t("email-auth.title") }}
            </span>
          </v-list-item>

          <v-list-item v-if="userIsAuthenticated" to="/settings">
            <span>
              <v-icon>{{ mdiAccount }}</v-icon>
              {{ user.name }}
            </span>
          </v-list-item>

          <v-list-item v-if="userIsAuthenticated" @click="signOut">
            <span>
              <v-icon>{{ mdiLogoutVariant }}</v-icon>
              {{ $t("app.signout") }}
            </span>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item to="/help">
            <span>
              <v-icon>{{ mdiDownload }}</v-icon>
              {{ $t("app.install") }}
            </span>
          </v-list-item>

          <v-list-item to="/help">
            <span>
              <v-icon>{{ mdiHelpCircleOutline }}</v-icon>
              {{ $t("app.help") }}
            </span>
          </v-list-item>

          <v-list-item
            href="https://docs.google.com/forms/d/e/1FAIpQLSfct-_DFHBZMe7morO3sKalidwx3Y_rPtn1xaQtPLIa_roBdg/viewform?usp=sf_link"
            target="_blank"
          >
            <span>
              <v-icon>{{ mdiCommentQuoteOutline }}</v-icon>
              {{ $t("app.feedback") }}
            </span>
          </v-list-item>

          <v-list-item @click="updateDesign">
            <span>
              <v-icon v-if="!$vuetify.theme.dark">{{ mdiBrightness4 }}</v-icon>
              <v-icon v-if="$vuetify.theme.dark">{{ mdiBrightness7 }}</v-icon>
              &nbsp;
              <span v-if="!$vuetify.theme.dark">{{ $t("app.dark") }}</span>
              <span v-if="$vuetify.theme.dark">{{ $t("app.light") }}</span>
            </span>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="mx-sm-2">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-bottom-navigation
      app
      v-model="bottomNav"
      class="d-lg-none bottom-nav"
      active-class="v-btn--active bottom-nav--active"
      grow
    >
      <v-btn to="/" value="home" :aria-label="$t('home.title')">
        <v-icon>{{ mdiHomeSearch }}</v-icon>
      </v-btn>

      <v-btn
        to="/phe-calculator"
        value="phe-calculator"
        class="mobile-nav-hide"
        :aria-label="$t('phe-calculator.title')"
      >
        <v-icon>{{ mdiCalculator }}</v-icon>
      </v-btn>

      <v-btn
        to="/protein-calculator"
        value="protein-calculator"
        class="mobile-nav-hide"
        :aria-label="$t('protein-calculator.title')"
      >
        <v-icon>{{ mdiCalculatorVariant }}</v-icon>
      </v-btn>

      <v-btn
        to="/barcode-scanner"
        value="barcode-scanner"
        class="mobile-nav-hide"
        :aria-label="$t('barcode-scanner.title')"
      >
        <v-icon>{{ mdiBarcodeScan }}</v-icon>
      </v-btn>

      <v-btn to="/own-food" value="own-food" class="mobile-nav-hide" :aria-label="$t('own-food.title')">
        <v-icon>{{ mdiFoodApple }}</v-icon>
      </v-btn>

      <v-btn @click="sheet = true" value="add" :aria-label="$t('common.add')" class="add-button mobile-nav-hide">
        <v-icon color="primary" large>{{ mdiPlusCircle }}</v-icon>
      </v-btn>

      <v-btn to="/phe-diary" value="phe-diary" :aria-label="$t('phe-diary.title')">
        <v-icon>{{ mdiBook }}</v-icon>
      </v-btn>

      <v-btn to="/amino-counter" value="amino-counter" class="mobile-nav-hide" :aria-label="$t('amino-counter.title')">
        <v-icon>{{ mdiCupWater }}</v-icon>
      </v-btn>

      <v-btn to="/statistics" value="statistics" class="mobile-nav-hide" :aria-label="$t('statistics.title')">
        <v-icon>{{ mdiChartBox }}</v-icon>
      </v-btn>

      <v-btn to="/settings" value="settings" :aria-label="$t('settings.title')">
        <v-icon>{{ mdiCog }}</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-bottom-sheet v-model="sheet">
      <v-list>
        <v-subheader>{{ $t("app.tools") }}</v-subheader>

        <v-list-item to="/phe-calculator" @click="sheet = false">
          <v-list-item-icon>
            <v-icon>{{ mdiCalculator }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t("phe-calculator.title") }}</v-list-item-title>
        </v-list-item>

        <v-list-item to="/protein-calculator" @click="sheet = false">
          <v-list-item-icon>
            <v-icon>{{ mdiCalculatorVariant }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t("protein-calculator.title") }}</v-list-item-title>
        </v-list-item>

        <v-list-item to="/barcode-scanner" @click="sheet = false">
          <v-list-item-icon>
            <v-icon>{{ mdiBarcodeScan }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t("barcode-scanner.title") }}</v-list-item-title>
        </v-list-item>

        <v-list-item to="/own-food" @click="sheet = false">
          <v-list-item-icon>
            <v-icon>{{ mdiFoodApple }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t("own-food.title") }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>

    <v-snackbar bottom color="primary" :value="updateExists" :timeout="-1">
      {{ $t("app.update-info") }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="refreshApp">
          {{ $t("app.update") }}
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar bottom color="warning" v-model="offlineInfo">
      {{ $t("app.offline") }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="offlineInfo = false">
          {{ $t("common.close") }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { mapState } from "vuex";
import update from "./mixins/update";
import {
  mdiGoogle,
  mdiFacebook,
  mdiMagnify,
  mdiCalculator,
  mdiCalculatorVariant,
  mdiFoodApple,
  mdiTextBox,
  mdiBook,
  mdiCupWater,
  mdiCog,
  mdiInformation,
  mdiAccountCircle,
  mdiAccountCircleOutline,
  mdiAccount,
  mdiLogoutVariant,
  mdiHelpCircleOutline,
  mdiBrightness4,
  mdiBrightness7,
  mdiPlusCircle,
  mdiHelpCircle,
  mdiChartBox,
  mdiHomeSearch,
  mdiBarcodeScan,
  mdiCommentQuoteOutline,
  mdiEmail,
  mdiDownload,
  mdiClipboardTextOutline
} from "@mdi/js";

export default {
  metaInfo: {
    title: "PKU Tools",
    titleTemplate: "PKU Tools | %s"
  },
  data: () => ({
    mdiGoogle,
    mdiFacebook,
    mdiMagnify,
    mdiCalculator,
    mdiCalculatorVariant,
    mdiFoodApple,
    mdiTextBox,
    mdiBook,
    mdiCupWater,
    mdiCog,
    mdiInformation,
    mdiAccountCircle,
    mdiAccountCircleOutline,
    mdiAccount,
    mdiLogoutVariant,
    mdiHelpCircleOutline,
    mdiBrightness4,
    mdiBrightness7,
    mdiPlusCircle,
    mdiHelpCircle,
    mdiChartBox,
    mdiHomeSearch,
    mdiBarcodeScan,
    mdiCommentQuoteOutline,
    mdiEmail,
    mdiDownload,
    mdiClipboardTextOutline,
    drawer: null,
    lang: [
      { name: "Deutsch", abbr: "de" },
      { name: "English", abbr: "en" },
      { name: "Español", abbr: "es" },
      { name: "Français", abbr: "fr" }
    ],
    bottomNav: null,
    sheet: false,
    offlineInfo: false
  }),
  mixins: [update],
  methods: {
    signInGoogle() {
      if (navigator.onLine) {
        this.$store.dispatch("signInGoogle");
      } else {
        this.offlineInfo = true;
      }
    },
    signInFacebook() {
      if (navigator.onLine) {
        this.$store.dispatch("signInFacebook");
      } else {
        this.offlineInfo = true;
      }
    },
    signOut() {
      this.$store.dispatch("signOut");
    },
    updateDesign() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.vuetifyThemeDark = JSON.stringify(this.$vuetify.theme.dark);
    }
  },
  beforeCreate() {
    document.getElementsByTagName("html")[0].lang = this.$i18n.locale;

    firebase.initializeApp({
      apiKey: process.env.VUE_APP_API_KEY,
      authDomain: "pku-tools.firebaseapp.com",
      databaseURL: "https://pku-tools.firebaseio.com",
      projectId: "pku-tools",
      storageBucket: "pku-tools.appspot.com",
      messagingSenderId: "202032702286",
      appId: "1:202032702286:web:2daa2ac360e82ee0cfb41f"
    });

    firebase.auth().onAuthStateChanged(user => {
      // Prevent corrupt data
      if (navigator.onLine) {
        if (user) {
          this.$store.dispatch("autoSignIn", user).then(() => {
            this.$store.dispatch("initRef");
          });
        }
      } else {
        this.signOut();
      }
    });
  },
  mounted() {
    if (localStorage.vuetifyThemeDark) {
      this.$vuetify.theme.dark = JSON.parse(localStorage.vuetifyThemeDark);
    }
  },
  computed: {
    locale: {
      get: function () {
        return this.$i18n.locale;
      },
      set: function (newLocale) {
        localStorage.i18nCurrentLocale = JSON.stringify(newLocale);
        this.$i18n.locale = newLocale;
        this.$vuetify.lang.current = newLocale;
        document.getElementsByTagName("html")[0].lang = newLocale;
      }
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    userPhotoUrl() {
      // Necessary to parse url
      return this.$store.getters.user.photoUrl;
    },
    ...mapState(["user"])
  }
};
</script>

<style lang="scss" scoped>
.v-app-bar {
  padding-left: env(safe-area-inset-left) !important;
  margin-top: env(safe-area-inset-top) !important;
  padding-right: env(safe-area-inset-right) !important;
}

.v-navigation-drawer {
  padding-left: env(safe-area-inset-left) !important;
  padding-top: env(safe-area-inset-top) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
}

#app {
  padding-left: env(safe-area-inset-left) !important;
  padding-right: env(safe-area-inset-right) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
}

.v-bottom-navigation {
  padding-left: env(safe-area-inset-left) !important;
  padding-right: env(safe-area-inset-right) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;

  height: auto !important;

  .v-btn {
    padding: 15px !important;
  }
}

.theme--dark.v-navigation-drawer {
  background-color: #121212 !important;
}

.v-item-group.v-bottom-navigation {
  box-shadow: none;
  background-color: #f5f5f5;

  .v-btn {
    min-width: 60px;
  }

  @media (max-height: 565px) {
    display: none;
  }
}

.bottom-nav--active:before {
  opacity: 0.08 !important;
}

.add-button.bottom-nav--active:before {
  opacity: 0 !important;
}

.app-logo {
  display: flex;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
  align-items: center;
}

.theme--dark {
  &.v-navigation-drawer,
  &.v-bottom-navigation {
    background-color: #272727;
  }

  .app-logo {
    color: #fff;
  }
}

.nav-hide,
.mobile-nav-hide {
  display: none;
}

.v-btn {
  text-transform: none;
}

.lang-button {
  text-transform: uppercase;
}

.v-list--dense .v-list-item .v-list-item__title {
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
}

.theme--light .custom-app-bar {
  background: linear-gradient(90deg, rgba(41, 128, 185, 1) 0%, rgba(52, 152, 219, 1) 100%);
}

.theme--dark .custom-app-bar {
  background: linear-gradient(90deg, rgba(41, 128, 185, 1) 0%, rgba(52, 73, 94, 1) 100%);
}

.account-menu {
  min-width: 200px;
}
</style>
