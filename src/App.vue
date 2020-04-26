<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app dark clipped>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/supplement-counter">
          <v-list-item-action>
            <v-icon>mdi-tools</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Supplement Counter</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/calculator">
          <v-list-item-action>
            <v-icon>mdi-tools</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Calculator</v-list-item-title>
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

    <v-app-bar app dark flat clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
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
