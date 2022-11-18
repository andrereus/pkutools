<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline mt-1">Barcode Scanner</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed rounded color="primary" v-bind="attrs" v-on="on" class="mr-3 mb-3">Barcode scannen</v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">Barcode scannen</span>
            </v-card-title>

            <v-card-text>
              <StreamBarcodeReader
                v-if="dialog === true"
                ref="scanner"
                @decode="onDecode"
                @loaded="onLoaded"
              ></StreamBarcodeReader>
            </v-card-text>

            <v-card-actions class="mt-n6">
              <v-spacer></v-spacer>
              <v-btn depressed @click="dialog = false">{{ $t("common.cancel") }}</v-btn>
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
            {{ result.product.nutriments.proteins_100g + result.product.nutriments.proteins_unit }} Eiweiß pro 100g
          </p>

          <v-text-field
            filled
            rounded
            :label="$t('protein-calculator.weight')"
            v-model.number="weight"
            type="number"
            clearable
          ></v-text-field>

          <p class="title font-weight-regular">~ 0 mg Phe</p>

          <v-btn depressed rounded color="primary" class="mr-3 mt-3">
            {{ $t("common.add") }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";

export default {
  components: {
    StreamBarcodeReader
  },
  metaInfo() {
    return {
      title: this.$t("about.title"),
      meta: [{ name: "description", content: this.$t("about.description") }]
    };
  },
  data: () => ({
    dialog: false,
    result: null
  }),
  methods: {
    onDecode(result) {
      fetch("https://world.openfoodfacts.org/api/v0/product/" + result + ".json")
        .then(response => response.json())
        .then(result => {
          console.log(result);
          this.result = result;
        });
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
</style>
