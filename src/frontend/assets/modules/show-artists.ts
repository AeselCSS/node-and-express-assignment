import {showArtist} from "./show-artist.js";
import {isFavorite} from "./is-favorite.js";
import {deleteArtist} from "./delete-artist.js";
import {editArtist} from "./edit-artist.js";
import {createFavorite} from "./create-favorite.js";
import {deleteFavorite} from "./delete-favorite.js";

async function showArtists(artists: Artist[]) {
    console.log('Showing artists')
    const artistGrid: Element | null = document.querySelector('.artist-grid');
    if (artistGrid === null) {
        console.error('No artist grid found in DOM');
        return;
    }
    artistGrid.innerHTML = '';

    for (const artist of artists) {
        if (artist.id !== undefined) { // Check if artist.id is defined
            const artistId = artist.id;
            console.log(`Showing artist ${artistId}`)
            // Check if the artist is a favorite
            const favorite = await isFavorite(artistId);
            const html = /*html*/`
        <article class="artist-card">
        <div class="artist-card-image">
            <img src="${artist.image}" alt="${artist.name}">
        </div>
        <div class="artist-card-favorite">
            <button class="artist-card-favorite-button" data-id="${artist.id}">${favorite ? '<img src="../svg/star_gold.svg" alt="Favorite">' : '<img src="../svg/star_outline_gold.svg" alt="Not Favorite">'}</button>
        </div>
        <div class="artist-card-content">
            <h2>${artist.name}</h2>
            <p>${artist.genres}</p>
        </div>
        <div class="artist-card-description">
            <p>${artist.shortDescription}</p>
        </div>
        <div class="artist-card-actions">
        <button class="artist-card-details-button" data-id="${artistId}">Show Details</button>
        <button class="artist-card-edit-button" data-id="${artist.id}"><img src="../svg/edit_black.svg" alt="Edit Artist"></button>
        <button class="artist-card-delete-button" data-id="${artist.id}"><img src="../svg/delete_black.svg" alt="Delete Artist"></button>
        </article>
        `;
            // Insert the updated HTML into the artistGrid
            artistGrid.insertAdjacentHTML('beforeend', html);

            // Add event listeners to the buttons
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
                } else {
                    deleteFavorite(artistId);
                }
            });
            }
        }
    }

export { showArtists };