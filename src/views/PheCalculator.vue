<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("phe-calculator.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-text-field filled :label="$t('phe-calculator.phe')" v-model.number="phe" type="number"></v-text-field>
        <v-text-field filled :label="$t('phe-calculator.weight')" v-model.number="weight" type="number"></v-text-field>

        <p class="title font-weight-regular">= {{ calculatePhe() }} mg Phe</p>

        <v-dialog v-model="dialog" max-width="500px" v-if="userIsAuthenticated">
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed color="primary" v-bind="attrs" v-on="on" class="mr-3 mt-3">
              {{ $t("common.save") }}
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ $t("common.save") }}</span>
            </v-card-title>

            <v-card-text>
              <v-text-field filled :label="$t('phe-calculator.name')" v-model="name" class="mt-6"></v-text-field>
            </v-card-text>

            <v-card-actions class="mt-n6">
              <v-spacer></v-spacer>
              <v-btn depressed color="primary" @click="save">{{ $t("common.save") }}</v-btn>
              <v-btn depressed @click="dialog = false">{{ $t("common.cancel") }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as firebase from "firebase/app";
import "firebase/database";

export default {
  metaInfo() {
    return {
      title: this.$t("phe-calculator.title"),
      meta: [{ name: "description", content: this.$t("phe-calculator.description") }]
    };
  },
  data: () => ({
    dialog: false,
    phe: null,
    weight: null,
    name: ""
  }),
  methods: {
    calculatePhe() {
      return Math.round((this.weight * this.phe) / 100);
    },
    save() {
      firebase
        .database()
        .ref(this.user.id + "/pheLog")
        .push({
          name: this.name,
          weight: Number(this.weight),
          phe: this.calculatePhe()
        });
      this.dialog = false;
      this.$router.push("phe-log");
    }
  },
  computed: {
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    ...mapState(["user"])
  }
};
</script>
