// imports
import express from 'express';
import cors from 'cors';

// import routes
import { router, artistRouter, favoriteRouter } from './routes/routes.js';

// create express app
const app = express();

// enable cors
app.use(cors());

// enable json body parsing
app.use(express.json());

// serve static files
app.use(express.static('./dist/frontend'));

// define routes
app.use('/', router, artistRouter, favoriteRouter);

// start express server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});