<template>
  <div id="app">
    <b-navbar toggleable="sm" type="dark" variant="dark">
      <b-container>
        <b-navbar-brand to="/">PKU Tools</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>

            <b-nav-item-dropdown right>
              <template v-slot:button-content>Apps</template>

              <b-dropdown-item href="https://pherechner.de/" target="_blank">
                Phe Rechner
                <b-icon icon="box-arrow-up-right"></b-icon>
              </b-dropdown-item>

              <b-dropdown-item href="https://pkumanager.com/" target="_blank">
                PKU Manager
                <b-icon icon="box-arrow-up-right"></b-icon>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-container>
      <router-view />
    </b-container>
  </div>
</template>
