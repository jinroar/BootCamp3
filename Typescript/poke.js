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
var _this = this;
function Title() {
    console.clear();
    console.log("> Pokemon Mema Battle Yippie < \n\n");
}
function getStats(labeledObj) {
    console.log("Pokemon: ".concat(labeledObj.name, " hp: ").concat(labeledObj.hp, " atk: ").concat(labeledObj.atk));
}
function error_pause(error) {
    if (error === 1) {
        console.log("\n\n[ERROR] \nPlease input with given format");
    }
    require("child_process").spawnSync("pause", {
        shell: true,
        stdio: [0, 1, 2],
    });
}
var Battle = function () { return __awaiter(_this, void 0, void 0, function () {
    function First_Page() {
        return __awaiter(this, void 0, void 0, function () {
            var poke1, response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Title(); // call heading
                        poke1 = prompt("Enter your pokemon [ex. charizard]: ");
                        if (!Number(poke1)) return [3 /*break*/, 1];
                        return [2 /*return*/, " PRESS [2] and ENTER a VALID POKEMON!!\n"];
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon/".concat(poke1))];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        error_pause(1);
                        return [2 /*return*/, " PRESS [2] and ENTER a VALID POKEMON!!\n"]; // Error return 'notice'
                    case 5: return [2 /*return*/, poke1]; // 'poke1`
                }
            });
        });
    }
    function Second_Page(poke1, poke2) {
        return __awaiter(this, void 0, void 0, function () {
            var choice;
            return __generator(this, function (_a) {
                Title(); // 2nd Page Menu 
                console.log(" > Chosen Pokemon: ".concat(poke1, "  \n > Opposing Pokemon: ").concat(poke2, " \n        [1.] Choose your opposing pokemon:\n        [2.] Change Pokemon\n        [3.] Exit"));
                choice = prompt(" >> ");
                return [2 /*return*/, choice];
            });
        });
    }
    function Fight(poke1) {
        return __awaiter(this, void 0, void 0, function () {
            var poke2, response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        poke2 = prompt("Enter your opposing pokemon [ex. charizard]: ");
                        if (!Number(poke2)) return [3 /*break*/, 1];
                        error_pause(1);
                        return [2 /*return*/, " PRESS [1] and ENTER a VALID POKEMON!!\n"]; // Error return 'notice'
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon/".concat(poke2))];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        error_pause(1);
                        return [2 /*return*/, Second_Page(poke1, "PRESS [1] and ENTER a VALID INPUT!!\n")]; // Error return 'notice'
                    case 5: return [2 /*return*/, poke2]; // Note: Functions are fragmented for errorhandling
                }
            });
        });
    } // Start of While loop
    var prompt, flag, poke1, choice, poke2, response, data, response2, data2, pokestats1, pokestats2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prompt = require("prompt-sync")();
                flag = true;
                _a.label = 1;
            case 1:
                if (!flag) return [3 /*break*/, 13];
                return [4 /*yield*/, First_Page()];
            case 2:
                poke1 = _a.sent();
                return [4 /*yield*/, Second_Page(poke1, "Not yet entered [PRESS 1. FIGHT]\n")];
            case 3:
                choice = _a.sent();
                if (!(choice == "1")) return [3 /*break*/, 11];
                return [4 /*yield*/, Fight(poke1)];
            case 4:
                poke2 = _a.sent();
                if (!(poke2 != undefined)) return [3 /*break*/, 9];
                return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon/".concat(poke1))];
            case 5:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 6:
                data = _a.sent();
                return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon/".concat(poke2))];
            case 7:
                response2 = _a.sent();
                return [4 /*yield*/, response2.json()];
            case 8:
                data2 = _a.sent();
                pokestats1 = { name: poke1, hp: data.stats[0].base_stat, atk: data.stats[1].base_stat };
                pokestats2 = { name: poke2, hp: data2.stats[0].base_stat, atk: data2.stats[1].base_stat };
                console.log("\n\n".concat(poke1, " vs ").concat(poke2, "  rawrrawrrawr")); //Display stats
                getStats(pokestats1);
                getStats(pokestats2);
                if (pokestats1.atk == pokestats2.atk && pokestats1.hp == pokestats2.hp) {
                    console.log("DRAW!!\n\n"); // Start of Fight Conditions
                }
                else if ((pokestats1.atk > pokestats2.hp && pokestats2.atk > pokestats1.hp) ||
                    (pokestats1.atk == pokestats2.atk && pokestats1.hp == pokestats2.hp)) {
                    console.log("DRAW!!\n\n");
                }
                else if (pokestats1.atk > pokestats2.hp) {
                    console.log(" ".concat(poke1, " WINS!!\n\n"));
                }
                else if (pokestats2.atk > pokestats1.hp) {
                    console.log("".concat(poke2, " WINS!!\n\n"));
                }
                else {
                    console.log("DRAW!!\n\n");
                } // End of Fight Conditions
                return [3 /*break*/, 10];
            case 9:
                error_pause(1);
                _a.label = 10;
            case 10:
                error_pause(0); // End of Choice 1
                return [3 /*break*/, 12];
            case 11:
                if (choice == "2") {
                    return [3 /*break*/, 1]; //Back to First Page 
                }
                else if (choice == "3") {
                    console.log("BYE BYE!!");
                    process.exit(0);
                } // Exit
                _a.label = 12;
            case 12: return [3 /*break*/, 1];
            case 13: return [2 /*return*/];
        }
    });
}); };
Battle();