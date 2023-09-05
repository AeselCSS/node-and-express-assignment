import { getOne } from "./api.js";
import { isFavorite } from "./is-favorite.js";
async function showArtist(artistId) {
    const artist = await getOne('artists', artistId.toString());
    const modalContent = document.querySelector('#dialog-modal-content');
    if (modalContent === null) {
        console.error('No modal content found in DOM');
        return;
    }
    const favorite = await isFavorite(artistId);
    modalContent.innerHTML = '';
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
            <p>${artist.birthday}</p>
            <p>${artist.activeSince}</p>
            <p>${artist.genres}</p>
            <p>${artist.labels}</p>
            <p>${artist.website}</p>
        </div>
        <div class="artist-card-description">
            <p>${artist.shortDescription}</p>
        </div>
        </article>
        `;
    modalContent.insertAdjacentHTML('beforeend', html);
    const modal = document.querySelector('.modal');
    if (modal === null) {
        console.error('No modal found in DOM');
        return;
    }
    modal.showModal();
}
export { showArtist };
