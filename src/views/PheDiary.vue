<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("phe-diary.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <div v-if="!userIsAuthenticated">
          <v-btn depressed rounded @click="signInGoogle" class="mt-2">
            <v-icon left>mdi-google</v-icon>
            {{ $t("app.signin-google") }}
          </v-btn>
          <br />
          <v-btn depressed rounded @click="signInFacebook" class="mt-2">
            <v-icon left>mdi-facebook</v-icon>
            {{ $t("app.signin-facebook") }}
          </v-btn>

          <v-img
            src="../assets/en-phe-diary.png"
            :alt="$t('phe-diary.title')"
            max-width="400"
            class="mt-10"
            v-if="$i18n.locale === 'en'"
          ></v-img>
          <v-img
            src="../assets/de-phe-diary.png"
            :alt="$t('phe-diary.title')"
            max-width="400"
            class="mt-10"
            v-if="$i18n.locale === 'de'"
          ></v-img>
        </div>

        <div v-if="userIsAuthenticated">
          <apexchart
            v-if="pheDiary.length >= 1"
            type="bar"
            height="300"
            :options="chartOptions"
            :series="graph"
          ></apexchart>

          <v-data-table
            :headers="headers"
            :items="pheDiary"
            disable-pagination
            hide-default-footer
            mobile-breakpoint="0"
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
              <v-btn depressed rounded color="primary" class="mr-3 mt-3" v-bind="attrs" v-on="on">
                {{ $t("common.add") }}
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
                      filled
                      rounded
                      :value="computelocalDate"
                      :label="$t('phe-diary.date')"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      class="mt-4"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="editedItem.date" no-title scrollable @input="menu = false"></v-date-picker>
                </v-menu>

                <v-text-field
                  filled
                  rounded
                  :label="$t('phe-diary.phe')"
                  v-model.number="editedItem.phe"
                  type="number"
                ></v-text-field>

                <p v-if="editedItem.log" class="ml-2 mt-n2 text-caption">{{ $t("phe-diary.log") }}</p>

                <v-data-table
                  :headers="headers2"
                  :items="editedItem.log"
                  disable-pagination
                  hide-default-footer
                  mobile-breakpoint="0"
                  class="table-read-only mt-n2 mb-6"
                  v-if="editedItem.log"
                >
                  <template v-slot:item="{ item }">
                    <tr class="tr-read-only">
                      <td class="text-start">
                        <img
                          :src="publicPath + 'img/food-icons/' + item.icon + '.svg'"
                          v-if="item.icon !== undefined && item.icon !== 'Organic Food.svg'"
                          width="25"
                          class="food-icon"
                        />
                        <img
                          :src="publicPath + 'img/food-icons/organic-food.svg'"
                          v-if="item.icon === undefined || item.icon === 'Organic Food.svg'"
                          width="25"
                          class="food-icon"
                        />
                        {{ item.name }}
                      </td>
                      <td class="text-start">{{ item.phe }}</td>
                    </tr>
                  </template>
                </v-data-table>
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

          <v-btn depressed rounded class="mr-3 mt-3" @click="exportDiary">{{ $t("phe-diary.export") }}</v-btn>
          <v-btn depressed rounded class="mr-3 mt-3" @click="reset">{{ $t("common.reset") }}</v-btn>

          <p class="text--secondary mt-5">
            <v-icon>mdi-information-variant</v-icon>
            {{ $t("phe-diary.note") }}
          </p>
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
import { format, parseISO, formatISO } from "date-fns";
import { enUS, de } from "date-fns/locale";
import XLSX from "xlsx";
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts
  },
  metaInfo() {
    return {
      title: this.$t("phe-diary.title"),
      meta: [{ name: "description", content: this.$t("phe-diary.description") }]
    };
  },
  data: () => ({
    publicPath: process.env.BASE_URL,
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
    headers2: [
      {
        text: "Name",
        align: "start",
        value: "name"
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
    offlineInfo: false,
    chartOptions: {
      chart: {
        height: 300,
        type: "bar",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        show: false
      }
    }
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
    reset() {
      let r = confirm(this.$t("common.reset") + "?");
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
      let r = confirm(this.$t("common.delete") + "?");
      if (r === true) {
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
      }
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
        if (this.pheDiary.length >= 90) {
          alert(this.$t("phe-diary.limit") + ".");
        } else {
          firebase
            .database()
            .ref(this.user.id + "/pheDiary")
            .push({
              date: this.editedItem.date,
              phe: Number(this.editedItem.phe)
            });
        }
      }
      this.close();
    },
    getlocalDate(date) {
      if (date) {
        const locales = { enUS, de };
        return format(parseISO(date), "eee P", { locale: locales[this.$i18n.locale] });
      } else {
        return "";
      }
    },
    exportDiary() {
      let r = confirm(this.$t("phe-diary.export-confirm") + ".");
      if (r === true) {
        let exportTable = this.pheDiary.map(item => {
          if (this.$i18n.locale === "de") {
            return {
              Datum: formatISO(parseISO(item.date), { representation: "date" }),
              Phe: item.phe
            };
          } else {
            return {
              Date: formatISO(parseISO(item.date), { representation: "date" }),
              Phe: item.phe
            };
          }
        });

        let workbook = XLSX.utils.book_new();

        let worksheet = XLSX.utils.json_to_sheet(exportTable);
        XLSX.utils.book_append_sheet(workbook, worksheet, this.$t("phe-diary.export-overview") + "");

        this.pheDiary.forEach(item => {
          if (item.log !== undefined) {
            let exportTable2 = item.log.map(item => {
              if (this.$i18n.locale === "de") {
                return {
                  Name: item.name,
                  Gewicht: item.weight,
                  Phe: item.phe
                };
              } else {
                return {
                  Name: item.name,
                  Weight: item.weight,
                  Phe: item.phe
                };
              }
            });

            let worksheet2 = XLSX.utils.json_to_sheet(exportTable2);
            XLSX.utils.book_append_sheet(
              workbook,
              worksheet2,
              formatISO(parseISO(item.date), { representation: "date" })
            );
          }
        });

        XLSX.writeFile(workbook, this.$t("phe-diary.export-filename") + ".xlsx");
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
        return this.$t("common.add");
      } else {
        return this.$t("common.edit");
      }
    },
    computelocalDate() {
      if (this.editedItem.date) {
        const locales = { enUS, de };
        return format(parseISO(this.editedItem.date), "eee P", { locale: locales[this.$i18n.locale] });
      } else {
        return "";
      }
    },
    graph() {
      let newPheDiary = this.pheDiary;
      let finalPheDiary = newPheDiary.map(obj => {
        return { x: obj.date, y: obj.phe };
      });
      return [
        {
          name: "Phe",
          data: finalPheDiary
        }
      ];
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

.food-icon {
  vertical-align: bottom;
}

.theme--light.v-data-table {
  background-color: #fafafa;
}

.v-btn {
  text-transform: none;
}

.theme--dark.table-read-only {
  background-color: #2e2e2e;
}

.tr-read-only:hover {
  background-color: inherit !important;
}
</style>
