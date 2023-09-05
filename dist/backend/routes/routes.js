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
    if (!artists) {
        res.status(404).json({ message: 'No artists found' });
        return;
    }
    res.status(200).json(artists);
});
artistRouter.get('/artists/:id', async (req, res) => {
    const artists = await readFile('artists');
    const artist = artists.find(a => a.id === parseInt(req.params.id));
    if (!artist) {
        res.status(404).json({ message: `Artist with id ${req.params.id} not found` });
    }
    res.status(200).json(artist);
});
artistRouter.post('/artists', async (req, res) => {
    const artists = await readFile('artists');
    const newArtist = req.body;
    newArtist.id = createId(artists);
    artists.push(newArtist);
    await writeFile('artists', artists);
    res.status(201).json(artists);
});
artistRouter.put('/artists/:id', async (req, res) => {
    const artists = await readFile('artists');
    const artist = artists.find(a => a.id === parseInt(req.params.id));
    if (!artist) {
        res.status(404).json({ message: `Artist with id ${req.params.id} not found` });
        return;
    }
    const updatedArtist = req.body;
    updatedArtist.id = artist.id;
    const index = artists.indexOf(artist);
    artists.splice(index, 1, updatedArtist);
    await writeFile('artists', artists);
    res.status(200).json(artists);
});
artistRouter.delete('/artists/:id', async (req, res) => {
    const artists = await readFile('artists');
    const artist = artists.find(a => a.id === parseInt(req.params.id));
    if (!artist) {
        res.status(404).json({ message: `Artist with id ${req.params.id} not found` });
        return;
    }
    const index = artists.indexOf(artist);
    artists.splice(index, 1);
    await writeFile('artists', artists);
    res.status(200).json(artists);
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
    res.status(201).json(favorites);
});
favoriteRouter.delete('/favorites/:id', async (req, res) => {
    const favorites = await readFile('favorites');
    const favorite = favorites.find(f => f.id === parseInt(req.params.id));
    if (!favorite) {
        res.status(404).json({ message: `Favorite with id ${req.params.id} not found` });
        return;
    }
    const index = favorites.indexOf(favorite);
    favorites.splice(index, 1);
    await writeFile('favorites', favorites);
    res.status(204).json(favorites);
});
export { router, artistRouter, favoriteRouter };
