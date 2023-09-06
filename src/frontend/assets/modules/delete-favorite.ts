import {destroy} from "./api.js";
import {favorites} from "./is-favorite.js";
async function deleteFavorite (artistId:number) {
    // check if favorites is null or undefined - use an empty array if it is
    if (!favorites) {
        console.error('Favorites is null or undefined');
        return;
    }
    // find the favorite id from the artist id in the favorites array
    const favorite: Favorite | undefined = favorites.find((favorite:Favorite) => favorite.artistId === artistId);
    if (!favorite) {
        console.error(`No favorite found for artist ${artistId}`);
        return;
    }
    // Check if favorite.id is defined before passing it to destroy
    if (favorite.id === undefined) {
        console.error(`Favorite id is undefined for artist ${artistId}`);
        return;
    }

    // delete the favorite
    console.log(`Deleting favorite ${artistId}`);
    const response = await destroy('favorites', favorite.id);
    if (response instanceof Error) {
        console.error('Error deleting favorite');
        return;
    }
    console.log('Favorite deleted');
    // TODO: Visual feedback that the favorite was deleted
    // TODO: Refresh the favorites list
}

export {deleteFavorite};