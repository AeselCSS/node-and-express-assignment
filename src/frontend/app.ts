
import {getAll} from "./assets/modules/api.js";
import {createArtistModal} from "./assets/modules/create-artist.js";
import {refreshArtists} from "./assets/modules/update-lists.js";
import {refreshFiltersAndSort} from "./assets/modules/search-filter-sort.js";

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
    console.log('DOM loaded - fetching artists');
    const artistsArray = await getAll('artists');
    await refreshArtists(artistsArray);
    await refreshFiltersAndSort();



    // event listeners
    const filterSelect: HTMLSelectElement | null = document.querySelector<HTMLSelectElement>("#filter");
    const searchInput: HTMLInputElement | null = document.querySelector<HTMLInputElement>("#searchbar");
    const sortSelect: HTMLSelectElement | null = document.querySelector<HTMLSelectElement>("#sort");
    const addArtistButton: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("#add");
    const closeModalButton: HTMLDialogElement | null = document.querySelector<HTMLDialogElement>(".close");
    const modal: HTMLDialogElement | null = document.querySelector<HTMLDialogElement>(".modal");

    if (!filterSelect || !searchInput || !sortSelect || !addArtistButton || !closeModalButton || !modal) {
        console.error('Search, filter, sort, add artist button or modal HTML elements are missing.');
        return;
    }

    filterSelect.addEventListener("change", refreshFiltersAndSort);
    searchInput.addEventListener("input", refreshFiltersAndSort);
    sortSelect.addEventListener("change", refreshFiltersAndSort);
    addArtistButton.addEventListener("click", createArtistModal);
    closeModalButton.addEventListener("click", () => {
        modal.close();
    });
});
