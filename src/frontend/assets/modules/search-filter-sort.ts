import {artists} from "./update-lists.js";
import {showArtists} from "./show-artists.js";

async function refreshFiltersAndSort() {
    const filterSelect: HTMLSelectElement | null = document.querySelector<HTMLSelectElement>("#filter");
    const searchInput: HTMLInputElement | null = document.querySelector<HTMLInputElement>("#searchbar");
    const sortSelect: HTMLSelectElement | null = document.querySelector<HTMLSelectElement>("#sort");

    if (!filterSelect || !searchInput || !sortSelect) {
        console.error("Search, filter or sort HTML elements are missing.");
        return;
    }
    const filterValue = filterSelect.value === "all" ? null : filterSelect.value;
    const searchText = searchInput.value.toLowerCase();
    const sortValue = sortSelect.value;

    const filteredAndSortedArtists = filterAndSortArtists(filterValue, searchText, sortValue);
    await showArtists(filteredAndSortedArtists);
}

function filterAndSortArtists(
    filterValue: string | null,
    searchText: string,
    sortValue: string
): Artist[] {
    const filteredArtists = filterArtists(filterValue, searchText);
    return sortArtists(filteredArtists, sortValue);
}

function filterArtists(filterValue: string | null, searchText: string): Artist[] {
    // Convert searchText to lowercase to make the search case-insensitive
    searchText = searchText.toLowerCase();

    return artists.filter((artist) => {
        const nameMatch = artist.name.toLowerCase().includes(searchText);
        const genreMatch = artist.genres.some((genre) => genre.toLowerCase().includes(searchText));
        const labelMatch = artist.labels.some((label) => label.toLowerCase().includes(searchText));

        if (filterValue === null || filterValue === "all") {
            // If filterValue is "all" or null, search in name, genres, and labels
            return nameMatch || genreMatch || labelMatch;
        } else {
            switch (filterValue) {
                case "name":
                    return nameMatch;
                case "genre":
                    return genreMatch;
                case "label":
                    return labelMatch;
                default:
                    return false; // Invalid filterValue, return false for all other cases
            }
        }
    });
}

function sortArtists(artists: Artist[], sortValue: string): Artist[] {
    switch (sortValue) {
        case "name-az":
            return artists.sort((a, b) => a.name.localeCompare(b.name));
        case "name-za":
            return artists.sort((a, b) => b.name.localeCompare(a.name));
        case "oldest":
            return artists.sort((a, b) => calculateAge(b.birthday) - calculateAge(a.birthday));
        case "youngest":
            return artists.sort((a, b) => calculateAge(a.birthday) - calculateAge(b.birthday));
        case "longest-career":
            return artists.sort((a, b) => a.activeSince - b.activeSince);
        case "shortest-career":
            return artists.sort((a, b) => b.activeSince - a.activeSince);
        default:
            return artists;
    }
}

function calculateAge(birthday: string): number {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
}

export {refreshFiltersAndSort};



