<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("phe-search.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <p v-if="this.$i18n.locale === 'de'">
          Übersetzt aus dem Englischen mit Google Translate. Optimierungen folgen.
        </p>

        <!-- Text inputs need keyup on mobile -->
        <v-text-field
          :value="search"
          @keyup="search = $event.target.value"
          append-icon="mdi-magnify"
          :label="$t('phe-search.search')"
          filled
          single-line
          @click:append="closeKeys"
          ref="foodSearch"
        ></v-text-field>

        <v-data-table
          :headers="headers"
          :items="loadedFood"
          :search="search"
          sort-by="name"
          disable-pagination
          hide-default-footer
          mobile-breakpoint="0"
        >
          <template v-slot:item="{ item }">
            <tr @click="loadItem(item)" class="tr-edit">
              <td class="text-start">{{ item.name }}</td>
              <td class="text-start">{{ item.phe }}</td>
            </tr>
          </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ name }}</span>
            </v-card-title>

            <v-card-text>
              <v-text-field
                filled
                :label="$t('phe-search.weight')"
                v-model.number="weight"
                type="number"
                class="mt-6"
              ></v-text-field>
              <p class="title font-weight-regular">= {{ (weight * phe) / 100 }} mg Phe</p>
            </v-card-text>

            <v-card-actions class="mt-n6">
              <v-spacer></v-spacer>
              <v-btn depressed color="primary" @click="save" v-if="userIsAuthenticated">
                {{ $t("phe-search.save") }}
              </v-btn>
              <v-btn depressed @click="dialog = false">{{ $t("phe-search.cancel") }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as firebase from "firebase/app";
import "firebase/database";
import enFood from "../components/data/en-food.json";
import deFood from "../components/data/de-food.json";

export default {
  data: () => ({
    dialog: false,
    search: null,
    phe: null,
    weight: null,
    name: "",
    headers: [
      {
        text: "Food Name",
        align: "start",
        value: "name"
      },
      { text: "Phe per 100g (in mg)", value: "phe" }
    ],
    enFood,
    deFood
  }),
  methods: {
    closeKeys() {
      this.$refs.foodSearch.blur();
    },
    loadItem(item) {
      this.name = item.name;
      this.phe = item.phe;
      this.dialog = true;
    },
    save() {
      firebase
        .database()
        .ref(this.user.id + "/pheLog")
        .push({
          name: this.name,
          weight: Number(this.weight),
          phe: (this.weight * this.phe) / 100
        });
      this.dialog = false;
      this.$router.push("phe-log");
    }
  },
  computed: {
    loadedFood() {
      if (this.$i18n.locale === "de") {
        return this.deFood;
      } else {
        return this.enFood;
      }
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    ...mapState(["user"])
  }
};
</script>

<style lang="scss" scoped>
.tr-edit {
  cursor: pointer;
}
</style>
