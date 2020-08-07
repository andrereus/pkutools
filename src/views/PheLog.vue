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

                      <v-card-text>
                        <v-text-field filled label="Food Name" v-model="editedItem.name" class="mt-6"></v-text-field>
                        <v-text-field
                          filled
                          label="Phe (in mg)"
                          v-model.number="editedItem.phe"
                          type="number"
                        ></v-text-field>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed @click="save">Save</v-btn>
                        <v-btn depressed @click="close">Cancel</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>

                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn depressed color="primary" @click="initialize">Reset</v-btn>
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
      { text: "Phe (in mg)", value: "phe" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    food: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      phe: 0
    },
    defaultItem: {
      name: "",
      phe: 0
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
          phe: 4.0
        },
        {
          name: "Ice cream sandwich",
          phe: 4.3
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.food.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.food.indexOf(item);
      confirm("Delete?") && this.food.splice(index, 1);
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
