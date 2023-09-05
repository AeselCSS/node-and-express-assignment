import { showArtists } from "./show-artists.js";
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
export { refreshArtists };
