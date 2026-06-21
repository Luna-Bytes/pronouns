export const prerender = false;

import type { APIRoute} from "astro";
import { db } from "../../db"
import {currentMusic} from "../../db/schema"
import {lt, sql} from "drizzle-orm";

export const GET: APIRoute = async () => {
    await db.delete(currentMusic).where(lt(currentMusic.expiresAt, sql`(datetime('now'))`))
    const rows = await db.select({
        title: currentMusic.title,
        artist: currentMusic.artist,
        id: currentMusic.spotifyId,
        uri: currentMusic.spotifyUri
    }).from(currentMusic).orderBy(sql`RANDOM()`);

    return new Response( JSON.stringify(rows), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
        },
    });
};