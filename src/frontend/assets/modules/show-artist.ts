// import {getOne} from "./api.js";
// import {convertDateFormat, stringArrayAsList} from "./show-data-utils.js";
//
// async function showArtist(artistId: number) {
//   const artist: Artist = await getOne('artists', artistId.toString());
//     const modalContent: HTMLElement | null = document.querySelector('#dialog-modal-content');
//     if (modalContent === null) {
//         console.error('No modal content found in DOM');
//         return;
//     }
//     // Convert arrays to comma seperated strings
//     const genres: string = stringArrayAsList(artist.genres);
//     const labels: string = stringArrayAsList(artist.labels);
//
//     // convert date format
//     const birthday = convertDateFormat(artist.birthday);
//
//     modalContent.innerHTML = '';
//     const html = /*html*/`
//     <article class="artist-card">
//         <div class="artist-card-image">
//             <img src="${artist.image}" alt="${artist.name}">
//         </div>
//         <div class="artist-card-content">
//             <h3>${artist.name}</h3>
//             <p>Born: ${birthday}</p>
//             <p>Active since: ${artist.activeSince}</p>
//             <p>Genres: ${genres}</p>
//             <p>Labels: ${labels}</p>
//             <p>Website: <a href="${artist.website}"></a>${artist.website}</p>
//         </div>
//         <div class="artist-card-description">
//             <p>Short Description: ${artist.shortDescription}</p>
//         </div>
//         </article>
//         `;
//     modalContent.insertAdjacentHTML('beforeend', html);
//     // show the modal
//     const modal: HTMLDialogElement | null = document.querySelector('.modal');
//     if (modal === null) {
//         console.error('No modal found in DOM');
//         return;
//     }
//     modal.showModal();
// }
//
// export { showArtist };
//

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
