// imports
import express from 'express';
import {readArtists } from "./helpers.js";

// create router
const router = express.Router();

// define routes
router.get('/', (_req, res) => {
    res.send('Hello World!');
});

router.get('/artists', async (_req, res) => {
    const artists = await readArtists();
    console.log(artists);
    res.send("Hello Artists!")
    // res.json(artists);
});

// router.get('/artists/:id', async (req, res) => {
//     const artists: Artist[] = await readArtists();
//     const artist: Artist | undefined = artists.find(a => a.id === parseInt(req.params.id));
//     if (!artist) {
//         res.status(404).end();
//     }
//     res.json(artist);
// });
//
// router.post('/artists', async (req, res) => {
//     const artists: Artist[] = await readArtists();
//     const artist: Artist = req.body;
//     artist.id = createId(artists);
//     artists.push(artist);
//     await writeArtists(artists);
//     res.status(201).json(artist);
// });
//
// router.put('/artists/:id', async (req, res) => {
//     const artists: Artist[] = await readArtists();
//     const artist: Artist | undefined = artists.find(a => a.id === parseInt(req.params.id));
//     if (!artist) {
//         res.status(404).end();
//         return;
//     }
//     const updatedArtist: Artist = req.body;
//     updatedArtist.id = artist.id;
//     // update artist in array
//     const index: number = artists.indexOf(artist);
//     artists.splice(index, 1, updatedArtist);
//     // write to file
//     await writeArtists(artists);
//     res.json(updatedArtist);
// });
//
// router.delete('/artists/:id', async (req, res) => {
//     const artists: Artist[] = await readArtists();
//     const artist: Artist | undefined = artists.find(a => a.id === parseInt(req.params.id));
//     if (!artist) {
//         res.status(404).end();
//         return;
//     }
//     // delete artist from array
//     const index: number = artists.indexOf(artist);
//     artists.splice(index, 1);
//     // write to file
//     await writeArtists(artists);
//     res.status(204).end();
// });

export default router;