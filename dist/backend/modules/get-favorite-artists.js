import { readFile } from "./router-utils.js";
async function getFavoriteArtists(favorites) {
    const artists = await readFile('artists');
    const favoriteArtists = [];
    for (const favorite of favorites) {
        const artist = artists.find(a => a.id === favorite.artistId);
        if (artist) {
            favoriteArtists.push(artist);
        }
    }
    return favoriteArtists;
}
export { getFavoriteArtists };
