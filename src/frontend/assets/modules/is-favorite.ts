import { getAll } from "./api.js";

let favorites: Array<{ artistId: number }> | null = null;

async function getFavorites(): Promise<void> {
    if (favorites === null) {
        // Fetch favorites from API only if not already fetched
        favorites = await getAll('favorites');
    }
}

async function isFavorite(artistId: number): Promise<boolean> {
    // Make sure favorites are fetched before checking
    await getFavorites();

    // Check if any favorite matches the artistId
    return favorites?.some((favorite) => {
        return favorite.artistId === artistId;
    }) ?? false;
}

export { isFavorite, favorites };


