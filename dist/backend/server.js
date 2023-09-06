import express from 'express';
import cors from 'cors';
import { artistRouter } from "./routes/artists-routes.js";
import { favoriteRouter } from "./routes/favorites-routes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./dist/frontend'));
app.get('/', (_req, res) => {
    res.send();
});
app.use('/', artistRouter, favoriteRouter);
const port = 3000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
