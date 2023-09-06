import { showArtists } from "./show-artists.js";
import { favorites } from "./is-favorite.js";
let artists = [];
const uniqueArtists = new Set();
async function refreshArtists(newArtistsArray) {
    for (const artist of newArtistsArray) {
        uniqueArtists.add(artist);
    }
    artists = Array.from(uniqueArtists);
    uniqueArtists.clear();
    await showArtists(artists);
    console.log('Artists refreshed');
    console.log(artists);
}
async function refreshFavorites(newFavoritesArray) {
    console.log(favorites);
    console.log(newFavoritesArray);
    if (favorites?.length === newFavoritesArray.length) {
        return;
    }
    else {
        await showArtists(artists);
    }
}
export { refreshArtists, refreshFavorites };
