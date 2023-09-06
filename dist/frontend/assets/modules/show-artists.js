import { showArtist } from "./show-artist.js";
import { isFavorite } from "./is-favorite.js";
import { deleteArtist } from "./delete-artist.js";
import { editArtist } from "./edit-artist.js";
import { createFavorite } from "./create-favorite.js";
import { deleteFavorite } from "./delete-favorite.js";
async function showArtists(artists) {
    const artistGrid = document.querySelector('.artist-grid');
    if (artistGrid === null) {
        console.error('No artist grid found in DOM');
        return;
    }
    artistGrid.innerHTML = '';
    for (const artist of artists) {
        if (artist.id !== undefined) {
            const artistId = artist.id;
            const favorite = await isFavorite(artistId);
            const html = `
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
            artistGrid.insertAdjacentHTML('beforeend', html);
            artistGrid.querySelector(`.artist-card-details-button[data-id="${artistId}"]`)?.addEventListener('click', () => {
                showArtist(artistId);
            });
            artistGrid.querySelector(`.artist-card-edit-button[data-id="${artist.id}"]`)?.addEventListener('click', () => {
                editArtist(artistId);
            });
            artistGrid.querySelector(`.artist-card-delete-button[data-id="${artist.id}"]`)?.addEventListener('click', () => {
                deleteArtist(artistId);
            });
            artistGrid.querySelector(`.artist-card-favorite-button[data-id="${artist.id}"]`)?.addEventListener('click', () => {
                if (!favorite) {
                    createFavorite(artistId);
                }
                else {
                    deleteFavorite(artistId);
                }
            });
        }
    }
}
export { showArtists };
