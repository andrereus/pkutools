<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <a
          href="https://www.iubenda.com/privacy-policy/19763599"
          class="iubenda-nostyle no-brand iubenda-embed iub-no-markup iub-body-embed"
          :title="$t('privacy-policy.title')"
        >
          {{ $t("privacy-policy.title") }}
        </a>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$t("privacy-policy.title")
    };
  },
  mounted() {
    let s = document.createElement("script"),
      tag = document.getElementsByTagName("script")[0];
    s.src = "https://cdn.iubenda.com/iubenda.js";
    tag.parentNode.insertBefore(s, tag);
  }
};
</script>
