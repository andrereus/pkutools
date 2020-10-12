<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("phe-log.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-btn depressed v-if="!userIsAuthenticated" @click="signInGoogle" class="mt-2">
          <v-icon left>mdi-google</v-icon>
          {{ $t("app.signin-google") }}
        </v-btn>

        <div v-if="userIsAuthenticated">
          <v-data-table :headers="headers" :items="pheLog" disable-pagination hide-default-footer mobile-breakpoint="0">
            <template v-slot:item="{ item }">
              <tr @click="editItem(item)" class="tr-edit">
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
                <td class="text-start">{{ item.weight }}</td>
                <td class="text-start">{{ item.phe }}</td>
              </tr>
            </template>
          </v-data-table>

          <v-progress-linear
            :value="(pheResult * 100) / (settings.maxPhe || 0)"
            height="10"
            class="mt-8"
            rounded
          ></v-progress-linear>

          <p class="title font-weight-regular my-6">= {{ pheResult }} mg Phe</p>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed color="primary" class="mr-3 mb-3" v-bind="attrs" v-on="on">
                {{ $t("phe-log.add") }}
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-text-field filled label="Name" v-model="editedItem.name" class="mt-6"></v-text-field>

                <v-text-field
                  filled
                  label="Weight (in g)"
                  :value="editedItem.weight"
                  @keyup="editWeight"
                  type="number"
                ></v-text-field>

                <v-text-field
                  filled
                  label="Phe (in mg)"
                  :value="editedItem.phe"
                  @keyup="editPhe"
                  type="number"
                ></v-text-field>

                <div class="checkbox-clearfix">
                  <v-checkbox
                    :value="lockedValues"
                    @click="lockValues"
                    :label="$t('phe-log.lock-values')"
                    class="mt-n1 float-left"
                  ></v-checkbox>

                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" class="ml-2">mdi-information-outline</v-icon>
                    </template>
                    <span>{{ $t("phe-log.lock-info") }}</span>
                  </v-tooltip>
                </div>
              </v-card-text>

              <v-card-actions class="mt-n6">
                <v-spacer></v-spacer>
                <v-btn depressed color="primary" @click="save">{{ $t("phe-log.save") }}</v-btn>
                <v-btn depressed color="warning" v-if="editedIndex !== -1" @click="deleteItem(editedIndex)">
                  {{ $t("phe-log.delete") }}
                </v-btn>
                <v-btn depressed @click="close">{{ $t("phe-log.cancel") }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn depressed class="mr-3 mb-3" @click="saveResult">{{ $t("phe-log.save") }}</v-btn>
          <v-btn depressed class="mr-3 mb-3" @click="reset">{{ $t("phe-log.reset") }}</v-btn>

          <v-dialog v-model="dialog2" max-width="500px" @click:outside="setMax">
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed v-bind="attrs" v-on="on" class="mr-3 mb-3">
                {{ $t("phe-log.settings") }}
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{ $t("phe-log.settings") }}</span>
              </v-card-title>

              <v-card-text>
                <v-text-field
                  filled
                  :label="$t('phe-log.max')"
                  v-model.number="settings.maxPhe"
                  type="number"
                  class="mt-6"
                ></v-text-field>
              </v-card-text>

              <v-card-actions class="mt-n6">
                <v-spacer></v-spacer>
                <v-btn depressed @click="setMax">{{ $t("phe-log.ok") }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>

    <v-snackbar top color="warning" v-model="offlineInfo">
      {{ $t("app.offline") }}
      <v-btn text @click="offlineInfo = false">
        {{ $t("app.close") }}
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { format } from "date-fns";

export default {
  data: () => ({
    publicPath: process.env.BASE_URL,
    dialog: false,
    dialog2: false,
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name"
      },
      { text: "Weight (in g)", value: "weight" },
      { text: "Phe (in mg)", value: "phe" }
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      weight: null,
      phe: null
    },
    defaultItem: {
      name: "",
      weight: null,
      phe: null
    },
    offlineInfo: false,
    lockedValues: false
  }),
  methods: {
    signInGoogle() {
      if (navigator.onLine) {
        this.$store.dispatch("signInGoogle");
      } else {
        this.offlineInfo = true;
      }
    },
    reset() {
      let r = confirm(this.$t("phe-log.reset") + "?");
      if (r === true) {
        firebase
          .database()
          .ref(this.user.id + "/pheLog")
          .remove();
      }
    },
    editItem(item) {
      this.editedIndex = this.pheLog.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(editedIndex) {
      firebase
        .database()
        .ref(this.user.id + "/pheLog")
        .once("value", snapshot => {
          this.editedKey = Object.keys(snapshot.val())[editedIndex];
        });
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
      });
    },
    save() {
      if (this.editedIndex > -1) {
        firebase
          .database()
          .ref(this.user.id + "/pheLog")
          .once("value", snapshot => {
            this.editedKey = Object.keys(snapshot.val())[this.editedIndex];
          });
        firebase
          .database()
          .ref(this.user.id + "/pheLog/" + this.editedKey)
          .update({
            name: this.editedItem.name,
            weight: Number(this.editedItem.weight),
            phe: Number(this.editedItem.phe)
          });
      } else {
        firebase
          .database()
          .ref(this.user.id + "/pheLog")
          .push({
            name: this.editedItem.name,
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
    setMax() {
      firebase
        .database()
        .ref(this.user.id + "/settings")
        .update({
          maxPhe: this.settings.maxPhe || 0
        });
      this.dialog2 = false;
    },
    saveResult() {
      let r = confirm(this.$t("phe-log.save-diary") + "?");
      if (r === true) {
        firebase
          .database()
          .ref(this.user.id + "/pheDiary")
          .push({
            date: format(new Date(), "yyyy-MM-dd"),
            phe: this.pheResult
          });
        this.$router.push("phe-diary");
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
        return this.$t("phe-log.add");
      } else {
        return this.$t("phe-log.edit");
      }
    },
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

.checkbox-clearfix {
  overflow: hidden;
}
</style>
