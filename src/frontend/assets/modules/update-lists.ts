import {showArtists} from "./show-artists.js";
import {favorites} from "./is-favorite.js";

let artists: Artist[] = [];
const uniqueArtists: Set<Artist> = new Set<Artist>();



async function refreshArtists(newArtistsArray: Artist[]) {
    // Iterate through the new array and add unique artists to the Set
    for (const artist of newArtistsArray) {
        uniqueArtists.add(artist);
    }
    // Convert the Set to an array
        artists = Array.from(uniqueArtists);
        uniqueArtists.clear();

    // Show the artists
    await showArtists(artists);
}

async function refreshFavorites(newFavoritesArray: Favorite[]) {
    // check if favorites.length is equal to newFavoritesArray.length
    if (favorites?.length !== newFavoritesArray.length) {
        await showArtists(artists, newFavoritesArray);
    }
}
export { refreshArtists, refreshFavorites, artists };
