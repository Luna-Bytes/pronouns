let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getSpotifyToken(clientId: string, clientSecret: string) {
    if (cachedToken && cachedToken.expiresAt > Date.now()) {
        return cachedToken.token;
    }

    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
        },
        body: "grant_type=client_credentials",
    });

    if (!res.ok) throw new Error("Failed to get Spotify token");

    const data = await res.json();
    cachedToken = {
        // @ts-ignore
        token: data.access_token,
        // @ts-ignore
        expiresAt: Date.now() + data.expires_in * 1000 - 5000, // refresh 5s early
    };
    return cachedToken.token;
}