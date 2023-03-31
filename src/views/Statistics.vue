<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline mt-1">{{ $t("statistics.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center" class="mb-3">
      <v-col cols="12" md="10" lg="8" xl="6">
        <div v-if="!userIsAuthenticated">
          <v-btn depressed rounded @click="signInGoogle" class="mt-2">
            <v-icon left>{{ mdiGoogle }}</v-icon>
            {{ $t("app.signin-google") }}
          </v-btn>
          <br />
          <v-btn depressed rounded @click="signInFacebook" class="mt-2">
            <v-icon left>{{ mdiFacebook }}</v-icon>
            {{ $t("app.signin-facebook") }}
          </v-btn>
          <br />
          <v-btn depressed rounded to="/email-auth" class="mt-2">
            <v-icon left>{{ mdiEmail }}</v-icon>
            {{ $t("email-auth.title") }}
          </v-btn>
        </div>

        <div v-if="userIsAuthenticated">
          <v-row no-gutters>
            <v-col cols="6" sm="3" md="3" lg="3">
              <v-card outlined height="200" to="/" class="mr-1 mb-1 stat-card">
                <v-card-text>
                  <p class="mb-6">{{ $t("phe-log.title") }}</p>
                  <div class="text-center">
                    <v-progress-circular
                      :rotate="-90"
                      :size="110"
                      :width="15"
                      :value="(pheResult * 100) / (settings.maxPhe || 0)"
                      color="primary"
                    >
                      {{ pheResult }}
                    </v-progress-circular>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="6" sm="3" md="3" lg="3">
              <v-card outlined height="200" class="mr-1 mb-1 stat-card">
                <router-link to="/amino-counter" class="amino-router">
                  <v-card-text>
                    <p class="mb-6">{{ $t("amino-counter.title") }}</p>
                    <div class="text-center">
                      <v-progress-circular
                        :rotate="-90"
                        :size="110"
                        :width="15"
                        :value="(calculateAmino * 100) / (settings.maxAmino || 3)"
                        color="teal"
                      >
                        {{ calculateAmino }}
                      </v-progress-circular>
                    </div>
                  </v-card-text>
                </router-link>
                <v-card-actions>
                  <v-btn depressed fab x-small @click="takeAM" class="add-amino">
                    <v-icon>{{ mdiPlus }}</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="6" lg="6">
              <v-card outlined height="200" to="/phe-diary" class="mr-1 mb-1 stat-card">
                <v-card-text>
                  <p class="mb-6">{{ $t("phe-diary.title") }}</p>
                  <p v-if="pheDiary.length < 2" class="text-center mt-16">
                    <v-icon>{{ mdiPoll }}</v-icon>
                  </p>
                  <apexchart
                    v-if="pheDiary.length >= 2"
                    type="area"
                    height="110"
                    :options="chartOptions"
                    :series="graph"
                    class="ml-n1"
                  ></apexchart>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import Fuse from "fuse.js";
import { parseISO, isToday } from "date-fns";
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
  mdiEmail
} from "@mdi/js";

export default {
  metaInfo() {
    return {
      title: this.$t("statistics.title"),
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
    mdiEmail,
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
    loading: false,
    alert: false
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
      this.icon = item.icon !== undefined && item.icon !== "" ? item.icon : "organic-food";
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
      this.$router.push("/");
    },
    async searchFood() {
      this.loading = true;
      let res, food;
      if (this.$i18n.locale === "de") {
        const res1 = await fetch(this.publicPath + "data/frida-icon-original.json");
        const res2 = await fetch(this.publicPath + "data/deda-icon-original.json");
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
    },
    takeAM() {
      if (this.aminoCounter.length >= 100) {
        this.alert = true;
      } else {
        firebase
          .database()
          .ref(this.user.id + "/aminoCounter")
          .push({
            date: new Date().toISOString()
          });
      }
    }
  },
  computed: {
    calculateAmino() {
      return this.aminoCounter.filter(item => {
        return isToday(parseISO(item.date));
      }).length;
    },
    pheResult() {
      let phe = 0;
      this.pheLog.forEach(item => {
        phe += item.phe;
      });
      return Math.round(phe);
    },
    graph() {
      let newPheDiary = this.pheDiary;
      let chartPheDiary = newPheDiary
        .map(obj => {
          return { x: obj.date, y: obj.phe };
        })
        .sort((a, b) => {
          return parseISO(a.x) - parseISO(b.x);
        });
      return [
        {
          name: "Phe",
          data: chartPheDiary
        }
      ];
    },
    chartOptions() {
      return {
        chart: {
          sparkline: {
            enabled: true
          },
          background: "transparent"
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          type: "datetime"
        },
        theme: {
          mode: this.$vuetify.theme.dark === true ? "dark" : "light"
        },
        colors: ["#3498db"],
        tooltip: {
          enabled: false
        }
      };
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    ...mapState(["user", "pheLog", "aminoCounter", "pheDiary", "settings", "ownFood"])
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

.stat-card {
  border: none;
}

.theme--light.stat-card {
  background-color: #fafafa;
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

.add-amino {
  position: absolute;
  top: 10px;
  right: 10px;
}

.theme--light .amino-router {
  color: rgba(0, 0, 0, 0.6);
  text-decoration: inherit;
}

.theme--dark .amino-router {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: inherit;
}
</style>
