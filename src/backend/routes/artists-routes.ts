// imports
import express from 'express';
import {createId, readFile, writeFile} from "../modules/router-utils.js";

// create routers
const artistRouter = express.Router();

// artist CRUD
artistRouter.get('/artists', async (_req, res) => {
    const artists = await readFile('artists');
    if (!artists) {
        res.status(404).json({message: 'No artists found'});
        return;
    }
    res.status(200).json(artists);
});

artistRouter.get('/artists/:id', async (req, res) => {
    const artists: Artist[] = await readFile('artists');
    const artist: Artist | undefined = artists.find(a => a.id === parseInt(req.params.id));
    if (!artist) {
        res.status(404).json({message: `Artist with id ${req.params.id} not found`});
    }
    res.status(200).json(artist);
});

artistRouter.post('/artists', async (req, res) => {
    const artists: Artist[] = await readFile('artists');
    const newArtist: Artist = req.body;
    newArtist.id = createId(artists);
    artists.push(newArtist);
    await writeFile('artists', artists);
    // TODO: validate Artist from req.body - if invalid, return 400
    res.status(201).json(artists);
});

artistRouter.put('/artists/:id', async (req, res) => {
    const artists: Artist[] = await readFile('artists');
    const artist: Artist | undefined = artists.find(a => a.id === parseInt(req.params.id));
    if (!artist) {
        res.status(404).json({message: `Artist with id ${req.params.id} not found`});
        return;
    }
    const updatedArtist: Artist = req.body;
    updatedArtist.id = artist.id;
    // update artist in array
    const index: number = artists.indexOf(artist);
    artists.splice(index, 1, updatedArtist);
    // write to file
    await writeFile('artists', artists);
    res.status(200).json(artists);
});

artistRouter.delete('/artists/:id', async (req, res) => {
    const artists: Artist[] = await readFile('artists');
    const artist: Artist | undefined = artists.find(a => a.id === parseInt(req.params.id));
    if (!artist) {
        res.status(404).json({message: `Artist with id ${req.params.id} not found`});
        return;
    }
    // delete artist from array
    const index: number = artists.indexOf(artist);
    artists.splice(index, 1);
    // write to file
    await writeFile('artists', artists);
    res.status(200).json(artists);
});

export {artistRouter};