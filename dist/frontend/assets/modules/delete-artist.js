import { destroy } from "./api.js";
import { refreshArtists } from "./update-lists.js";
async function deleteArtist(id) {
    const response = await destroy('artists', id);
    if (response instanceof Error) {
        console.error('Error deleting artist');
        return;
    }
    else {
        console.log('Artist deleted');
        await refreshArtists(response);
    }
}
export { deleteArtist };
