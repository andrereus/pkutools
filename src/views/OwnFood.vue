<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">
          {{ $t("own-food.title") }}
          <v-chip color="green" outlined>{{ $t("app.new") }}</v-chip>
        </h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-btn depressed v-if="!userIsAuthenticated" @click="signInGoogle" class="mt-2">
          <v-icon left>mdi-google</v-icon>
          {{ $t("app.signin-google") }}
        </v-btn>

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
              <tr>
                <td class="text-start">{{ item.name }}</td>
                <td class="text-start">{{ item.phe }}</td>
                <td class="text-start">
                  <v-icon dense @click="editItem(item)" class="mr-4">mdi-pencil</v-icon>
                  <v-icon dense @click="addItem(item)">mdi-book-plus</v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed color="primary" class="mr-3 mt-3" v-bind="attrs" v-on="on">
                {{ $t("common.add") }}
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
                  :label="$t('own-food.phe')"
                  v-model.number="editedItem.phe"
                  type="number"
                ></v-text-field>
              </v-card-text>

              <v-card-actions class="mt-n6">
                <v-spacer></v-spacer>
                <v-btn depressed color="primary" @click="save">{{ $t("common.save") }}</v-btn>
                <v-btn depressed color="warning" v-if="editedIndex !== -1" @click="deleteItem(editedIndex)">
                  {{ $t("common.delete") }}
                </v-btn>
                <v-btn depressed @click="close">{{ $t("common.cancel") }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn depressed class="mr-3 mt-3" @click="reset">{{ $t("common.reset") }}</v-btn>

          <v-dialog v-model="dialog2" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ editedItem.name }}</span>
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
                <v-btn depressed color="primary" @click="add">
                  {{ $t("common.add") }}
                </v-btn>
                <v-btn depressed @click="dialog2 = false">{{ $t("common.cancel") }}</v-btn>
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
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default {
  metaInfo() {
    return {
      title: this.$t("own-food.title"),
      meta: [{ name: "description", content: this.$t("own-food.description") }]
    };
  },
  data: () => ({
    dialog: false,
    dialog2: false,
    menu: false,
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name"
      },
      { text: "Phe", value: "phe" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      phe: null
    },
    defaultItem: {
      name: "",
      phe: null
    },
    weight: 100,
    offlineInfo: false
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
      let r = confirm(this.$t("common.reset") + "?");
      if (r === true) {
        firebase
          .database()
          .ref(this.user.id + "/ownFood")
          .remove();
      }
    },
    editItem(item) {
      this.editedIndex = this.ownFood.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(editedIndex) {
      firebase
        .database()
        .ref(this.user.id + "/ownFood")
        .once("value", snapshot => {
          this.editedKey = Object.keys(snapshot.val())[editedIndex];
        });
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
      });
    },
    save() {
      if (this.editedIndex > -1) {
        firebase
          .database()
          .ref(this.user.id + "/ownFood")
          .once("value", snapshot => {
            this.editedKey = Object.keys(snapshot.val())[this.editedIndex];
          });
        firebase
          .database()
          .ref(this.user.id + "/ownFood/" + this.editedKey)
          .update({
            name: this.editedItem.name,
            phe: Number(this.editedItem.phe)
          });
      } else {
        firebase
          .database()
          .ref(this.user.id + "/ownFood")
          .push({
            name: this.editedItem.name,
            phe: Number(this.editedItem.phe)
          });
      }
      this.close();
    },
    addItem(item) {
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
          weight: Number(this.weight),
          phe: this.calculatePhe()
        });
      this.dialog2 = false;
      this.$router.push("phe-log");
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
        return this.$t("common.add");
      } else {
        return this.$t("common.edit");
      }
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    ...mapState(["user", "ownFood", "settings"])
  }
};
</script>

<style lang="scss" scoped>
.theme--dark.v-toolbar.v-sheet {
  background-color: #121212;
}

.theme--light.v-data-table {
  background-color: #fafafa;
}

.v-btn {
  text-transform: none;
}
</style>
