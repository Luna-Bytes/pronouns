import { defineMiddleware } from "astro:middleware";
import { jwtVerify, createRemoteJWKSet } from "jose";

const TEAM_DOMAIN = "lunabytes.cloudflareaccess.com"; // not sensitive, fine as a constant

const JWKS = createRemoteJWKSet(
    new URL(`https://${TEAM_DOMAIN}/cdn-cgi/access/certs`)
);

export const onRequest = defineMiddleware(async (context, next) => {
    const { pathname } = context.url;
    const protectedPath = pathname === "/settings" || pathname.startsWith("/settings/api");

    if (protectedPath && import.meta.env.PROD) {
        const AUD = context.locals.runtime.env.AUD;

        const token = context.request.headers.get("Cf-Access-Jwt-Assertion");
        if (!token) return new Response("Unauthorized", { status: 401 });

        try {
            const { payload } = await jwtVerify(token, JWKS, {
                issuer: `https://${TEAM_DOMAIN}`,
                audience: AUD,
            });
            context.locals.user = { email: payload.email as string };
        } catch {
            return new Response("Unauthorized", { status: 401 });
        }
    }
    return next();
});