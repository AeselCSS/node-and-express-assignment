import {createId, readFile, writeFile} from "../routes/router-utils.js";

async function getFavorites (_req:any, res:any):Promise<void> {
    const favorites = await readFile('favorites');
    res.json(favorites);
}

async function createFavorite (req:any, res:any):Promise<void> {
    const favorites: Favorite[] = await readFile('favorites');
    const newFavorite: Favorite = req.body;
    newFavorite.id = createId(favorites);
    favorites.push(newFavorite);
    await writeFile('favorites', favorites);

    res.status(201).json(favorites);
}

async function deleteFavorite(req:any, res:any):Promise<void> {
    const favorites: Favorite[] = await readFile('favorites');
    const favorite: Favorite | undefined = favorites.find(f => f.id === parseInt(req.params.id));
    if (!favorite) {
        res.status(404).json({message: `Favorite with id ${req.params.id} not found`});
        return;
    }
    // delete favorite from array
    const index: number = favorites.indexOf(favorite);
    favorites.splice(index, 1);
    // write to file
    await writeFile('favorites', favorites);

    res.status(200).json(favorites);
}

export {getFavorites, createFavorite, deleteFavorite};