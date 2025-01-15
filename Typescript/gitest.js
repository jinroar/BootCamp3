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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var prompt_sync_1 = require("prompt-sync");
var prompt = (0, prompt_sync_1.default)();
var BASE_URL = "https://gsi.fly.dev/characters";
var currentPage = 1;
var fetchCharacters = function (page) { return __awaiter(void 0, void 0, void 0, function () {
    var res, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "?page=").concat(page))];
            case 1:
                res = _a.sent();
                if (!res.ok)
                    throw new Error("HTTP error: ".concat(res.status));
                return [4 /*yield*/, res.json()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                err_1 = _a.sent();
                console.error(err_1.message);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
var displayCharacters = function (characters) {
    return characters.forEach(function (_a) {
        var id = _a.id, name = _a.name;
        return console.log("ID: ".concat(id, ", Name: ").concat(name));
    });
};
var fetchCharacterById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var res, character, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/").concat(id))];
            case 1:
                res = _a.sent();
                if (!res.ok)
                    throw new Error("HTTP error: ".concat(res.status));
                return [4 /*yield*/, res.json()];
            case 2:
                character = (_a.sent()).result;
                if (!character)
                    return [2 /*return*/, console.log("Character not found.")];
                console.log("\nID: ".concat(character.id, "\nName: ").concat(character.name, "\nDescription: ").concat(character.description || "Not provided"));
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error(err_2.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, totalPages, command, _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, fetchCharacters(currentPage)];
            case 1:
                data = _d.sent();
                _d.label = 2;
            case 2:
                if (!(data === null || data === void 0 ? void 0 : data.results.length)) return [3 /*break*/, 17];
                displayCharacters(data.results);
                totalPages = (_c = data.totalPages) !== null && _c !== void 0 ? _c : 6;
                console.log("\nCommands: [n] Next, [p] Previous, [q] Quit, [id] Fetch by ID (number)\nPage: ".concat(currentPage, " / ").concat(totalPages));
                command = prompt("Enter command: ").toLowerCase().trim();
                _a = command;
                switch (_a) {
                    case "n": return [3 /*break*/, 3];
                    case "p": return [3 /*break*/, 7];
                    case "q": return [3 /*break*/, 11];
                }
                return [3 /*break*/, 12];
            case 3:
                if (!(currentPage < totalPages)) return [3 /*break*/, 5];
                currentPage++;
                return [4 /*yield*/, fetchCharacters(currentPage)];
            case 4:
                data = _d.sent();
                return [3 /*break*/, 6];
            case 5:
                console.log("You are already on the last page.");
                _d.label = 6;
            case 6: return [3 /*break*/, 16];
            case 7:
                if (!(currentPage > 1)) return [3 /*break*/, 9];
                currentPage--;
                return [4 /*yield*/, fetchCharacters(currentPage)];
            case 8:
                data = _d.sent();
                return [3 /*break*/, 10];
            case 9:
                console.log("You are on the first page.");
                _d.label = 10;
            case 10: return [3 /*break*/, 16];
            case 11: return [2 /*return*/, console.log("Exiting...")];
            case 12:
                if (!!isNaN(+command)) return [3 /*break*/, 14];
                return [4 /*yield*/, fetchCharacterById(command)];
            case 13:
                _b = _d.sent();
                return [3 /*break*/, 15];
            case 14:
                _b = console.log("Invalid command.");
                _d.label = 15;
            case 15:
                _b;
                _d.label = 16;
            case 16: return [3 /*break*/, 2];
            case 17: return [2 /*return*/];
        }
    });
}); };
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);
process.on("SIGINT", function () {
    console.log("\nExiting gracefully...");
    process.exit();
});
main();
