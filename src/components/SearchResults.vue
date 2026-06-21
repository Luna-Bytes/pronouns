<script setup>
import { useStore } from '@nanostores/vue';
import { searchResults } from '../stores/search.js';
import SpotifyEmbed from "./SpotifyEmbed.vue";
import "../styles/global.css"

const results = useStore(searchResults);
</script>

<template>
  <div class="flex flex-col flex-wrap justify-center gap-2 max-w-2xl p-5">
    <div v-for="track in results" :key="track.id">
      <SpotifyEmbed :uri="track.uri" class="w-full"/>
    </div>
  </div>
</template>