import { getAll } from "./api.js";
let favorites = null;
async function getFavorites() {
    if (favorites === null) {
        favorites = await getAll('favorites');
    }
}
async function isFavorite(artistId) {
    await getFavorites();
    return favorites?.some((favorite) => {
        return favorite.artistId === artistId;
    }) ?? false;
}
export { isFavorite };
