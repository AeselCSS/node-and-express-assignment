import { create } from "./api.js";
import { refreshFavorites } from "./update-lists.js";
async function createFavorite(artistId) {
    const response = await create('favorites', { artistId: artistId });
    if (response instanceof Error) {
        console.error('Error creating favorite');
        return;
    }
    console.log('Favorite created');
    await refreshFavorites(response);
}
export { createFavorite };
