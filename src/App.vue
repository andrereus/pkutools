<template>
  <v-app>
    <v-navigation-drawer app clipped v-model="drawer" floating class="nav-layout">
      <v-list>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ $t("home.title") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item-group>
          <v-list-item to="/phe-search">
            <v-list-item-action>
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("phe-search.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/phe-calculator">
            <v-list-item-action>
              <v-icon>mdi-calculator</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("phe-calculator.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/protein-calculator">
            <v-list-item-action>
              <v-icon>mdi-calculator-variant</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("protein-calculator.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <v-divider></v-divider>

        <v-list-item-group>
          <v-list-item to="/phe-log">
            <v-list-item-action>
              <v-icon>mdi-book</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("phe-log.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/amino-counter">
            <v-list-item-action>
              <v-icon>mdi-cup</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("amino-counter.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/phe-diary">
            <v-list-item-action>
              <v-icon>mdi-notebook</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("phe-diary.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <v-list-group prepend-icon="mdi-information">
          <template v-slot:activator>
            <v-list-item-title>{{ $t("app.about") }}</v-list-item-title>
          </template>

          <v-list-item dense to="/other-apps">
            <v-list-item-action>
              <v-icon></v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("other-apps.title") }}</v-list-item-title>
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
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left flat class="nav-layout">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" :aria-label="$t('app.main-menu')" />
      <router-link to="/" class="app-logo">
        <v-img src="./assets/pkutools-logo.png" alt="PKU Tools Logo" max-width="25" class="mr-3"></v-img>
        <v-toolbar-title>PKU Tools</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">{{ locale }}</v-btn>
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
              <v-icon v-if="!userIsAuthenticated">mdi-account</v-icon>
              <img v-if="userIsAuthenticated" :src="userPhotoUrl" :alt="$t('app.profile-picture')" />
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-if="!userIsAuthenticated" @click="signInGoogle">
            <span>
              <v-icon>mdi-google</v-icon>
              {{ $t("app.signin-google") }}
            </span>
          </v-list-item>

          <v-list-item v-if="userIsAuthenticated">
            <span>
              <v-icon>mdi-account</v-icon>
              {{ user.name }}
            </span>
          </v-list-item>

          <v-list-item v-if="userIsAuthenticated" @click="signOut">
            <span>
              <v-icon>mdi-logout-variant</v-icon>
              {{ $t("app.signout") }}
            </span>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item @click="dark = !dark">
            <span>
              <v-icon v-if="!dark">mdi-brightness-4</v-icon>
              <v-icon v-if="dark">mdi-brightness-7</v-icon>
              &nbsp;
              <span v-if="!dark">{{ $t("app.dark") }}</span>
              <span v-if="dark">{{ $t("app.light") }}</span>
            </span>
          </v-list-item>

          <v-list-item>
            <span>
              <pwa-install :installbuttontext="$t('app.install')"></pwa-install>
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
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn to="/phe-search" value="phe-search" :aria-label="$t('phe-search.title')">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn to="/phe-calculator" value="phe-calculator" :aria-label="$t('phe-calculator.title')">
        <v-icon>mdi-calculator</v-icon>
      </v-btn>

      <v-btn to="/protein-calculator" value="protein-calculator" :aria-label="$t('protein-calculator.title')">
        <v-icon>mdi-calculator-variant</v-icon>
      </v-btn>

      <v-btn to="/phe-log" value="phe-log" :aria-label="$t('phe-log.title')">
        <v-icon>mdi-book</v-icon>
      </v-btn>

      <v-btn to="/amino-counter" value="amino-counter" class="mobile-nav-hide" :aria-label="$t('amino-counter.title')">
        <v-icon>mdi-cup</v-icon>
      </v-btn>

      <v-btn to="/phe-diary" value="phe-diary" class="mobile-nav-hide" :aria-label="$t('phe-diary.title')">
        <v-icon>mdi-notebook</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-snackbar top color="primary" :value="updateExists" :timeout="-1">
      {{ $t("app.update-available") }}
      <v-btn text @click="refreshApp">
        {{ $t("app.update") }}
      </v-btn>
    </v-snackbar>

    <v-snackbar top color="warning" v-model="offlineInfo">
      {{ $t("app.offline") }}
      <v-btn text @click="offlineInfo = false">
        {{ $t("common.close") }}
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { mapState } from "vuex";
import update from "./mixins/update";
import "@pwabuilder/pwainstall";

export default {
  metaInfo: {
    title: "PKU Tools",
    titleTemplate: "PKU Tools | %s"
  },
  data: () => ({
    drawer: null,
    dark: false,
    lang: [
      { name: "English", abbr: "en" },
      { name: "Deutsch", abbr: "de" }
    ],
    bottomNav: null,
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
    signOut() {
      this.$store.dispatch("signOut");
    }
  },
  beforeCreate() {
    document.getElementsByTagName("html")[0].lang = this.$i18n.locale;

    firebase.initializeApp({
      apiKey: "AIzaSyCy-4rH75-ILcbgJPx3amMaoHUEl3fJJtw",
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
      this.dark = JSON.parse(localStorage.vuetifyThemeDark);
      this.$vuetify.theme.dark = this.dark;
    }
  },
  watch: {
    dark(newDark) {
      localStorage.vuetifyThemeDark = JSON.stringify(newDark);
      this.$vuetify.theme.dark = newDark;
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
.theme--light.v-navigation-drawer {
  background-color: #f5f5f5;
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

.mobile-nav-hide {
  display: none;
}

pwa-install::part(openButton) {
  background: #3498db;
  border-radius: 4px;
  padding: 4px 16px;
}
</style>
