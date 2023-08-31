import express from 'express';
import { createId, readFile, writeFile } from "./helpers.js";
const router = express.Router();
const artistRouter = express.Router();
const favoriteRouter = express.Router();
router.get('/', (_req, res) => {
    res.send();
});
artistRouter.get('/artists', async (_req, res) => {
    const artists = await readFile('artists');
    res.json(artists);
});
artistRouter.get('/artists/:id', async (req, res) => {
    const artists = await readFile('artists');
    const artist = artists.find(a => a.id === parseInt(req.params.id));
    if (!artist) {
        res.status(404).end();
    }
    res.json(artist);
});
artistRouter.post('/artists', async (req, res) => {
    const artists = await readFile('artists');
    const newArtist = req.body;
    newArtist.id = createId(artists);
    artists.push(newArtist);
    await writeFile('artists', artists);
    res.status(201).json(newArtist);
});
artistRouter.put('/artists/:id', async (req, res) => {
    const artists = await readFile('artists');
    const artist = artists.find(a => a.id === parseInt(req.params.id));
    if (!artist) {
        res.status(404).end();
        return;
    }
    const updatedArtist = req.body;
    updatedArtist.id = artist.id;
    const index = artists.indexOf(artist);
    artists.splice(index, 1, updatedArtist);
    await writeFile('artists', artists);
    res.json(updatedArtist);
});
artistRouter.delete('/artists/:id', async (req, res) => {
    const artists = await readFile('artists');
    const artist = artists.find(a => a.id === parseInt(req.params.id));
    if (!artist) {
        res.status(404).end();
        return;
    }
    const index = artists.indexOf(artist);
    artists.splice(index, 1);
    await writeFile('artists', artists);
    res.status(204).end();
});
favoriteRouter.get('/favorites', async (_req, res) => {
    const favorites = await readFile('favorites');
    res.json(favorites);
});
favoriteRouter.post('/favorites', async (req, res) => {
    const favorites = await readFile('favorites');
    const newFavorite = req.body;
    newFavorite.id = createId(favorites);
    favorites.push(newFavorite);
    await writeFile('favorites', favorites);
    res.status(201).json(newFavorite);
});
favoriteRouter.delete('/favorites/:id', async (req, res) => {
    const favorites = await readFile('favorites');
    const favorite = favorites.find(f => f.id === parseInt(req.params.id));
    if (!favorite) {
        res.status(404).end();
        return;
    }
    const index = favorites.indexOf(favorite);
    favorites.splice(index, 1);
    await writeFile('favorites', favorites);
    res.status(204).end();
});
export { router, artistRouter, favoriteRouter };
