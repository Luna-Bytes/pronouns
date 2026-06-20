export const prerender = false;

import type { APIRoute} from "astro";
import { db } from "../../db"
import { words } from "../../db/schema"
import { desc} from "drizzle-orm";

export const GET: APIRoute = async () => {
    const rows = await db.select().from(words).orderBy(desc(words.id));

    return new Response( JSON.stringify(rows), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
        },
    });
};