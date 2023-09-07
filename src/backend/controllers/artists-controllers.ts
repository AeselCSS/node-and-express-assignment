import {createId, readFile, writeFile} from "../routes/router-utils.js";

async function getAllArtists(_req:any, res:any):Promise<void> {
    const artists = await readFile('artists');
    if (!artists) {
        res.status(404).json({message: 'No artists found'});
        return;
    }
    res.status(200).json(artists);
}

async function getOneArtist(req:any, res:any):Promise<void> {
    const artists: Artist[] = await readFile('artists');
    const artist: Artist | undefined = artists.find(a => a.id === parseInt(req.params.id));
    if (!artist) {
        res.status(404).json({message: `Artist with id ${req.params.id} not found`});
    }
    res.status(200).json(artist);
}

async function createArtist (req:any, res:any):Promise<void> {
    const artists: Artist[] = await readFile('artists');
    const newArtist: Artist = req.body;
    newArtist.id = createId(artists);
    artists.push(newArtist);
    await writeFile('artists', artists);
    // TODO: validate Artist from req.body - if invalid, return 400
    res.status(201).json(artists);
}

async function editArtist(req:any, res:any):Promise<void> {
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
}

async function deleteArtist (req:any, res:any):Promise<void> {
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
}

export {getAllArtists, getOneArtist, createArtist, editArtist, deleteArtist};