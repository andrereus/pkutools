<template>
  <div id="app">
    <b-navbar toggleable="sm" type="dark" variant="dark">
      <b-container>
        <b-navbar-brand to="/">
          <img src="./assets/pkutools-logo.png" class="logo" alt="PKU Tools Logo" />
          PKU Tools
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/">Home</b-nav-item>

            <b-nav-item-dropdown right>
              <template v-slot:button-content>Tools</template>

              <b-dropdown-item to="/supplement-counter">Supplement Counter</b-dropdown-item>
              <b-dropdown-item to="/calculator">Calculator</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item to="/apps">Apps</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-container>
      <router-view />
    </b-container>
  </div>
</template>
