import { create } from "./api.js";
import {refreshArtists} from "./update-lists.js";

function createArtistModal() {
    const modalContent: HTMLElement | null = document.querySelector<HTMLElement>('#dialog-modal-content');
    const modal: HTMLDialogElement | null = document.querySelector<HTMLDialogElement>('.modal');

    if (!modalContent) {
        console.error('No modal content found in DOM');
        return;
    }

    modalContent.innerHTML = '';

    const html = /*html*/`
    <h2>Create Artist</h2>
    <form id="create-artist-form">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
        <label for="birthday">Birthday</label>
        <input type="date" id="birthday" name="birthday" required>
        <label for="activeSince">Active Since</label>
        <input type="number" id="activeSince" name="activeSince" required>
        <label for="genres">Genres</label>
        <input type="text" id="genres" name="genres" placeholder="Genres separated with comma" required>
        <label for="labels">Labels</label>
        <input type="text" id="labels" name="labels" placeholder="Labels separated with comma" required>
        <label for="website">Website</label>
        <input type="text" id="website" name="website" required>
        <label for="shortDescription">Short Description</label>
        <input type="text" id="shortDescription" name="shortDescription" required>
        <label for="image">Image</label>
        <input type="text" id="image" name="image" required>
        <button type="submit">Create</button>
    </form>
    `;

    modalContent.insertAdjacentHTML('beforeend', html);

    const form: HTMLFormElement | null = document.querySelector<HTMLFormElement>('#create-artist-form');

    if (!form || !modal) {
        console.error('No form or modal found in DOM');
        return;
    }

    form.addEventListener('submit', (e) => createArtist(e, modal));
    modal.showModal();
}

async function createArtist(e: Event, modal: HTMLDialogElement) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const newArtist: Artist = {
        name: getValue('#name'),
        birthday: getValue('#birthday'),
        activeSince: parseInt(getValue('#activeSince')),
        genres: getValue('#genres').split(',').map((item) => item.trim()),
        labels: getValue('#labels').split(',').map((item) => item.trim()),
        website: getValue('#website'),
        shortDescription: getValue('#shortDescription'),
        image: getValue('#image'),
    };

    const response = await create('artists', newArtist);

    if (response instanceof Error) {
        console.error('Error creating artist');
        return;
    }

    // TODO: Visual feedback that the artist was created
    // Refresh the artist list
    await refreshArtists(response);
    modal.close();

    function getValue(selector: string): string {
        const input = form.querySelector<HTMLInputElement>(selector);
        return input ? input.value : '';
    }
}

export { createArtistModal };