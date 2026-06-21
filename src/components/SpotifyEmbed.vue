<script lang="ts">
import {defineComponent} from 'vue'

let uri;
export default defineComponent({
  name: "SpotifyEmbed",
  props: {
    uri: String,
  }
})
</script>

<template>
  <iframe
      :src="`https://open.spotify.com/embed/track/${uri?.split(':').pop()}`"
      width="max"
      height="152"
      allowfullscreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
  ></iframe>
</template>

<style scoped>

</style>