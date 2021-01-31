<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("phe-search.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-text-field
          v-model="search"
          :label="$t('phe-search.search')"
          filled
          single-line
          autocomplete="off"
          @keyup.enter="searchFood"
          clearable
        >
          <template v-slot:append-outer>
            <v-btn depressed fab small color="primary" @click="searchFood" class="mt-n2">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
        </v-text-field>

        <!--        <v-data-table-->
        <!--          :headers="headers"-->
        <!--          :items="loadedFood"-->
        <!--          :search="search"-->
        <!--          sort-by="name"-->
        <!--          disable-pagination-->
        <!--          hide-default-footer-->
        <!--          mobile-breakpoint="0"-->
        <!--        >-->
        <!--          <template v-slot:item="{ item }">-->
        <!--            <tr @click="loadItem(item)" class="tr-edit">-->
        <!--              <td class="text-start">-->
        <!--                <img-->
        <!--                  :src="publicPath + 'img/food-icons/' + item.icon"-->
        <!--                  v-if="item.icon !== undefined"-->
        <!--                  width="25"-->
        <!--                  class="food-icon"-->
        <!--                />-->
        <!--                <img-->
        <!--                  :src="publicPath + 'img/food-icons/Organic Food.svg'"-->
        <!--                  v-if="item.icon === undefined"-->
        <!--                  width="25"-->
        <!--                  class="food-icon"-->
        <!--                />-->
        <!--                {{ item.name }}-->
        <!--              </td>-->
        <!--              <td class="text-start">{{ item.phe }}</td>-->
        <!--            </tr>-->
        <!--          </template>-->
        <!--        </v-data-table>-->

        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">
                <img :src="publicPath + 'img/food-icons/' + icon + '.svg'" width="35" class="food-icon" />
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

        <!--        <v-btn depressed @click="searchFood" class="my-6">-->
        <!--          <v-icon left>mdi-arrow-down</v-icon>-->
        <!--          {{ $t("phe-search.advanced") }}-->
        <!--        </v-btn>-->

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
                <img
                  :src="publicPath + 'img/food-icons/' + item.icon + '.svg'"
                  v-if="item.icon !== undefined"
                  width="25"
                  class="food-icon"
                />
                <img
                  :src="publicPath + 'img/food-icons/organic-food.svg'"
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

        <p class="mt-6 text--secondary" v-if="advancedFood !== null">
          <v-icon>mdi-information-variant</v-icon>
          {{ $t("phe-search.source") }}
        </p>

        <p class="text--secondary text-center mt-1" v-if="advancedFood === null">
          {{ $t("phe-search.singular") }}
        </p>

        <v-img
          src="../assets/searching.svg"
          alt="Search Illustration"
          class="mt-8 illustration"
          v-if="advancedFood === null"
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as firebase from "firebase/app";
import "firebase/database";

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
    icon: "organic-food",
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name"
      },
      { text: "Phe", value: "phe" }
    ],
    advancedFood: null
  }),
  methods: {
    loadItem(item) {
      this.name = item.name;
      this.icon = item.icon !== undefined ? item.icon : "organic-food";
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
    // typing($event) {
    //   this.search = $event.target.value;
    //   this.advancedFood = null;
    // },
    async searchFood() {
      if (this.$i18n.locale === "de") {
        const res = await fetch(this.publicPath + "data/frida.json");
        const food = await res.json();
        this.advancedFood = food.filter(food => {
          const regex = new RegExp(`${this.search.trim()}`, `gi`);
          return food.name.match(regex);
        });
      } else {
        const res = await fetch(this.publicPath + "data/usda.json");
        const food = await res.json();
        this.advancedFood = food.filter(food => {
          const regex = new RegExp(`${this.search.trim()}`, `gi`);
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

.illustration {
  max-width: 200px;
  margin: 0 auto;
}
</style>
