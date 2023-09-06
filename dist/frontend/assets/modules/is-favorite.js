import { getAll } from "./api.js";
let favorites = null;
async function getFavorites() {
    if (favorites === null || favorites.length === 0) {
        favorites = await getAll('favorites');
    }
}
async function isFavorite(artistId, newFavoritesArray) {
    if (newFavoritesArray) {
        if (newFavoritesArray.length !== favorites?.length) {
            favorites = newFavoritesArray;
        }
    }
    else {
        await getFavorites();
    }
    return favorites?.some((favorite) => {
        return favorite.artistId === artistId;
    }) ?? false;
}
export { isFavorite, favorites };
