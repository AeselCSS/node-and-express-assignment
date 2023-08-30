import fs from "fs/promises";

// read from file
async function readArtists() {
    console.log("readArtists function called")
    const data = await fs.readFile('./data/artists.json');
    console.log(data.toString());
    // return JSON.parse(data.toString());
}
// write to file
async function writeArtists(artists: Artist[]) {
    await fs.writeFile('./data/artists.json', JSON.stringify(artists, null, 2));
}

function createId(artists: Artist[]): number {
    const newId = Math.floor(Math.random() * 1000000);
    // check if id already exists
    const idExists = artists.find(a => a.id === newId);
    if (!idExists) {
        return newId;
    } else {
        return createId(artists);
    }
}

export { readArtists, writeArtists, createId };