export const prerender = false;

import type { APIRoute} from "astro";
import { db } from "../../db"
import { favoriteMusic } from "../../db/schema"
import {sql} from "drizzle-orm";

export const GET: APIRoute = async () => {
    const rows = await db.select({
        title: favoriteMusic.title,
        artist: favoriteMusic.artist,
        id: favoriteMusic.spotifyId,
        uri: favoriteMusic.spotifyUri,
    }).from(favoriteMusic).orderBy(sql`RANDOM()`);

    return new Response( JSON.stringify(rows), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
        },
    });
};