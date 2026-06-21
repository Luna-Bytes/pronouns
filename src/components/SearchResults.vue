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
  <div class="flex flex-col flex-wrap justify-center gap-2 p-5">
    <div v-for="track in results" :key="track.id">
      <div class="flex flex-row gap-2">
        <SpotifyEmbed :uri="track.uri" class="w-full"/>
        <div class="flex flex-col h-full justify-evenly text-white">
          <button @click="favorite(track.id)" aria-label="Favorite">
            <Star class="w-8 h-8 hover:text-yellow-300" />
          </button>
          <button @click="setCurrent(track.id)" aria-label="Set as current">
            <Clock class="w-8 h-8 hover:text-blue-200" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>