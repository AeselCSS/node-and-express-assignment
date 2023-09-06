import { destroy } from "./api.js";
import { favorites } from "./is-favorite.js";
import { refreshFavorites } from "./update-lists.js";
async function deleteFavorite(artistId) {
    if (!favorites) {
        console.error('Favorites is null or undefined');
        return;
    }
    const favorite = favorites.find((favorite) => favorite.artistId === artistId);
    if (!favorite) {
        console.error(`No favorite found for artist ${artistId}`);
        return;
    }
    if (favorite.id === undefined) {
        console.error(`Favorite id is undefined for artist ${artistId}`);
        return;
    }
    const response = await destroy('favorites', favorite.id);
    if (response instanceof Error) {
        console.error('Error deleting favorite');
        return;
    }
    await refreshFavorites(response);
    console.log('Favorite deleted');
}
export { deleteFavorite };
