import { getAll } from "./api.js";

let favorites: Favorite[] | null = null;

async function getFavorites(): Promise<void> {
    if (favorites === null || favorites.length === 0) {
        // Fetch favorites from API only if not already fetched
        favorites = await getAll('favorites');
    }
}

async function isFavorite(artistId: number, newFavoritesArray?: Favorite[]): Promise<boolean> {
    if (newFavoritesArray) {
        if (newFavoritesArray.length !== favorites?.length) {
            // Only override favorites if the length is different
            favorites = newFavoritesArray;
        }
    } else {
        // Make sure favorites are fetched before checking
        await getFavorites();
    }

    // Check if any favorite matches the artistId
    return favorites?.some((favorite) => {
        return favorite.artistId === artistId;
    }) ?? false;
}

export { isFavorite, favorites };


