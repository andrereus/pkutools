<template>
  <div>
    <v-row justify="center" v-if="!userIsAuthenticated">
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
          <template>
            <v-data-table :headers="headers" :items="food" disable-pagination hide-default-footer mobile-breakpoint="0">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>{{ $t("phe-log.title") }}</v-toolbar-title>
                  <v-spacer></v-spacer>

                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn depressed v-bind="attrs" v-on="on">Add</v-btn>
                    </template>

                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text v-if="editedIndex === -1">
                        <v-text-field filled label="Food Name" v-model="editedItem.name" class="mt-6"></v-text-field>

                        <v-text-field
                          filled
                          label="Weight (in g)"
                          v-model.number="editedItem.weight"
                          type="number"
                        ></v-text-field>

                        <v-text-field
                          filled
                          label="Phe (in mg)"
                          v-model.number="editedItem.phe"
                          type="number"
                        ></v-text-field>
                      </v-card-text>

                      <v-card-text v-if="editedIndex !== -1">
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
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed color="primary" @click="save">Save</v-btn>
                        <v-btn depressed color="warning" v-if="editedIndex !== -1" @click="deleteItem(editedIndex)">
                          Delete
                        </v-btn>
                        <v-btn depressed @click="close">Cancel</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>

              <template v-slot:item="{ item }">
                <tr @click="editItem(item)" class="tr-edit">
                  <td class="text-start">{{ item.name }}</td>
                  <td class="text-start">{{ item.weight }}</td>
                  <td class="text-start">{{ item.phe }}</td>
                </tr>
              </template>

              <template v-slot:no-data>
                <v-btn depressed @click="initialize">Reset</v-btn>
              </template>
            </v-data-table>
          </template>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import "firebase/auth";
import "firebase/firestore";

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
    food: null,
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
    }
  }),
  methods: {
    signInGoogle() {
      this.$store.dispatch("signInGoogle");
    },
    initialize() {
      this.food = [
        {
          name: "Frozen Yogurt",
          weight: 100,
          phe: 100
        },
        {
          name: "Ice cream sandwich",
          weight: 50,
          phe: 100
        }
      ];
    },
    editItem(item) {
      this.editedIndex = this.food.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(editedIndex) {
      this.food.splice(editedIndex, 1);
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
        Object.assign(this.food[this.editedIndex], this.editedItem);
      } else {
        this.food.push(this.editedItem);
      }
      this.close();
    },
    editWeight(event) {
      const newWeight = Number(event.target.value);
      if (newWeight !== 0) {
        this.editedItem.phe = (newWeight * this.editedItem.phe) / this.editedItem.weight;
        this.editedItem.weight = newWeight;
      }
    },
    editPhe(event) {
      const newPhe = Number(event.target.value);
      if (newPhe !== 0) {
        this.editedItem.weight = (newPhe * this.editedItem.weight) / this.editedItem.phe;
        this.editedItem.phe = newPhe;
      }
    }
  },
  created() {
    this.initialize();
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add" : "Edit";
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined && this.pheLog !== null; // TODO: undefined
    },
    ...mapState(["user", "pheLog"])
  }
};
</script>

<style lang="scss" scoped>
.tr-edit {
  cursor: pointer;
}
</style>
