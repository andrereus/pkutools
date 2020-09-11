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
          {{ $t("app.signin-google") }}
        </v-btn>

        <div v-if="userIsAuthenticated">
          <v-data-table :headers="headers" :items="pheLog" disable-pagination hide-default-footer mobile-breakpoint="0">
            <template v-slot:item="{ item }">
              <tr @click="editItem(item)" class="tr-edit">
                <td class="text-start">{{ item.name }}</td>
                <td class="text-start">{{ item.weight }}</td>
                <td class="text-start">{{ item.phe }}</td>
              </tr>
            </template>
          </v-data-table>

          <p class="title font-weight-regular ml-1 mt-5 mb-5">= {{ pheResult }} mg Phe</p>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed color="primary" class="mr-3 mt-3" v-bind="attrs" v-on="on">
                {{ $t("phe-log.add") }}
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-text-field filled label="Food Name" v-model="editedItem.name" class="mt-6"></v-text-field>

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

                <v-checkbox v-model="lockedValues" :label="$t('phe-log.lock-values')" class="mt-n1"></v-checkbox>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="primary" @click="save">{{ $t("phe-log.save") }}</v-btn>
                <v-btn depressed color="warning" v-if="editedIndex !== -1" @click="deleteItem(editedIndex)">
                  {{ $t("phe-log.delete") }}
                </v-btn>
                <v-btn depressed @click="close">{{ $t("phe-log.cancel") }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn depressed class="mr-3 mt-3" @click="reset">{{ $t("phe-log.reset") }}</v-btn>
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

export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Food Name",
        align: "start",
        value: "name"
      },
      { text: "Weight (in g)", value: "weight" },
      { text: "Phe (in mg)", value: "phe" }
    ],
    editedIndex: -1,
    editedItem: {
      name: null,
      weight: null,
      phe: null
    },
    defaultItem: {
      name: null,
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
      this.lockedValues = false;
      this.close();
    },
    close() {
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
          .update(this.editedItem);
      } else {
        firebase
          .database()
          .ref(this.user.id + "/pheLog")
          .push(this.editedItem);
      }
      this.lockedValues = false;
      this.close();
    },
    editWeight(event) {
      const newWeight = Number(event.target.value);
      if (this.lockedValues === true) {
        this.editedItem.phe = (newWeight * this.editedItem.phe) / this.editedItem.weight;
      }
      this.editedItem.weight = newWeight;
    },
    editPhe(event) {
      const newPhe = Number(event.target.value);
      if (this.lockedValues === true) {
        this.editedItem.weight = (newPhe * this.editedItem.weight) / this.editedItem.phe;
      }
      this.editedItem.phe = newPhe;
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
      return phe;
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    ...mapState(["user", "pheLog"])
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
</style>
