import { destroy } from "./api.js";
import { favorites } from "./is-favorite.js";
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
    console.log(`Deleting favorite ${artistId}`);
    const response = await destroy('favorites', favorite.id);
    if (response instanceof Error) {
        console.error('Error deleting favorite');
        return;
    }
    console.log('Favorite deleted');
}
export { deleteFavorite };
