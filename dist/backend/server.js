import express from 'express';
import cors from 'cors';
import { router, artistRouter, favoriteRouter } from './routes/routes.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./dist/frontend'));
app.use('/', router, artistRouter, favoriteRouter);
const port = 3000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
