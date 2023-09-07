// imports
import express from 'express';
import {createFavorite, deleteFavorite, getFavorites} from "../controllers/favorites-controllers.js";

const favoriteRouter = express.Router();
favoriteRouter.get('/favorites', getFavorites);

favoriteRouter.post('/favorites', createFavorite);

favoriteRouter.delete('/favorites/:id', deleteFavorite);

export {favoriteRouter};