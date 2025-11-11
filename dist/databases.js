"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotes = exports.insertNotes = exports.getNotes = void 0;
const mysql2_1 = require("mysql2");
const pool = (0, mysql2_1.createPool)({
    host: 'localhost',
    user: 'root',
    password: '6862',
    database: 'notes_app'
}).promise();
const getNotes = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield pool.query(`SELECT *FROM notes WHERE id = ?`, [id]);
        return result[0];
    }
    catch (error) {
        console.log("Error:", error);
    }
});
exports.getNotes = getNotes;
const insertNotes = (title, contents) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield pool.query(`INSERT INTO notes (title, contents) VALUES (?, ?)`, [title, contents]);
        return (0, exports.getNotes)(result.insertId);
    }
    catch (error) {
        console.log(error);
    }
});
exports.insertNotes = insertNotes;
const updateNotes = (id_1, ...args_1) => __awaiter(void 0, [id_1, ...args_1], void 0, function* (id, title = "", contents = "", created_at = "") {
    try {
        yield pool.query(`UPDATE notes SET 
            title = ?,
            contents = ?,
            created_at = ?,
            WHERE id = ?`, [title, contents, created_at, id]);
        return (0, exports.getNotes)(id);
    }
    catch (error) {
        throw error;
    }
});
exports.updateNotes = updateNotes;
