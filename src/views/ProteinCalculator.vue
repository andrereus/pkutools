<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline mt-1">{{ $t("protein-calculator.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-checkbox v-model="factor" :label="$t('protein-calculator.factor')" class="mt-n1"></v-checkbox>

        <v-text-field
          filled
          rounded
          :label="$t('protein-calculator.protein')"
          v-model.number="protein"
          type="number"
        ></v-text-field>

        <v-text-field
          filled
          rounded
          :label="$t('protein-calculator.weight')"
          v-model.number="weight"
          type="number"
          clearable
        ></v-text-field>

        <p class="title font-weight-regular">~ {{ calculatePhe() }} mg Phe</p>

        <div v-if="userIsAuthenticated">
          <p class="mt-6 caption">{{ $t("phe-log.preview") }}</p>
          <v-progress-linear
            :value="((pheResult + calculatePhe()) * 100) / (settings?.maxPhe || 0)"
            height="5"
            class="mt-n2 mb-4"
            rounded
          ></v-progress-linear>
        </div>

        <v-dialog v-model="dialog" max-width="500px" v-if="userIsAuthenticated">
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed rounded color="primary" v-bind="attrs" v-on="on" class="mr-3 mt-3">
              {{ $t("common.add") }}
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ $t("common.add") }}</span>
            </v-card-title>

            <v-card-text>
              <v-text-field
                filled
                rounded
                :label="$t('protein-calculator.name')"
                v-model="name"
                class="mt-6"
              ></v-text-field>
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
import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default {
  metaInfo() {
    return {
      title: this.$t("protein-calculator.title"),
      meta: [{ name: "description", content: this.$t("protein-calculator.description") }]
    };
  },
  data: () => ({
    dialog: false,
    protein: null,
    weight: 100,
    factor: false,
    name: ""
  }),
  methods: {
    calculateProtein() {
      return Math.round(this.protein * (this.factor ? 30 : 50));
    },
    calculatePhe() {
      return Math.round((this.weight * (this.protein * (this.factor ? 30 : 50))) / 100);
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
      this.$router.push("/");
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
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    ...mapState(["user", "pheLog", "settings"])
  }
};
</script>

<style lang="scss" scoped>
.v-btn {
  text-transform: none;
}
</style>
