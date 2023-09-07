import { getAll } from "./assets/modules/api.js";
import { createArtistModal } from "./assets/modules/create-artist.js";
import { refreshArtists } from "./assets/modules/update-lists.js";
import { refreshFiltersAndSort } from "./assets/modules/search-filter-sort.js";
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded - fetching artists');
    const artistsArray = await getAll('artists');
    await refreshArtists(artistsArray);
    await refreshFiltersAndSort();
    const filterSelect = document.querySelector("#filter");
    const searchInput = document.querySelector("#searchbar");
    const sortSelect = document.querySelector("#sort");
    const addArtistButton = document.querySelector("#add");
    const closeModalButton = document.querySelector(".close");
    const modal = document.querySelector(".modal");
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
