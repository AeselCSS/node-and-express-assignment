// imports
import express from 'express';
import {createId, readFile, writeFile} from "./helpers.js";

// create routers
const router = express.Router();
const artistRouter = express.Router();
const favoriteRouter = express.Router();


// define routes
// landing page
router.get('/', (_req, res) => {
    res.send();
});

// artist CRUD
artistRouter.get('/artists', async (_req, res) => {
    const artists = await readFile('artists');
    // console.log(artists);
    res.json(artists);
});

artistRouter.get('/artists/:id', async (req, res) => {
    const artists: Artist[] = await readFile('artists');
    const artist: Artist | undefined = artists.find(a => a.id === parseInt(req.params.id));
    if (!artist) {
        res.status(404).end();
    }
    res.json(artist);
});

artistRouter.post('/artists', async (req, res) => {
    const artists: Artist[] = await readFile('artists');
    const newArtist: Artist = req.body;
    newArtist.id = createId(artists);
    artists.push(newArtist);
    await writeFile('artists', artists);
    res.status(201).json(newArtist);
});

artistRouter.put('/artists/:id', async (req, res) => {
    const artists: Artist[] = await readFile('artists');
    const artist: Artist | undefined = artists.find(a => a.id === parseInt(req.params.id));
    if (!artist) {
        res.status(404).end();
        return;
    }
    const updatedArtist: Artist = req.body;
    updatedArtist.id = artist.id;
    // update artist in array
    const index: number = artists.indexOf(artist);
    artists.splice(index, 1, updatedArtist);
    // write to file
    await writeFile('artists', artists);
    res.json(updatedArtist);
});

artistRouter.delete('/artists/:id', async (req, res) => {
    const artists: Artist[] = await readFile('artists');
    const artist: Artist | undefined = artists.find(a => a.id === parseInt(req.params.id));
    if (!artist) {
        res.status(404).end();
        return;
    }
    // delete artist from array
    const index: number = artists.indexOf(artist);
    artists.splice(index, 1);
    // write to file
    await writeFile('artists', artists);
    res.status(204).end();
});

// favorite CRUD
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
    res.status(201).json(newFavorite);
});

favoriteRouter.delete('/favorites/:id', async (req, res) => {
    const favorites: Favorite[] = await readFile('favorites');
    const favorite: Favorite | undefined = favorites.find(f => f.id === parseInt(req.params.id));
    if (!favorite) {
        res.status(404).end();
        return;
    }
    // delete favorite from array
    const index: number = favorites.indexOf(favorite);
    favorites.splice(index, 1);
    // write to file
    await writeFile('favorites', favorites);
    res.status(204).end();
});

export {router, artistRouter, favoriteRouter};