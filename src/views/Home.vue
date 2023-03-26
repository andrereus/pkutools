<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline mt-1" v-if="!userIsAuthenticated">{{ $t("home.title") }}</h2>
        <h2 class="headline mt-1" v-if="userIsAuthenticated">Hi {{ user.name }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center" class="mb-3">
      <v-col cols="12" md="10" lg="8" xl="6">
        <p v-if="!userIsAuthenticated" class="mb-6">{{ $t("app.description") }}</p>

        <div>
          <v-text-field
            v-model="search"
            :label="$t('phe-search.search')"
            outlined
            rounded
            autocomplete="off"
            @keyup="searchFood"
            clearable
            @click:clear="advancedFood = null"
          >
            <template v-slot:append-outer>
              <v-btn depressed fab small :loading="loading" color="primary" @click="searchFood" class="mt-n2">
                <v-icon>{{ mdiMagnify }}</v-icon>
              </v-btn>
            </template>
          </v-text-field>

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
                  rounded
                  :label="$t('phe-search.weight')"
                  v-model.number="weight"
                  type="number"
                  class="mt-6"
                  clearable
                ></v-text-field>
                <p class="title font-weight-regular">= {{ calculatePhe() }} mg Phe</p>
                <div v-if="userIsAuthenticated">
                  <p class="mt-4 caption">{{ $t("phe-log.preview") }}</p>
                  <v-progress-linear
                    :value="((pheResult + calculatePhe()) * 100) / (settings?.maxPhe || 0)"
                    height="5"
                    class="mt-n2 mb-6"
                    rounded
                  ></v-progress-linear>
                </div>
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
            <v-icon>{{ mdiInformationVariant }}</v-icon>
            {{ $t("phe-search.source") }}
          </p>
        </div>

        <div v-if="advancedFood === null" class="mt-n3">
          <v-btn depressed rounded to="/phe-calculator" class="mr-3 mb-3">
            <v-icon left>{{ mdiCalculator }}</v-icon>
            {{ $t("phe-calculator.title") }}
          </v-btn>
          <v-btn depressed rounded to="/protein-calculator" class="mr-3 mb-3">
            <v-icon left>{{ mdiCalculatorVariant }}</v-icon>
            {{ $t("protein-calculator.title") }}
          </v-btn>
          <v-btn depressed rounded to="/barcode-scanner" class="mr-3 mb-3">
            <v-icon left>{{ mdiBarcodeScan }}</v-icon>
            {{ $t("barcode-scanner.title") }}
          </v-btn>
          <v-btn v-if="userIsAuthenticated" depressed rounded to="/own-food" class="mr-3 mb-3">
            <v-icon left>{{ mdiFoodApple }}</v-icon>
            {{ $t("home.own-food") }}
          </v-btn>
          <v-menu v-if="!userIsAuthenticated" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed rounded class="mr-3 mb-3" v-bind="attrs" v-on="on">
                {{ $t("home.more") }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="signInGoogle">
                <span>
                  <v-icon>{{ mdiGoogle }}</v-icon>
                  {{ $t("app.signin-google") }}
                </span>
              </v-list-item>
              <v-list-item @click="signInFacebook">
                <span>
                  <v-icon>{{ mdiFacebook }}</v-icon>
                  {{ $t("app.signin-facebook") }}
                </span>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <PheLog v-if="userIsAuthenticated && advancedFood === null" />

        <div v-if="!userIsAuthenticated && advancedFood === null">
          <v-img src="../assets/eating-together.svg" alt="Food Illustration" class="mt-6 mb-8 illustration"></v-img>

          <h2 class="headline mt-4 mb-6">{{ $t("home.features") }}</h2>

          <FeatureComparison home class="mb-10" />

          <v-btn depressed rounded to="/help" color="primary" class="mr-3 mb-3">
            <v-icon left>{{ mdiHelpCircleOutline }}</v-icon>
            {{ $t("app.install") }}
          </v-btn>

          <v-btn
            v-if="this.$i18n.locale === 'en'"
            depressed
            rounded
            href="https://youtu.be/lmiejnEFccY"
            target="_blank"
            class="mr-3 mb-3"
          >
            <v-icon left>{{ mdiPlayCircleOutline }}</v-icon>
            {{ $t("home.video") }}
          </v-btn>

          <v-btn
            v-if="this.$i18n.locale === 'de'"
            depressed
            rounded
            href="https://youtu.be/5_-F4tM8_RQ"
            target="_blank"
            class="mr-3 mb-3"
          >
            <v-icon left>{{ mdiPlayCircleOutline }}</v-icon>
            {{ $t("home.video") }}
          </v-btn>

          <v-btn depressed rounded href="https://youtu.be/ITfvSliHwc0" target="_blank" class="mr-3 mb-3">
            <v-icon left>{{ mdiPlay }}</v-icon>
            {{ $t("home.mobile-video") }}
          </v-btn>

          <v-btn depressed rounded to="/other-apps" class="mr-3 mb-3">
            {{ $t("home.compare") }}
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-snackbar bottom color="warning" v-model="offlineInfo">
      {{ $t("app.offline") }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="offlineInfo = false">
          {{ $t("common.close") }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import FeatureComparison from "../components/FeatureComparison.vue";
import { mapState } from "vuex";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import Fuse from "fuse.js";
import PheLog from "../components/PheLog.vue";
import {
  mdiGoogle,
  mdiFacebook,
  mdiMagnify,
  mdiCalculator,
  mdiCalculatorVariant,
  mdiFoodApple,
  mdiPoll,
  mdiPlayCircleOutline,
  mdiPlay,
  mdiInformationVariant,
  mdiPlus,
  mdiHelpCircleOutline,
  mdiBarcodeScan
} from "@mdi/js";

export default {
  components: {
    FeatureComparison,
    PheLog
  },
  metaInfo() {
    return {
      title: this.$t("app.title"),
      titleTemplate: null,
      meta: [{ name: "description", content: this.$t("app.description") }]
    };
  },
  data: () => ({
    mdiGoogle,
    mdiFacebook,
    mdiMagnify,
    mdiCalculator,
    mdiCalculatorVariant,
    mdiFoodApple,
    mdiPoll,
    mdiPlayCircleOutline,
    mdiPlay,
    mdiInformationVariant,
    mdiPlus,
    mdiHelpCircleOutline,
    mdiBarcodeScan,
    offlineInfo: false,
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
    advancedFood: null,
    loading: false
  }),
  methods: {
    signInGoogle() {
      if (navigator.onLine) {
        this.$store.dispatch("signInGoogle");
      } else {
        this.offlineInfo = true;
      }
    },
    signInFacebook() {
      if (navigator.onLine) {
        this.$store.dispatch("signInFacebook");
      } else {
        this.offlineInfo = true;
      }
    },
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
      this.advancedFood = null;
    },
    async searchFood() {
      this.loading = true;
      let res, food;
      if (this.$i18n.locale === "de") {
        const res1 = await fetch(this.publicPath + "data/frida.json");
        const res2 = await fetch(this.publicPath + "data/deda.json");
        const food1 = await res1.json();
        const food2 = await res2.json();
        food = food1.concat(food2).concat(this.ownFood);
      } else {
        res = await fetch(this.publicPath + "data/usda.json");
        food = await res.json();
      }

      const fuse = new Fuse(food, {
        keys: ["name", "phe"],
        threshold: 0.2,
        minMatchCharLength: 2,
        ignoreLocation: true
      });

      let results = fuse.search(this.search.trim());

      this.advancedFood = results.map(result => {
        return result.item;
      });
      this.loading = false;
    }
  },
  computed: {
    pheResult() {
      let phe = 0;
      this.pheLog.forEach(item => {
        phe += item.phe;
      });
      return Math.round(phe);
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    ...mapState(["user", "ownFood", "pheLog", "settings"])
  }
};
</script>

<style lang="scss" scoped>
.illustration {
  max-width: 550px;
}

.v-btn {
  text-transform: none;
}
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
