export const prerender = false;

import type { APIRoute } from "astro";
import { getSpotifyToken } from "../../../lib/spotify.ts";

import { env } from "cloudflare:workers";

export const GET: APIRoute = async ({ url, locals }) => {
    const query = url.searchParams.get("q");
    if (!query) {
        return new Response(JSON.stringify({ error: "Missing q" }), { status: 400 });
    }

    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = env;
    const token = await getSpotifyToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);

    const res = await fetch(
        `https://api.spotify.com/v1/playlists/${query}?fields=tracks.items(item(uri))`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();


    if (!res.ok || !data.items) {
        console.error("Spotify error:", res.status, data);
        return new Response(JSON.stringify({ error: "Spotify request failed", details: data }), { status: res.status });
    }

    console.log(data);

    // @ts-ignore
    const uris = data.tracks.items.map((t: any) => ({
        id: t.item.uri.split(":")[2],
        uri: t.item.uri.replace("spotify:", "").replace(":", "/"),
    }));

    return new Response(JSON.stringify(uris), {
        headers: { "Content-Type": "application/json" },
    });
};