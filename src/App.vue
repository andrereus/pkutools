<template>
  <v-app>
    <v-navigation-drawer app clipped v-model="drawer" floating class="nav-layout">
      <v-list nav>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ $t("home.title") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item-group>
          <v-list-item to="/phe-calculator">
            <v-list-item-action>
              <v-icon>mdi-calculator</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("phe-calculator.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/phe-search">
            <v-list-item-action>
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("phe-search.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <v-list-item-group>
          <v-list-item to="/amino-counter">
            <v-list-item-action>
              <v-icon>mdi-cup</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("amino-counter.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <v-list-item-group>
          <v-list-item to="/apps">
            <v-list-item-action>
              <v-icon>mdi-apps</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("apps.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/about">
            <v-list-item-action>
              <v-icon>mdi-information</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t("about.title") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left flat class="nav-layout">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-img src="./assets/pkutools-logo.png" alt="PKU Tools Logo" max-width="25" class="mr-3"></v-img>
      <v-toolbar-title>PKU Tools</v-toolbar-title>
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

      <v-btn icon @click="dark = !dark">
        <v-icon v-if="!dark">mdi-brightness-4</v-icon>
        <v-icon v-if="dark">mdi-brightness-7</v-icon>
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar size="32">
              <v-icon v-if="!userIsAuthenticated">mdi-account</v-icon>
              <img v-if="userIsAuthenticated" :src="userPhotoUrl" />
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-if="!userIsAuthenticated" @click="signInGoogle">
            <v-list-item-title>{{ $t("app.signin-google") }}</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="userIsAuthenticated">
            <span>
              <v-icon>mdi-account</v-icon>
              {{ this.$store.getters.user.name }}
            </span>
          </v-list-item>

          <v-list-item v-if="userIsAuthenticated" @click="signOut">
            <v-list-item-title>{{ $t("app.signout") }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content class="mx-sm-2">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-bottom-navigation app v-model="bottomNav" class="d-lg-none" active-class="v-btn--active bottom-nav--active">
      <v-btn to="/" value="home">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn to="/phe-calculator" value="phe-calculator">
        <v-icon>mdi-calculator</v-icon>
      </v-btn>

      <v-btn to="/phe-search" value="phe-search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn to="/amino-counter" value="amino-counter">
        <v-icon>mdi-cup</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  data: () => ({
    drawer: null,
    dark: false,
    lang: [
      { name: "English", abbr: "en" },
      { name: "Deutsch", abbr: "de" }
    ],
    bottomNav: ""
  }),
  methods: {
    signInGoogle() {
      this.$store.dispatch("signInGoogle");
    },
    signOut() {
      this.$store.dispatch("signOut");
    }
  },
  mounted() {
    if (localStorage.vuetifyThemeDark) {
      this.dark = JSON.parse(localStorage.vuetifyThemeDark);
      this.$vuetify.theme.dark = this.dark;
    }

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
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
  },
  watch: {
    dark(newDark) {
      localStorage.vuetifyThemeDark = JSON.stringify(newDark);
      this.$vuetify.theme.dark = newDark;
    }
  },
  computed: {
    locale: {
      get: function() {
        return this.$i18n.locale;
      },
      set: function(newLocale) {
        localStorage.i18nCurrentLocale = JSON.stringify(newLocale);
        this.$i18n.locale = newLocale;
        this.$vuetify.lang.current = newLocale;
      }
    },
    userIsAuthenticated() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
    },
    userPhotoUrl() {
      // TODO: Try mapState instead
      return this.$store.getters.user.photoUrl;
    }
  }
};
</script>

<style lang="scss" scoped>
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #fff;

  @media (min-width: 1264px) {
    background-color: transparent;
  }
}

.v-item-group.v-bottom-navigation {
  box-shadow: none;

  .v-btn {
    border-radius: 6px 6px 0 0;

    &:hover:before {
      opacity: 0;
    }
  }
}

.bottom-nav--active {
  border-bottom: 2px solid #000;
}

.theme--dark {
  &.v-application,
  &.v-app-bar.v-toolbar.v-sheet,
  &.v-navigation-drawer,
  &.v-bottom-navigation {
    background-color: #1e1e1e;
  }

  &.v-app-bar.v-toolbar.v-sheet {
    @media (min-width: 1264px) {
      background-color: transparent;
    }
  }

  .bottom-nav--active {
    border-bottom: 2px solid #fff;
  }
}
</style>
