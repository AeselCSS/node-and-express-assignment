
import {getAll} from "./assets/modules/api.js";
import {showArtists} from "./assets/modules/show-artists.js";

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
    const artists = await getAll('artists');
    await showArtists(artists)
});
