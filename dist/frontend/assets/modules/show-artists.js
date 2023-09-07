import { showArtist } from "./show-artist.js";
import { isFavorite } from "./is-favorite.js";
import { deleteArtist } from "./delete-artist.js";
import { editArtist } from "./edit-artist.js";
import { createFavorite } from "./create-favorite.js";
import { deleteFavorite } from "./delete-favorite.js";
import { stringArrayAsList } from "./show-data-utils.js";
async function showArtists(artists, favoritesArray) {
    const artistGrid = document.querySelector('.artist-grid');
    if (!artistGrid) {
        console.error('No artist grid found in DOM');
        return;
    }
    artistGrid.innerHTML = '';
    for (const artist of artists) {
        if (artist.id !== undefined) {
            const favorite = await getFavoriteStatus(artist.id, favoritesArray);
            const html = createArtistCardHTML(artist, favorite);
            artistGrid.insertAdjacentHTML('beforeend', html);
            addEventListeners(artist.id, favorite);
        }
    }
}
async function getFavoriteStatus(artistId, favoritesArray) {
    if (favoritesArray) {
        return isFavorite(artistId, favoritesArray);
    }
    else {
        return isFavorite(artistId);
    }
}
function createArtistCardHTML(artist, favorite) {
    const genres = stringArrayAsList(artist.genres);
    return `
    <article class="artist-card">
      <div class="artist-card-image">
        <img src="${artist.image}" alt="${artist.name}">
      </div>
      <div class="artist-card-favorite">
        <button class="artist-card-favorite-button" data-id="${artist.id}">
          ${favorite
        ? '<img src="assets/svg/star_gold.svg" alt="Favorite">'
        : '<img src="assets/svg/star_outline_gold.svg" alt="Not Favorite">'}
        </button>
      </div>
      <div class="artist-card-content">
        <h2>${artist.name}</h2>
        <p>${genres}</p>
      </div>
      <div class="artist-card-description">
        <p>${artist.shortDescription}</p>
      </div>
      <div class="artist-card-actions">
        <button class="artist-card-details-button" data-id="${artist.id}">Show Details</button>
        <button class="artist-card-edit-button" data-id="${artist.id}">
          <img src="assets/svg/edit_black.svg" alt="Edit Artist">
        </button>
        <button class="artist-card-delete-button" data-id="${artist.id}">
          <img src="assets/svg/delete_black.svg" alt="Delete Artist">
        </button>
      </article>
  `;
}
function addEventListeners(artistId, favorite) {
    const artistGrid = document.querySelector('.artist-grid');
    if (artistGrid === null) {
        console.error('No artist grid found in DOM');
        return;
    }
    artistGrid.querySelector(`.artist-card-details-button`)?.addEventListener('click', () => {
        showArtist(artistId);
    });
    artistGrid.querySelector(`.artist-card-edit-button`)?.addEventListener('click', () => {
        editArtist(artistId);
    });
    artistGrid.querySelector(`.artist-card-delete-button`)?.addEventListener('click', () => {
        deleteArtist(artistId);
    });
    artistGrid.querySelector(`.artist-card-favorite-button`)?.addEventListener('click', () => {
        if (!favorite) {
            createFavorite(artistId);
        }
        else {
            deleteFavorite(artistId);
        }
    });
}
export { showArtists };
