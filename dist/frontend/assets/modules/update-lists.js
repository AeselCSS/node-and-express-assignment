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
}
async function refreshFavorites(newFavoritesArray) {
    if (favorites?.length !== newFavoritesArray.length) {
        await showArtists(artists, newFavoritesArray);
    }
}
export { refreshArtists, refreshFavorites };
