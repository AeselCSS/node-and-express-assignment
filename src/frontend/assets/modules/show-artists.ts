import {showArtist} from "./show-artist.js";
import {isFavorite} from "./is-favorite.js";

async function showArtists(artists: Artist[]) {
    const artistGrid: Element | null = document.querySelector('.artist-grid');
    if (artistGrid === null) {
        console.error('No artist grid found in DOM');
        return;
    }
    artistGrid.innerHTML = '';

    for (const artist of artists) {
        if (artist.id !== undefined) { // Check if artist.id is defined
            const artistId = artist.id;
            // Check if the artist is a favorite
            const favorite = await isFavorite(artistId);
            const html = /*html*/`
        <article class="artist-card">
        <div class="artist-card-image">
            <img src="${artist.image}" alt="${artist.name}">
        </div>
        <div class="artist-card-favorite">
            <button class="artist-card-favorite-button" data-id="${artist.id}">${favorite ? 'Unfavorite' : 'Favorite'}</button>
        </div>
        <div class="artist-card-content">
            <h3>${artist.name}</h3>
            <p>${artist.genres}</p>
        </div>
        <div class="artist-card-description">
            <p>${artist.shortDescription}</p>
        </div>
        <div class="artist-card-actions">
        <button class="artist-card-details-button" data-id="${artistId}">Details</button>
        <button class="artist-card-edit-button" data-id="${artist.id}">Edit</button>
        <button class="artist-card-delete-button" data-id="${artist.id}">Delete</button>
        </article>
        `;
            // Insert the updated HTML into the artistGrid
            artistGrid.insertAdjacentHTML('beforeend', html);

            // Add event listeners to the buttons
            artistGrid.querySelector(`.artist-card-details-button[data-id="${artistId}"]`)?.addEventListener('click', () => {
                showArtist(artistId);
            });

            artistGrid.querySelector(`.artist-card-edit-button[data-id="${artist.id}"]`)?.addEventListener('click', () => {
                console.log(`Edit artist with Id: ${artist.id}`);
            });

            artistGrid.querySelector(`.artist-card-delete-button[data-id="${artist.id}"]`)?.addEventListener('click', () => {
                console.log(`Delete artist with Id: ${artist.id}`);
            });
        }
    }
}

export { showArtists };