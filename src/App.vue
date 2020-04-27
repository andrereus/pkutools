<template>
  <v-app>
    <v-navigation-drawer app clipped v-model="drawer">
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/amino-counter">
          <v-list-item-action>
            <v-icon>mdi-timer</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Amino Counter</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/phe-calculator">
          <v-list-item-action>
            <v-icon>mdi-calculator</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Phe Calculator</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/apps">
          <v-list-item-action>
            <v-icon>mdi-apps</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Apps</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/about">
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-img src="./assets/pkutools-logo.png" alt="PKU Tools Logo" max-width="25" class="mr-3"></v-img>
      <v-toolbar-title>PKU Tools</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  })
};
</script>
