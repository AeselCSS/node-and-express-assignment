import { create } from "./api.js";
async function createFavorite(artistId) {
    const response = await create('favorites', { artistId: artistId });
    if (response instanceof Error) {
        console.error('Error creating favorite');
        return;
    }
    console.log('Favorite created');
}
export { createFavorite };
