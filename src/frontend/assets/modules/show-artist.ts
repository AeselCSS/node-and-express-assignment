import {getOne} from "./api.js";
import {convertDateFormat, stringArrayAsList} from "./show-data-utils.js";

async function showArtist(artistId: number) {
  const artist: Artist = await getOne('artists', artistId.toString());
    const modalContent: HTMLElement | null = document.querySelector('#dialog-modal-content');
    if (modalContent === null) {
        console.error('No modal content found in DOM');
        return;
    }
    // Convert arrays to comma seperated strings
    const genres: string = stringArrayAsList(artist.genres);
    const labels: string = stringArrayAsList(artist.labels);

    // convert date format
    const birthday = convertDateFormat(artist.birthday);

    modalContent.innerHTML = '';
    const html = /*html*/`
    <article class="artist-card">
        <div class="artist-card-image">
            <img src="${artist.image}" alt="${artist.name}">
        </div>
        <div class="artist-card-content">
            <h3>${artist.name}</h3>
            <p>Born: ${birthday}</p>
            <p>Active since: ${artist.activeSince}</p>
            <p>Genres: ${genres}</p>
            <p>Labels: ${labels}</p>
            <p>Website: <a href="${artist.website}"></a>${artist.website}</p>
        </div>
        <div class="artist-card-description">
            <p>Short Description: ${artist.shortDescription}</p>
        </div>
        </article>
        `;
    modalContent.insertAdjacentHTML('beforeend', html);
    // show the modal
    const modal: HTMLDialogElement | null = document.querySelector('.modal');
    if (modal === null) {
        console.error('No modal found in DOM');
        return;
    }
    modal.showModal();
}

export { showArtist };