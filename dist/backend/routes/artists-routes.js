import express from 'express';
import { deleteArtist, editArtist, getAllArtists, getOneArtist, createArtist } from "../controllers/artists-controllers.js";
const artistRouter = express.Router();
artistRouter.get('/artists', getAllArtists);
artistRouter.get('/artists/:id', getOneArtist);
artistRouter.post('/artists', createArtist);
artistRouter.put('/artists/:id', editArtist);
artistRouter.delete('/artists/:id', deleteArtist);
export { artistRouter };
