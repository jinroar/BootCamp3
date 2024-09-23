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
var express = require('express');
var app = express();
var readFile = require("fs").promises.readFile;
var prompt = require("prompt-sync")();
var fs = require("fs");
var input_1 = require("input");
//Read Json and parse
var jsonData = fs.readFileSync('Box.json', 'utf8');
var boxdata = JSON.parse(jsonData);
//data to JSON
var data = boxdata;
function getApi() {
    var _this = this;
    //PORT
    var port = process.env.PORT || 8080; // Use the port provided by the host or default to 8080
    app.listen(port, function () {
    });
    app.get('/meow.html', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = res).send;
                    return [4 /*yield*/, readFile('./meow.html', 'utf-8')];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Define a route to handle incoming requests
    app.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = res).send;
                    return [4 /*yield*/, readFile('./index.html', 'utf-8')];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Middleware to parse JSON requests
    app.use(express.json());
    // Create (POST) a new item
    app.post('/PokeBox', function (req, res) {
        var newItem = req.body;
        data.push(newItem);
        res.status(201).json(newItem);
    });
    // POST http://localhost:3000/PokeBox
    // Body: { "name": "New Item" }
    //Read (GET) all PokeBox
    app.get('/PokeBox', function (req, res) {
        res.json(data);
    });
}
askStuff(); // Arrow keys. 
function askStuff() {
    return __awaiter(this, void 0, void 0, function () {
        var choices, colors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getApi();
                    console.log("Server is up at http://localhost:8080");
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 10];
                    console.clear();
                    console.log("[PokeBox Select an Option (Use ⬆ and ⬇ arrow keys then press `SPACEBAR` to mark then ENTER)]");
                    choices = ['[1]Store', '[2]View', '[3]Find', '[4]>Exit<'];
                    return [4 /*yield*/, input_1.default.checkboxes(choices)];
                case 2:
                    colors = _a.sent();
                    if (!(colors == choices[0])) return [3 /*break*/, 4];
                    return [4 /*yield*/, store()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 4:
                    if (!(colors == choices[1])) return [3 /*break*/, 6];
                    return [4 /*yield*/, view()];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 6:
                    if (!(colors == choices[2])) return [3 /*break*/, 8];
                    return [4 /*yield*/, find()];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    if (colors == choices[3]) {
                        process.exit(0);
                    }
                    else {
                        console.log("\n" + colors + "is not an option");
                    }
                    _a.label = 9;
                case 9: return [3 /*break*/, 1];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function pause() {
    require("child_process").spawnSync("pause", {
        shell: true,
        stdio: [0, 1, 2],
    });
}
function store() {
    return __awaiter(this, void 0, void 0, function () {
        var poke, response, data_1, move, j, pokemonImageResponse, imageData, imageBase64, updatedJson, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.clear();
                    console.log('\n\nThis stores your pokemon to viewbox');
                    poke = prompt("Enter your pokemon [ex. charizard]: ");
                    if (!Number(poke)) return [3 /*break*/, 1];
                    return [2 /*return*/, "ENTER a VALID POKEMON!!\n"];
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon/".concat(poke))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data_1 = _a.sent();
                    move = [];
                    for (j = 0; j < data_1.moves.length; j++) {
                        move.push(data_1.moves[j].move.name);
                    }
                    return [4 /*yield*/, fetch("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/".concat(data_1.id, ".png"))];
                case 4:
                    pokemonImageResponse = _a.sent();
                    return [4 /*yield*/, pokemonImageResponse.arrayBuffer()];
                case 5:
                    imageData = _a.sent();
                    imageBase64 = Buffer.from(imageData).toString('base64');
                    boxdata.push({
                        id: data_1.id,
                        name: data_1.name,
                        url: "https://pokeapi.co/api/v2/pokemon/".concat(data_1.name),
                        image: imageBase64,
                        moves: move,
                        sound: data_1.cries.latest
                    });
                    updatedJson = JSON.stringify(boxdata, null, 2);
                    fs.writeFileSync('Box.json', updatedJson);
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    return [2 /*return*/, console.log("An error was caught")];
                case 7:
                    pause();
                    return [2 /*return*/];
            }
        });
    });
}
function view() {
    console.log('Follow the link to the API: http://localhost:8080/PokeBox \nThen >>>');
    pause();
}
function find() {
    return __awaiter(this, void 0, void 0, function () {
        var poke, response, img_1, image_1, error_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('This finds your pokemon');
                    poke = prompt("Enter your pokemon [ex. charizard]: ");
                    if (!Number(poke)) return [3 /*break*/, 1];
                    return [2 /*return*/, "ENTER a VALID POKEMON, No numbers!!\n"];
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    console.log("Your Pokemon(JSON) is available on this link: http://localhost:8080/PokeBox/".concat(poke));
                    console.log("Your Pokemon(HTML) is available on this link: http://localhost:8080/meow.html/".concat(poke));
                    return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon/".concat(poke))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    img_1 = _a.sent();
                    console.log('\n\n\n\n got meow html   ' + img_1.id);
                    image_1 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/".concat(img_1.id, ".png");
                    // http://localhost:8080/meow.html/raichu
                    // Read (GET) a specific item by ID
                    app.get("/meow.html/".concat(poke), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var item;
                        return __generator(this, function (_a) {
                            item = data.find(function (item) { return item.name === poke; });
                            res.send("\n              <img src=\"".concat(image_1, "\"\n                width=\"525\"\n                height=\"300\"/>\n              <h1>View Pok\u00E9mon</h1>\n              <p>Name: ").concat(img_1.name, "</p>\n              <p>Moves: ").concat(item.moves.join(', '), "</p>\n              <p>Sound: ").concat(item.name, ".wav</p>\n              <p><audio controls>\n                <source src=\"").concat(item.sound, "\" type=\"audio/wav\">\n                Your browser does not support the audio element.\n              </audio></p>\n            "));
                            return [2 /*return*/];
                        });
                    }); });
                    // http://localhost:8080/PokeBox/raichu
                    // Read (GET) a specific item by ID
                    app.get('/PokeBox/:name', function (req, res) {
                        var item = data.find(function (item) { return item.name === poke; });
                        if (!item) {
                            res.status(404).json({ error: 'Item not found' });
                        }
                        else {
                            res.json(item);
                        }
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    pause();
                    return [2 /*return*/, console.log("No Pokemon Found 😢")];
                case 5:
                    pause();
                    return [2 /*return*/];
            }
        });
    });
}
