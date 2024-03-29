<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline mt-3">{{ $t("own-food.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
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

          <v-img
            src="../assets/en-own-food.png"
            :alt="$t('own-food.title')"
            max-width="400"
            class="mt-10"
            v-if="$i18n.locale === 'en'"
          ></v-img>
          <v-img
            src="../assets/de-own-food.png"
            :alt="$t('own-food.title')"
            max-width="400"
            class="mt-10"
            v-if="$i18n.locale === 'de'"
          ></v-img>
        </div>

        <div v-if="userIsAuthenticated">
          <v-data-table
            :headers="headers"
            :items="ownFood"
            disable-pagination
            hide-default-footer
            mobile-breakpoint="0"
            class="mb-3"
          >
            <template v-slot:item="{ item }">
              <tr @click="addItem(item)" class="tr-edit">
                <td class="text-start">
                  <img
                    :src="publicPath + 'img/food-icons/' + item.icon + '.svg'"
                    v-if="item.icon !== undefined && item.icon !== ''"
                    onerror="this.src='img/food-icons/organic-food.svg'"
                    width="25"
                    class="food-icon"
                  />
                  <img
                    :src="publicPath + 'img/food-icons/organic-food.svg'"
                    v-if="item.icon === undefined || item.icon === ''"
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
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed rounded color="primary" class="mr-3 mt-3" v-bind="attrs" v-on="on">
                {{ $t("common.add") }}
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-text-field filled rounded label="Name" v-model="editedItem.name" class="mt-6">
                  <template v-slot:append-outer>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn fab small depressed v-bind="attrs" v-on="on" class="mt-n2">
                          <img
                            :src="publicPath + 'img/food-icons/' + editedItem.icon + '.svg'"
                            v-if="editedItem.icon !== undefined && editedItem.icon !== null"
                            width="40"
                            class="food-icon"
                          />
                          <img
                            :src="publicPath + 'img/food-icons/organic-food.svg'"
                            v-if="editedItem.icon === undefined || editedItem.icon === null"
                            width="40"
                            class="food-icon"
                          />
                        </v-btn>
                      </template>
                      <v-card max-width="300" max-height="250" class="overflow-y-auto">
                        <span v-for="(item, index) in foodIcons" :key="index" class="px-1">
                          <img
                            :src="publicPath + 'img/food-icons/' + item.svg + '.svg'"
                            v-if="item.svg !== undefined"
                            width="40"
                            class="food-icon pick-icon"
                            @click="editedItem.icon = item.svg"
                          />
                        </span>
                      </v-card>
                    </v-menu>
                  </template>
                </v-text-field>
                <v-text-field
                  filled
                  rounded
                  :label="$t('own-food.phe')"
                  v-model.number="editedItem.phe"
                  type="number"
                ></v-text-field>
              </v-card-text>

              <v-card-actions class="mt-n6">
                <v-spacer></v-spacer>
                <v-btn depressed color="primary" @click="save">{{ $t("common.save") }}</v-btn>
                <v-btn depressed color="warning" v-if="editedIndex !== -1" @click="deleteItem()">
                  {{ $t("common.delete") }}
                </v-btn>
                <v-btn depressed @click="close">{{ $t("common.cancel") }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <p class="text--secondary mt-5">
            <v-icon>{{ mdiInformationVariant }}</v-icon>
            {{ $t("own-food.note") }}
          </p>

          <v-dialog v-model="dialog2" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">
                  <img
                    :src="publicPath + 'img/food-icons/' + editedItem.icon + '.svg'"
                    v-if="editedItem.icon !== undefined"
                    width="35"
                    class="food-icon"
                  />
                  <img
                    :src="publicPath + 'img/food-icons/organic-food.svg'"
                    v-if="editedItem.icon === undefined"
                    width="35"
                    class="food-icon"
                  />
                  {{ editedItem.name }}
                </span>
              </v-card-title>

              <v-card-text>
                <v-text-field
                  filled
                  rounded
                  :label="$t('own-food.weight')"
                  v-model.number="weight"
                  type="number"
                  class="mt-6"
                  clearable
                ></v-text-field>
                <p class="title font-weight-regular">= {{ calculatePhe() }} mg Phe</p>
                <p class="mt-4 caption">{{ $t("phe-log.preview") }}</p>
                <v-progress-linear
                  :value="((pheResult + calculatePhe()) * 100) / (settings?.maxPhe || 0)"
                  height="5"
                  class="mt-n2 mb-6"
                  rounded
                ></v-progress-linear>
              </v-card-text>

              <v-card-actions class="mt-n6">
                <v-spacer></v-spacer>
                <v-btn depressed color="primary" @click="add">
                  {{ $t("common.add") }}
                </v-btn>
                <v-btn depressed @click="editItem()">{{ $t("common.edit") }}</v-btn>
                <v-btn depressed @click="dialog2 = false">{{ $t("common.cancel") }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="alert" max-width="300">
            <v-card>
              <v-card-title>{{ $t("common.note") }}</v-card-title>
              <v-card-text>{{ $t("own-food.limit") }}</v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="alert = false">{{ $t("common.ok") }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
import { mapState } from "vuex";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import foodIcons from "../components/data/food-icons.json";
import { mdiGoogle, mdiFacebook, mdiInformationVariant, mdiEmail } from "@mdi/js";

export default {
  metaInfo() {
    return {
      title: this.$t("own-food.title"),
      meta: [{ name: "description", content: this.$t("own-food.description") }]
    };
  },
  data: () => ({
    mdiGoogle,
    mdiFacebook,
    mdiInformationVariant,
    mdiEmail,
    publicPath: process.env.BASE_URL,
    dialog: false,
    dialog2: false,
    alert: false,
    menu: false,
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name"
      },
      { text: "Phe", value: "phe" }
    ],
    editedIndex: -1,
    editedKey: null,
    editedItem: {
      name: "",
      icon: null,
      phe: null
    },
    defaultItem: {
      name: "",
      icon: null,
      phe: null
    },
    weight: 100,
    offlineInfo: false,
    foodIcons
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
    editItem() {
      this.dialog2 = false;
      this.dialog = true;
    },
    deleteItem() {
      firebase
        .database()
        .ref(this.user.id + "/ownFood/" + this.editedKey)
        .remove();
      this.close();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.editedKey = null;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        firebase
          .database()
          .ref(this.user.id + "/ownFood/" + this.editedKey)
          .update({
            name: this.editedItem.name,
            icon: this.editedItem.icon || null,
            phe: Number(this.editedItem.phe)
          });
      } else {
        if (this.ownFood.length >= 500) {
          this.alert = true;
        } else {
          firebase
            .database()
            .ref(this.user.id + "/ownFood")
            .push({
              name: this.editedItem.name,
              icon: this.editedItem.icon || null,
              phe: Number(this.editedItem.phe)
            });
        }
      }
      this.close();
    },
    addItem(item) {
      this.weight = 100;
      this.editedIndex = this.ownFood.indexOf(item);
      this.editedKey = item[".key"];
      this.editedItem = Object.assign({}, item);
      this.dialog2 = true;
    },
    calculatePhe() {
      return Math.round((this.weight * this.editedItem.phe) / 100);
    },
    add() {
      firebase
        .database()
        .ref(this.user.id + "/pheLog")
        .push({
          name: this.editedItem.name,
          icon: this.editedItem.icon || null,
          weight: Number(this.weight),
          phe: this.calculatePhe()
        });
      this.dialog2 = false;
      this.$router.push("/");
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
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
    formTitle() {
      if (this.editedIndex === -1) {
        return this.$t("common.add");
      } else {
        return this.$t("common.edit");
      }
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    ...mapState(["user", "ownFood", "pheLog", "settings"])
  }
};
</script>

<style lang="scss" scoped>
.tr-edit {
  cursor: pointer;
}

.theme--dark.v-toolbar.v-sheet {
  background-color: #121212;
}

.food-icon {
  vertical-align: bottom;
}

.pick-icon {
  cursor: pointer;
}

.theme--light.v-data-table {
  background-color: #fafafa;
}

.v-btn {
  text-transform: none;
}
</style>
