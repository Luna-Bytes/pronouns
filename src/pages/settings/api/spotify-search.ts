export const prerender = false;

import type { APIRoute } from "astro";
import { getSpotifyToken } from "../../../lib/spotify";

import { env } from "cloudflare:workers";

export const GET: APIRoute = async ({ url, locals }) => {
    const query = url.searchParams.get("q");
    if (!query) {
        return new Response(JSON.stringify({ error: "Missing q" }), { status: 400 });
    }

    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = env;
    const token = await getSpotifyToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);

    const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
        { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();

    // @ts-ignore
    const tracks = data.tracks.items.map((t: any) => ({
        id: t.id,
        name: t.name,
        artist: t.artists.map((a: any) => a.name).join(", "),
        album: t.album.name,
        image: t.album.images[2]?.url ?? t.album.images[0]?.url,
        uri: t.uri.replace("spotify:", "").replace(":", "/"),
    }));

    return new Response(JSON.stringify(tracks), {
        headers: { "Content-Type": "application/json" },
    });
};