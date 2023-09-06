// imports
import express from 'express';
import {createId, readFile, writeFile} from "../modules/router-utils.js";
import {getFavoriteArtists} from "../modules/get-favorite-artists.js";

const favoriteRouter = express.Router();
favoriteRouter.get('/favorites', async (_req, res) => {
    const favorites = await readFile('favorites');
    res.json(favorites);
});

favoriteRouter.post('/favorites', async (req, res) => {
    const favorites: Favorite[] = await readFile('favorites');
    const newFavorite: Favorite = req.body;
    newFavorite.id = createId(favorites);
    favorites.push(newFavorite);
    await writeFile('favorites', favorites);

    // get favorite artists as array and return it
    const favoriteArtists: Artist[] = await getFavoriteArtists(favorites);
    console.log(favoriteArtists)
    res.status(201).json(favorites);
});

favoriteRouter.delete('/favorites/:id', async (req, res) => {
    const favorites: Favorite[] = await readFile('favorites');
    const favorite: Favorite | undefined = favorites.find(f => f.id === parseInt(req.params.id));
    if (!favorite) {
        res.status(404).json({message: `Favorite with id ${req.params.id} not found`});
        return;
    }
    // delete favorite from array
    const index: number = favorites.indexOf(favorite);
    favorites.splice(index, 1);
    // write to file
    await writeFile('favorites', favorites);

    // get favorite artists as array and return it
    const favoriteArtists: Artist[] = await getFavoriteArtists(favorites);
    console.log(favoriteArtists)

    res.status(200).json(favorites);
});

export {favoriteRouter};