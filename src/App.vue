<template>
  <v-app>
    <v-navigation-drawer app clipped v-model="drawer">
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

        <v-divider></v-divider>

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

        <v-list-item>
          <v-switch v-model="dark" :label="$t('app.darkmode')" />
        </v-list-item>

        <v-list-item>
          <v-select
            v-model="locale"
            :items="lang"
            item-text="name"
            item-value="abbr"
            outlined
            dense
            prepend-icon="mdi-translate"
          ></v-select>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-img src="./assets/pkutools-logo.png" alt="PKU Tools Logo" max-width="25" class="mr-3"></v-img>
      <v-toolbar-title>PKU Tools</v-toolbar-title>
    </v-app-bar>

    <v-content class="mx-sm-2">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-bottom-navigation app v-model="bottomNav" class="d-lg-none">
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
      get: function() {
        return this.$i18n.locale;
      },
      set: function(newLocale) {
        localStorage.i18nCurrentLocale = JSON.stringify(newLocale);
        this.$i18n.locale = newLocale;
        this.$vuetify.lang.current = newLocale;
      }
    }
  }
};
</script>
