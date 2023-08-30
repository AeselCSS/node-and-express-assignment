var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs/promises";
function readArtists() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("readArtists function called");
        const data = yield fs.readFile('./data/artists.json');
        console.log(data.toString());
    });
}
function writeArtists(artists) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs.writeFile('./data/artists.json', JSON.stringify(artists, null, 2));
    });
}
function createId(artists) {
    const newId = Math.floor(Math.random() * 1000000);
    const idExists = artists.find(a => a.id === newId);
    if (!idExists) {
        return newId;
    }
    else {
        return createId(artists);
    }
}
export { readArtists, writeArtists, createId };
