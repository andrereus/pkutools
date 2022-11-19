<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline mt-1">{{ $t("barcode-scanner.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed rounded color="primary" v-bind="attrs" v-on="on" class="mr-3 mb-3">
              {{ $t("barcode-scanner.scan-barcode") }}
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ $t("barcode-scanner.scan-barcode") }}</span>
            </v-card-title>

            <v-card-text>
              <p v-if="loaded === false">{{ $t("barcode-scanner.please-wait") }}</p>
              <StreamBarcodeReader
                v-if="dialog === true"
                ref="scanner"
                @decode="onDecode"
                @loaded="onLoaded"
              ></StreamBarcodeReader>
            </v-card-text>

            <v-card-actions class="mt-n6">
              <v-spacer></v-spacer>
              <v-btn depressed @click="cancel">{{ $t("common.cancel") }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <div v-if="result !== null">
          <v-img
            v-if="result.product.image_small_url"
            :src="result.product.image_small_url"
            max-height="200"
            max-width="200"
            contain
            class="my-6"
          ></v-img>

          <h2 class="headlin my-3">{{ result.product.product_name }}</h2>

          <p class="title font-weight-regular mb-6">
            {{ result.product.nutriments.proteins_100g + result.product.nutriments.proteins_unit }}
            {{ $t("barcode-scanner.protein") }}
          </p>

          <v-text-field
            filled
            rounded
            :label="$t('protein-calculator.weight')"
            v-model.number="weight"
            type="number"
            clearable
          ></v-text-field>

          <p class="title font-weight-regular">~ {{ calculatePhe() }} mg Phe</p>

          <v-btn depressed rounded color="primary" @click="save" class="mr-3 mt-3" v-if="userIsAuthenticated">
            {{ $t("common.add") }}
          </v-btn>
        </div>

        <p class="mt-6 text--secondary">
          <v-icon>{{ mdiInformationVariant }}</v-icon>
          {{ $t("barcode-scanner.info") }}
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { StreamBarcodeReader } from "vue-barcode-reader";
import { mdiInformationVariant } from "@mdi/js";

export default {
  components: {
    StreamBarcodeReader
  },
  metaInfo() {
    return {
      title: this.$t("barcode-scanner.title"),
      meta: [{ name: "description", content: this.$t("app.description") }]
    };
  },
  data: () => ({
    mdiInformationVariant,
    dialog: false,
    loaded: false,
    result: null,
    weight: 100
  }),
  methods: {
    onLoaded() {
      this.loaded = true;
    },
    onDecode(result) {
      fetch("https://world.openfoodfacts.org/api/v0/product/" + result + ".json")
        .then(response => response.json())
        .then(result => {
          console.log(result);
          this.result = result;
        });
      this.loaded = false;
      this.dialog = false;
    },
    cancel() {
      this.loaded = false;
      this.dialog = false;
    },
    calculatePhe() {
      return Math.round((this.weight * (this.result.product.nutriments.proteins_100g * 50)) / 100);
    },
    save() {
      firebase
        .database()
        .ref(this.user.id + "/pheLog")
        .push({
          name: this.result.product.product_name,
          weight: Number(this.weight),
          phe: this.calculatePhe()
        });
      this.$router.push("/");
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

<style lang="scss" scoped>
.v-btn {
  text-transform: none;
}
.hidden {
  display: none;
}
</style>