import { getOne, update } from "./api.js";
import { refreshArtists } from "./update-lists.js";

async function editArtist(id: number): Promise<void> {
    const artist: Artist | null = await fetchArtist(id);

    if (!artist) {
        return;
    }

    const modal = document.querySelector('.modal') as HTMLDialogElement | null;
    const modalContent = document.querySelector('#dialog-modal-content');

    if (!modalContent) {
        console.error('No modal content found in DOM');
        return;
    }

    modalContent.innerHTML = createEditFormHTML(artist);

    const form = document.querySelector('#edit-artist-form') as HTMLFormElement | null;

    if (!form || !modal) {
        console.error('No form or modal found in DOM');
        return;
    }

    form.addEventListener('submit', (e) => updateArtist(e, modal, id));
    modal.showModal();
}

async function fetchArtist(id: number): Promise<Artist | null> {
    try {
        return await getOne('artists', id.toString());
    } catch (error) {
        console.error('Error fetching artist:', error);
        return null;
    }
}

function createEditFormHTML(artist: Artist): string {
    return /*html*/ `
    <h2>Edit Artist</h2>
    <form id="edit-artist-form">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" value="${artist.name}" required>
      <label for="birthday">Birthday</label>
      <input type="date" id="birthday" name="birthday" value="${artist.birthday}" required>
      <label for="activeSince">Active Since</label>
      <input type="number" id="activeSince" name="activeSince" value="${artist.activeSince}" required>
      <label for="genres">Genres</label>
      <input type="text" id="genres" name="genres" value="${artist.genres}" required>
      <label for="labels">Labels</label>
      <input type="text" id="labels" name="labels" value="${artist.labels}" required>
      <label for="website">Website</label>
      <input type="text" id="website" name="website" value="${artist.website}" required>
      <label for="shortDescription">Short Description</label>
      <input type="text" id="shortDescription" name="shortDescription" value="${artist.shortDescription}" required>
      <label for="image">Image</label>
      <input type="text" id="image" name="image" value="${artist.image}" required>
      <button type="submit">Update</button>
    </form>
  `;
}

async function updateArtist(e: Event, modal: HTMLDialogElement, id: number): Promise<void> {
    e.preventDefault();

    const updatedArtist: Artist = {
        name: getValue('#name'),
        birthday: getValue('#birthday'),
        activeSince: parseInt(getValue('#activeSince')),
        genres: getValue('#genres').split(',').map((item) => item.trim()),
        labels: getValue('#labels').split(',').map((item) => item.trim()),
        website: getValue('#website'),
        shortDescription: getValue('#shortDescription'),
        image: getValue('#image'),
    };

    const response = await update('artists', id.toString(), updatedArtist);

    if (response instanceof Error) {
        console.error('Error updating artist');
        return;
    }

    modal.close();

    // TODO: Visual feedback that the artist was updated

    // Refresh the artist list
    await refreshArtists(response);
}

function getValue(selector: string) {
    const element = document.querySelector(selector) as HTMLInputElement;
    return element.value;
}

export { editArtist };
