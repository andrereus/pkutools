<template>
  <div>
    <div v-if="userIsAuthenticated">
      <v-dialog v-model="dialog2" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed rounded class="mr-3 mb-8" v-bind="attrs" v-on="on">
            <v-icon left>{{ mdiBookClock }}</v-icon>
            {{ $t("phe-log.last-added") }}
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            <span class="headline">{{ $t("phe-log.last-added") }}</span>
          </v-card-title>

          <v-card-text>
            <v-data-table
              :headers="headers2"
              :items="lastAdded"
              disable-pagination
              hide-default-footer
              mobile-breakpoint="0"
              class="mt-3 mb-4"
              v-if="lastAdded"
            >
              <template v-slot:item="{ item }">
                <tr @click="addLastAdded(item)" class="tr-edit">
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
                      v-if="(item.icon === undefined || item.icon === '') && item.emoji === undefined"
                      width="25"
                      class="food-icon"
                    />
                    {{ (item.icon === undefined || item.icon === "") && item.emoji !== undefined ? item.emoji : null }}
                    {{ item.name }}
                  </td>
                  <td class="text-start">
                    {{ item.weight }}
                  </td>
                  <td class="text-start">
                    {{ item.phe }}
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>

          <v-card-actions class="mt-n6">
            <v-spacer></v-spacer>
            <v-btn depressed @click="dialog2 = false">{{ $t("common.cancel") }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed rounded class="mr-3 mb-8" v-bind="attrs" v-on="on">
            <v-icon left>{{ mdiPen }}</v-icon>
            {{ $t("phe-log.quick-note") }}
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <p v-if="editedIndex === -1">{{ $t("phe-log.optional-fields") }}</p>
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
              :label="$t('phe-log.weight')"
              :value="editedItem.weight"
              @keyup="editWeight"
              type="number"
              :append-icon="lockedValues ? mdiLock : mdiLockOpenVariant"
              @click:append="lockValues"
            ></v-text-field>

            <v-text-field
              filled
              rounded
              label="Phe (in mg)"
              :value="editedItem.phe"
              @keyup="editPhe"
              type="number"
              :append-icon="lockedValues ? mdiLock : mdiLockOpenVariant"
              @click:append="lockValues"
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

      <v-data-table
        :headers="$i18n.locale === 'en' ? headersEn : headersDe"
        :items="pheLog"
        disable-pagination
        hide-default-footer
        mobile-breakpoint="0"
      >
        <template v-slot:item="{ item }">
          <tr @click="editItem(item)" class="tr-edit">
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
                v-if="(item.icon === undefined || item.icon === '') && item.emoji === undefined"
                width="25"
                class="food-icon"
              />
              {{ (item.icon === undefined || item.icon === "") && item.emoji !== undefined ? item.emoji : null }}
              {{ item.name }}
            </td>
            <td class="text-start">{{ item.weight }}</td>
            <td class="text-start">{{ item.phe }}</td>
          </tr>
        </template>
      </v-data-table>

      <v-progress-linear
        :value="(pheResult * 100) / (settings?.maxPhe || 0)"
        height="15"
        class="mt-8"
        rounded
      ></v-progress-linear>

      <p class="title font-weight-regular mt-6">{{ $t("phe-log.total") }}: {{ pheResult }} mg Phe</p>
      <p class="mt-n2 mb-6">{{ $t("phe-log.remaining") }}: {{ (settings?.maxPhe || 0) - pheResult }} mg Phe</p>

      <v-btn depressed rounded color="primary" class="mr-3 mb-3" @click="saveResult">
        {{ $t("phe-log.save-day") }}
      </v-btn>

      <v-dialog v-model="alert" max-width="300">
        <v-card>
          <v-card-title>{{ $t("common.note") }}</v-card-title>
          <v-card-text>{{ $t("phe-diary.limit") }}</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="alert = false">{{ $t("common.ok") }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

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
import { format } from "date-fns";
import foodIcons from "./data/food-icons.json";
import confetti from "canvas-confetti";
import {
  mdiGoogle,
  mdiFacebook,
  mdiMagnify,
  mdiCalculator,
  mdiCalculatorVariant,
  mdiFoodApple,
  mdiLock,
  mdiLockOpenVariant,
  mdiBarcodeScan,
  mdiPen,
  mdiBookClock
} from "@mdi/js";

export default {
  name: "PheLog",
  data: () => ({
    mdiGoogle,
    mdiFacebook,
    mdiMagnify,
    mdiCalculator,
    mdiCalculatorVariant,
    mdiFoodApple,
    mdiLock,
    mdiLockOpenVariant,
    mdiBarcodeScan,
    mdiPen,
    mdiBookClock,
    publicPath: process.env.BASE_URL,
    dialog: false,
    dialog2: false,
    alert: false,
    headersEn: [
      {
        text: "Name",
        align: "start",
        value: "name"
      },
      { text: "Weight", value: "weight" },
      { text: "Phe", value: "phe" }
    ],
    headersDe: [
      {
        text: "Name",
        align: "start",
        value: "name"
      },
      { text: "Gewicht", value: "weight" },
      { text: "Phe", value: "phe" }
    ],
    headers2: [
      {
        text: "Name",
        align: "start",
        value: "name"
      },
      { text: "Weight", value: "weight" },
      { text: "Phe", value: "phe" }
    ],
    editedIndex: -1,
    editedKey: null,
    editedItem: {
      name: "",
      emoji: null,
      icon: null,
      weight: null,
      phe: null
    },
    defaultItem: {
      name: "",
      emoji: null,
      icon: null,
      weight: null,
      phe: null
    },
    offlineInfo: false,
    lockedValues: false,
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
    editItem(item) {
      this.editedIndex = this.pheLog.indexOf(item);
      this.editedKey = item[".key"];
      this.editedItem = Object.assign({}, item);
      this.lockValues();
      this.dialog = true;
    },
    addLastAdded(item) {
      this.editedItem = Object.assign({}, item);
      this.save();
      this.dialog2 = false;
    },
    deleteItem() {
      firebase
        .database()
        .ref(this.user.id + "/pheLog/" + this.editedKey)
        .remove();
      this.close();
    },
    close() {
      this.lockedValues = false;
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
          .ref(this.user.id + "/pheLog/" + this.editedKey)
          .update({
            name: this.editedItem.name,
            icon: this.editedItem.icon || null,
            weight: Number(this.editedItem.weight),
            phe: Number(this.editedItem.phe)
          });
      } else {
        firebase
          .database()
          .ref(this.user.id + "/pheLog")
          .push({
            name: this.editedItem.name,
            emoji: this.editedItem.emoji,
            icon: this.editedItem.icon || null,
            weight: Number(this.editedItem.weight),
            phe: Number(this.editedItem.phe)
          });
      }
      this.close();
    },
    lockValues() {
      if (this.lockedValues === false) {
        this.editedItem.weight = Number(this.editedItem.weight);
        this.editedItem.phe = Number(this.editedItem.phe);
        this.lockedWeight = this.editedItem.weight;
        this.lockedPhe = this.editedItem.phe;
        this.lockedValues = true;
      } else {
        this.lockedValues = false;
      }
    },
    editWeight(event) {
      if (this.lockedValues === true) {
        const newWeight = Number(event.target.value);
        this.editedItem.phe = Math.round((newWeight * this.lockedPhe) / this.lockedWeight);
        this.editedItem.weight = newWeight;
      } else {
        this.editedItem.weight = event.target.value;
      }
    },
    editPhe(event) {
      if (this.lockedValues === true) {
        const newPhe = Number(event.target.value);
        this.editedItem.weight = Math.round((newPhe * this.lockedWeight) / this.lockedPhe);
        this.editedItem.phe = newPhe;
      } else {
        this.editedItem.phe = event.target.value;
      }
    },
    saveResult() {
      if (this.pheDiary.length >= 100) {
        this.alert = true;
      } else {
        confetti();
        setTimeout(() => {
          let r = confirm(this.$t("phe-log.save-diary") + "?");
          if (r === true) {
            firebase
              .database()
              .ref(this.user.id + "/pheDiary")
              .push({
                date: format(new Date(), "yyyy-MM-dd"),
                phe: this.pheResult,
                log: this.pheLog
              })
              .then(() => {
                firebase
                  .database()
                  .ref(this.user.id + "/pheLog")
                  .remove();
              });
            this.$router.push("phe-diary");
          }
        }, 600);
      }
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  computed: {
    formTitle() {
      if (this.editedIndex === -1) {
        return this.$t("phe-log.quick-note");
      } else {
        return this.$t("common.edit");
      }
    },
    pheResult() {
      let phe = 0;
      this.pheLog.forEach(item => {
        phe += item.phe;
      });
      return Math.round(phe);
    },
    lastAdded() {
      // Get last 3 objects, extract and concatenate "log" arrays, and reverse order.
      return [].concat(...this.pheDiary.slice(-3).map(obj => obj.log)).reverse();
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    ...mapState(["user", "pheLog", "pheDiary", "settings"])
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
