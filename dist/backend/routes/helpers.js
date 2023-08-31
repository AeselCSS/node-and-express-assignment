import fs from "fs/promises";
async function readFile(file) {
    const data = await fs.readFile(`./dist/backend/data/${file}.json`);
    return JSON.parse(data.toString());
}
async function writeFile(file, list) {
    await fs.writeFile(`./dist/backend/data/${file}.json`, JSON.stringify(list, null, 2));
}
function createId(list) {
    const newId = Math.floor(Math.random() * 1000000);
    const idExists = list.find(item => item.id === newId);
    if (!idExists) {
        return newId;
    }
    else {
        return createId(list);
    }
}
export { readFile, writeFile, createId };
