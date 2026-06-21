<script setup>
import { useStore } from '@nanostores/vue';
import { searchResults } from '../stores/search.js';
import SpotifyEmbed from "./SpotifyEmbed.vue";
import "../styles/global.css"
import { Star, Clock } from "@lucide/vue";

const results = useStore(searchResults);

async function favorite(trackId) {
  await fetch(`/settings/api/favorite/${trackId}`, { method: "POST" });
}

async function setCurrent(trackId) {
  await fetch(`/settings/api/current/${trackId}`, { method: "POST" });
}
</script>

<template>
  <div class="flex flex-col flex-wrap justify-center gap-2 max-w-2xl p-5">
    <div v-for="track in results" :key="track.id">
      <SpotifyEmbed :uri="track.uri" class="w-full"/>
      <button @click="favorite(track.id)" aria-label="Favorite">
        <Star class="w-5 h-5" />
      </button>
      <button @click="setCurrent(track.id)" aria-label="Set as current">
        <Clock class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>