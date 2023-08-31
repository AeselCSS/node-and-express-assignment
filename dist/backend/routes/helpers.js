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
function readFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fs.readFile(`./dist/backend/data/${file}.json`);
        return JSON.parse(data.toString());
    });
}
function writeFile(file, list) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs.writeFile(`./dist/backend/data/${file}.json`, JSON.stringify(list, null, 2));
    });
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
