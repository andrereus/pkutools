<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("phe-diary.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-btn depressed v-if="!userIsAuthenticated" @click="signInGoogle" class="mt-2">
          <v-icon left>mdi-google</v-icon>
          {{ $t("app.signin-google") }}
        </v-btn>

        <div v-if="userIsAuthenticated">
          <v-sparkline :value="graph" fill smooth></v-sparkline>

          <v-data-table
            :headers="headers"
            :items="pheDiary"
            disable-pagination
            hide-default-footer
            mobile-breakpoint="0"
            sort-by="date"
            class="mb-3"
          >
            <template v-slot:item="{ item }">
              <tr @click="editItem(item)" class="tr-edit">
                <td class="text-start">{{ getlocalDate(item.date) }}</td>
                <td class="text-start">{{ item.phe }}</td>
              </tr>
            </template>
          </v-data-table>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed color="primary" class="mr-3 mt-3" v-bind="attrs" v-on="on">
                {{ $t("phe-diary.add") }}
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="computelocalDate"
                      :label="$t('phe-diary.date')"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      class="mt-4"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="editedItem.date" no-title scrollable @input="menu = false"></v-date-picker>
                </v-menu>

                <v-text-field filled label="Phe (in mg)" v-model.number="editedItem.phe" type="number"></v-text-field>
              </v-card-text>

              <v-card-actions class="mt-n6">
                <v-spacer></v-spacer>
                <v-btn depressed color="primary" @click="save">{{ $t("phe-diary.save") }}</v-btn>
                <v-btn depressed color="warning" v-if="editedIndex !== -1" @click="deleteItem(editedIndex)">
                  {{ $t("phe-diary.delete") }}
                </v-btn>
                <v-btn depressed @click="close">{{ $t("phe-diary.cancel") }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn depressed class="mr-3 mt-3" @click="reset">{{ $t("phe-diary.reset") }}</v-btn>
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
import { format, parseISO } from "date-fns";
import { enUS, de } from "date-fns/locale";

export default {
  metaInfo() {
    return {
      title: this.$t("phe-diary.title"),
      description: this.$t("phe-diary.description")
    };
  },
  data: () => ({
    dialog: false,
    menu: false,
    headers: [
      {
        text: "Date",
        align: "start",
        value: "date"
      },
      { text: "Phe", value: "phe" }
    ],
    editedIndex: -1,
    editedItem: {
      date: "",
      phe: null
    },
    defaultItem: {
      date: "",
      phe: null
    },
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
      let r = confirm(this.$t("phe-diary.reset") + "?");
      if (r === true) {
        firebase
          .database()
          .ref(this.user.id + "/pheDiary")
          .remove();
      }
    },
    editItem(item) {
      this.editedIndex = this.pheDiary.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(editedIndex) {
      firebase
        .database()
        .ref(this.user.id + "/pheDiary")
        .once("value", snapshot => {
          this.editedKey = Object.keys(snapshot.val())[editedIndex];
        });
      firebase
        .database()
        .ref(this.user.id + "/pheDiary/" + this.editedKey)
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
          .ref(this.user.id + "/pheDiary")
          .once("value", snapshot => {
            this.editedKey = Object.keys(snapshot.val())[this.editedIndex];
          });
        firebase
          .database()
          .ref(this.user.id + "/pheDiary/" + this.editedKey)
          .update({
            date: this.editedItem.date,
            phe: Number(this.editedItem.phe)
          });
      } else {
        firebase
          .database()
          .ref(this.user.id + "/pheDiary")
          .push({
            date: this.editedItem.date,
            phe: Number(this.editedItem.phe)
          });
      }
      this.close();
    },
    getlocalDate(date) {
      if (date) {
        const locales = { enUS, de };
        return format(parseISO(date), "PP", { locale: locales[this.$i18n.locale] });
      } else {
        return "";
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
        return this.$t("phe-diary.add");
      } else {
        return this.$t("phe-diary.edit");
      }
    },
    computelocalDate() {
      if (this.editedItem.date) {
        const locales = { enUS, de };
        return format(parseISO(this.editedItem.date), "PP", { locale: locales[this.$i18n.locale] });
      } else {
        return "";
      }
    },
    graph() {
      return this.pheDiary.map(obj => obj.phe);
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    ...mapState(["user", "pheDiary", "settings"])
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
