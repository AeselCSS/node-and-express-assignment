
import {getAll} from "./assets/modules/api.js";
import {createArtistModal} from "./assets/modules/create-artist.js";
import {refreshArtists} from "./assets/modules/update-lists.js";

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
    console.log('DOM loaded - fetching artists');
    const artistsArray = await getAll('artists');
    await refreshArtists(artistsArray);


    // event listeners
    document.querySelector('#add')?.addEventListener('click', () => {
        console.log('Add artist clicked');
        createArtistModal();
    });
    document.querySelector('.close')?.addEventListener('click', () => {
        const modal:HTMLDialogElement | null = document.querySelector('.modal');
        if (modal !== null) {
            modal.close();
        } else {
            console.error('No modal found in DOM');
        }
    });
});
