import { getOne } from "./api.js";
import { convertDateFormat, stringArrayAsList } from "./show-data-utils.js";

async function showArtist(artistId: number) {
    const artist = await fetchArtist(artistId);
    if (!artist) {
        return;
    }

    const modalContent = document.querySelector('#dialog-modal-content');
    if (!modalContent) {
        console.error('No modal content found in DOM');
        return;
    }

    const { genres, labels, birthday, activeSince, website, shortDescription, image, name } = artist;

    modalContent.innerHTML = createArtistCardHTML({ name, image, birthday, activeSince, genres, labels, website, shortDescription });
    showModal();
}

async function fetchArtist(artistId: number): Promise<Artist | null> {
    try {
        return await getOne('artists', artistId.toString());
    } catch (error) {
        console.error('Error fetching artist:', error);
        return null;
    }
}

function createArtistCardHTML(artist: Artist): string {
    const { name, image, birthday, activeSince, genres, labels, website, shortDescription } = artist;

    return /*html*/`
    <article class="artist-card">
      <div class="artist-card-image">
        <img src="${image}" alt="${name}">
      </div>
      <div class="artist-card-content">
        <h3>${name}</h3>
        <p>Born: ${convertDateFormat(birthday)}</p>
        <p>Active since: ${activeSince}</p>
        <p>Genres: ${stringArrayAsList(genres)}</p>
        <p>Labels: ${stringArrayAsList(labels)}</p>
        <p>Website: <a href="${website}">${website}</a></p>
      </div>
      <div class="artist-card-description">
        <p>Short Description: ${shortDescription}</p>
      </div>
    </article>
  `;
}

function showModal() {
    const modal = document.querySelector('.modal') as HTMLDialogElement | null;
    if (!modal) {
        console.error('No modal found in DOM');
        return;
    }
    modal.showModal();
}

export { showArtist };
