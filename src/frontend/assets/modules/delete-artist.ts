import {destroy} from "./api.js";
import {refreshArtists} from "./update-lists.js";

async function deleteArtist (id: number): Promise<void> {
   const response = await destroy('artists', id.toString());
    if (response instanceof Error) {
        console.error('Error deleting artist');
        return;
    } else {
        // TODO visual feedback that the artist was deleted
        console.log('Artist deleted')
        // Refresh the artist list
        await refreshArtists(response);
    }
}

export {deleteArtist};
