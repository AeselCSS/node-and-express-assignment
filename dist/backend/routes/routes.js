var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { createId, readFile, writeFile } from "./helpers.js";
const router = express.Router();
const artistRouter = express.Router();
const favoriteRouter = express.Router();
router.get('/', (_req, res) => {
    res.send();
});
artistRouter.get('/artists', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artists = yield readFile('artists');
    res.json(artists);
}));
artistRouter.get('/artists/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artists = yield readFile('artists');
    const artist = artists.find(a => a.id === parseInt(req.params.id));
    if (!artist) {
        res.status(404).end();
    }
    res.json(artist);
}));
artistRouter.post('/artists', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artists = yield readFile('artists');
    const newArtist = req.body;
    newArtist.id = createId(artists);
    artists.push(newArtist);
    yield writeFile('artists', artists);
    res.status(201).json(newArtist);
}));
artistRouter.put('/artists/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artists = yield readFile('artists');
    const artist = artists.find(a => a.id === parseInt(req.params.id));
    if (!artist) {
        res.status(404).end();
        return;
    }
    const updatedArtist = req.body;
    updatedArtist.id = artist.id;
    const index = artists.indexOf(artist);
    artists.splice(index, 1, updatedArtist);
    yield writeFile('artists', artists);
    res.json(updatedArtist);
}));
artistRouter.delete('/artists/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artists = yield readFile('artists');
    const artist = artists.find(a => a.id === parseInt(req.params.id));
    if (!artist) {
        res.status(404).end();
        return;
    }
    const index = artists.indexOf(artist);
    artists.splice(index, 1);
    yield writeFile('artists', artists);
    res.status(204).end();
}));
favoriteRouter.get('/favorites', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favorites = yield readFile('favorites');
    res.json(favorites);
}));
favoriteRouter.post('/favorites', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favorites = yield readFile('favorites');
    const newFavorite = req.body;
    newFavorite.id = createId(favorites);
    favorites.push(newFavorite);
    yield writeFile('favorites', favorites);
    res.status(201).json(newFavorite);
}));
favoriteRouter.delete('/favorites/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favorites = yield readFile('favorites');
    const favorite = favorites.find(f => f.id === parseInt(req.params.id));
    if (!favorite) {
        res.status(404).end();
        return;
    }
    const index = favorites.indexOf(favorite);
    favorites.splice(index, 1);
    yield writeFile('favorites', favorites);
    res.status(204).end();
}));
export { router, artistRouter, favoriteRouter };
