var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { readArtists } from "./helpers.js";
const router = express.Router();
router.get('/', (_req, res) => {
    res.send('Hello World!');
});
router.get('/artists', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artists = yield readArtists();
    console.log(artists);
    res.send("Hello Artists!");
}));
export default router;
