import { createId, readFile, writeFile } from "../routes/router-utils.js";
async function getAllArtists(_req, res) {
    const artists = await readFile('artists');
    if (!artists) {
        res.status(404).json({ message: 'No artists found' });
        return;
    }
    res.status(200).json(artists);
}
async function getOneArtist(req, res) {
    const artists = await readFile('artists');
    const artist = artists.find(a => a.id === parseInt(req.params.id));
    if (!artist) {
        res.status(404).json({ message: `Artist with id ${req.params.id} not found` });
    }
    res.status(200).json(artist);
}
async function createArtist(req, res) {
    const artists = await readFile('artists');
    const newArtist = req.body;
    newArtist.id = createId(artists);
    artists.push(newArtist);
    await writeFile('artists', artists);
    res.status(201).json(artists);
}
async function editArtist(req, res) {
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
}
async function deleteArtist(req, res) {
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
}
export { getAllArtists, getOneArtist, createArtist, editArtist, deleteArtist };
