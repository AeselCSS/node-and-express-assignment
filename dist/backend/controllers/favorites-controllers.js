import { createId, readFile, writeFile } from "../routes/router-utils.js";
async function getFavorites(_req, res) {
    const favorites = await readFile('favorites');
    res.json(favorites);
}
async function createFavorite(req, res) {
    const favorites = await readFile('favorites');
    const newFavorite = req.body;
    newFavorite.id = createId(favorites);
    favorites.push(newFavorite);
    await writeFile('favorites', favorites);
    res.status(201).json(favorites);
}
async function deleteFavorite(req, res) {
    const favorites = await readFile('favorites');
    const favorite = favorites.find(f => f.id === parseInt(req.params.id));
    if (!favorite) {
        res.status(404).json({ message: `Favorite with id ${req.params.id} not found` });
        return;
    }
    const index = favorites.indexOf(favorite);
    favorites.splice(index, 1);
    await writeFile('favorites', favorites);
    res.status(200).json(favorites);
}
export { getFavorites, createFavorite, deleteFavorite };
