import {create} from "./api.js";

async function createFavorite(artistId:number) {
    const response = await create('favorites', {artistId: artistId});
    if (response instanceof Error) {
        console.error('Error creating favorite');
        return;
    }
    console.log('Favorite created');
    // TODO: Visual feedback that the favorite was created
    // TODO: Refresh the favorites list
}

export {createFavorite};