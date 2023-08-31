import fs from "fs/promises";

// read from file
async function readFile(file:string) {
    const data = await fs.readFile(`./dist/backend/data/${file}.json`);
    return JSON.parse(data.toString());
}
// write to file
async function writeFile(file:string, list: Artist[] | Favorite[]) {
    await fs.writeFile(`./dist/backend/data/${file}.json`, JSON.stringify(list, null, 2));
}

function createId(list: Artist[] | Favorite[]): number {
    const newId = Math.floor(Math.random() * 1000000);

    const idExists = list.find(item => item.id === newId);
    if (!idExists) {
        return newId;
    } else {
        return createId(list);
    }
}

export { readFile, writeFile, createId };