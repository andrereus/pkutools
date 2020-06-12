<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2 class="headline">{{ $t("amino-counter.title") }}</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <p>{{ $t("amino-counter.description") }}</p>

        <v-progress-linear :value="(count * 100) / max" height="40" class="white--text mt-6 mb-4">
          {{ $t("amino-counter.progress", { count, max }) }}
        </v-progress-linear>

        <v-btn depressed @click="count++" color="primary" class="mr-3 mt-3">{{ $t("amino-counter.take") }}</v-btn>
        <v-btn depressed @click="count = 0" class="mr-3 mt-3">{{ $t("amino-counter.reset") }}</v-btn>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed v-bind="attrs" v-on="on" class="mr-3 mt-3">
              {{ $t("amino-counter.settings") }}
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ $t("amino-counter.settings") }}</span>
            </v-card-title>

            <v-card-text>
              <v-text-field
                outlined
                :label="$t('amino-counter.amount')"
                v-model.number="max"
                type="number"
                class="mt-6"
              ></v-text-field>
            </v-card-text>

            <v-card-actions class="mt-n6">
              <v-spacer></v-spacer>
              <v-btn depressed @click="dialog = false">{{ $t("amino-counter.ok") }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    count: 0,
    max: 3
  }),
  mounted() {
    if (localStorage.aminoCounterCount) {
      this.count = JSON.parse(localStorage.aminoCounterCount);
    }
    if (localStorage.aminoCounterMax) {
      this.max = JSON.parse(localStorage.aminoCounterMax);
    }
  },
  watch: {
    count(newCount) {
      localStorage.aminoCounterCount = JSON.stringify(newCount);
    },
    max(newMax) {
      localStorage.aminoCounterMax = JSON.stringify(newMax);
    }
  }
};
</script>
