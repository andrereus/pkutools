<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("phe-search.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <p>{{ $t("phe-search.description-p1") }}</p>

        <!-- Text inputs need keyup on mobile -->
        <v-text-field
          :value="search"
          @keyup="typing($event)"
          :label="$t('phe-search.search')"
          filled
          single-line
          ref="foodSearch"
          clearable
          @click:clear="typing($event)"
          autocomplete="off"
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
              <td class="text-start">
                <img
                  :src="publicPath + 'img/food-icons/' + item.icon"
                  v-if="item.icon !== undefined"
                  width="25"
                  class="food-icon"
                />
                <img
                  :src="publicPath + 'img/food-icons/Organic Food.svg'"
                  v-if="item.icon === undefined"
                  width="25"
                  class="food-icon"
                />
                {{ item.name }}
              </td>
              <td class="text-start">{{ item.phe }}</td>
            </tr>
          </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">
                <img :src="publicPath + 'img/food-icons/' + icon" width="35" class="food-icon" />
                {{ name }}
              </span>
            </v-card-title>

            <v-card-text>
              <v-text-field
                filled
                :label="$t('phe-search.weight')"
                v-model.number="weight"
                type="number"
                class="mt-6"
                clearable
              ></v-text-field>
              <p class="title font-weight-regular">= {{ calculatePhe() }} mg Phe</p>
            </v-card-text>

            <v-card-actions class="mt-n6">
              <v-spacer></v-spacer>
              <v-btn depressed color="primary" @click="save" v-if="userIsAuthenticated">
                {{ $t("common.add") }}
              </v-btn>
              <v-btn depressed @click="dialog = false">{{ $t("common.close") }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn depressed @click="searchFood" class="my-6">
          <v-icon left>mdi-arrow-down</v-icon>
          {{ $t("phe-search.advanced") }}
        </v-btn>

        <v-data-table
          :headers="headers"
          :items="advancedFood"
          sort-by="name"
          disable-pagination
          hide-default-footer
          mobile-breakpoint="0"
          v-if="advancedFood !== null"
        >
          <template v-slot:item="{ item }">
            <tr @click="loadItem(item)" class="tr-edit">
              <td class="text-start">
                <img :src="publicPath + 'img/food-icons/Organic Food.svg'" width="25" class="food-icon" />
                {{ item.name }}
              </td>
              <td class="text-start">{{ item.phe }}</td>
            </tr>
          </template>
        </v-data-table>
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
  metaInfo() {
    return {
      title: this.$t("phe-search.title"),
      meta: [{ name: "description", content: this.$t("phe-search.description") }]
    };
  },
  data: () => ({
    publicPath: process.env.BASE_URL,
    dialog: false,
    search: null,
    phe: null,
    weight: 100,
    name: "",
    icon: "Organic Food.svg",
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name"
      },
      { text: "Phe", value: "phe" }
    ],
    enFood,
    deFood,
    advancedFood: null
  }),
  methods: {
    loadItem(item) {
      this.name = item.name;
      this.icon = item.icon !== undefined ? item.icon : "Organic Food.svg";
      this.phe = item.phe;
      this.weight = 100;
      this.dialog = true;
    },
    calculatePhe() {
      return Math.round((this.weight * this.phe) / 100);
    },
    save() {
      firebase
        .database()
        .ref(this.user.id + "/pheLog")
        .push({
          name: this.name,
          icon: this.icon,
          weight: Number(this.weight),
          phe: this.calculatePhe()
        });
      this.dialog = false;
      this.$router.push("phe-log");
    },
    typing($event) {
      this.search = $event.target.value;
      this.advancedFood = null;
    },
    async searchFood() {
      if (this.$i18n.locale === "de") {
        const res = await fetch(this.publicPath + "data/de-food-advanced.json");
        const food = await res.json();
        this.advancedFood = food.filter(food => {
          const regex = new RegExp(`${this.search}`, `gi`);
          return food.name.match(regex);
        });
      } else {
        const res = await fetch(this.publicPath + "data/en-food-advanced.json");
        const food = await res.json();
        this.advancedFood = food.filter(food => {
          const regex = new RegExp(`${this.search}`, `gi`);
          return food.name.match(regex);
        });
      }
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

.food-icon {
  vertical-align: bottom;
}

.theme--light.v-data-table {
  background-color: #fafafa;
}

.v-btn {
  text-transform: none;
}
</style>
