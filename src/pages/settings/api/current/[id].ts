export const prerender = false;

import type { APIRoute } from "astro";
import { db } from "../../../../db"
import {currentMusic} from "../../../../db/schema.ts";
import {env} from "cloudflare:workers";
import {getSpotifyToken} from "../../../../lib/spotify.ts";
import {eq} from "drizzle-orm";

export const POST: APIRoute = async ({ params }) => {
    const trackId = params.id;

    if (!trackId) {
        return new Response(JSON.stringify({ error: "Missing track id" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = env;
    const token = await getSpotifyToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);

    const res = await fetch(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();

    // @ts-ignore
    const track = {
        name: data.name,
        artist: data.artists.map((a: any) => a.name).join(", "),
        album: data.album.name,
        uri: data.uri.replace("spotify:", "").replace(":", "/"),
    };

    await db.insert(currentMusic).values({
        title: track.name,
        artist: track.artist,
        album: track.album,
        spotifyId: trackId,
        spotifyUri: track.uri,
    });

    return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
    });
};

export const DELETE: APIRoute = async ({ params }) => {
    const trackId = params.id;

    if (!trackId) {
        return new Response(JSON.stringify({ error: "Missing track id" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    await db.delete(currentMusic).where(eq(currentMusic.spotifyId, trackId))

    return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
    });
};