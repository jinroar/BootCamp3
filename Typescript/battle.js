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
function printLabel(labeledObj) {
    console.log("".concat(labeledObj.name, " hp: ").concat(labeledObj.hp, " atk: ").concat(labeledObj.atk, " "));
}
var Battle = function () { return __awaiter(_this, void 0, void 0, function () {
    //input pokemon 1
    function First_Page() {
        return __awaiter(this, void 0, void 0, function () {
            var poke1, response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.clear();
                        console.log("> Pokemon Mema Battle Yippie < \n\n");
                        poke1 = prompt("Enter your pokemon [ex. charizard]: ");
                        _a.label = 1;
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
                        // TypeError: Failed to fetch
                        console.log("\n\n[ERROR] \nPlease input pokemon name with given format");
                        pause();
                        return [2 /*return*/, ' PRESS [2] and ENTER a VALID POKEMON!!\n'];
                    case 5: return [2 /*return*/, poke1];
                }
            });
        });
    }
    var prompt, pause, flag, _loop_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prompt = require("prompt-sync")();
                pause = function () {
                    //pause, press any key to go back to menu
                    console.log("\n\n");
                    require("child_process").spawnSync("pause", {
                        shell: true,
                        stdio: [0, 1, 2],
                    });
                };
                flag = true;
                ;
                _loop_1 = function () {
                    var poke1, Second_Page, choice, _b, poke2, response, data, response2, data2, pokestats1, pokestats2, error_2;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, First_Page()];
                            case 1:
                                poke1 = _c.sent();
                                if (!(poke1 != undefined)) return [3 /*break*/, 13];
                                Second_Page = function () {
                                    console.log("\n> Pokemon Mema Battle Yippie <\n > Chosen Pokemon: ".concat(poke1, "\n                                    [1.] Choose your opposing pokemon:\n                                    [2.] Change Pokemon\n                                    [3.] Exit"));
                                    var choice = prompt(" >> ");
                                    return choice;
                                };
                                choice = Second_Page();
                                _b = choice;
                                switch (_b) {
                                    case "1": return [3 /*break*/, 2];
                                    case "2": return [3 /*break*/, 10];
                                    case "3": return [3 /*break*/, 10];
                                }
                                return [3 /*break*/, 11];
                            case 2:
                                //FIGHT FIGHT FIGHT
                                console.log("\n\nChoose your opponent:");
                                poke2 = prompt("Pokemon 2: ");
                                _c.label = 3;
                            case 3:
                                _c.trys.push([3, 8, , 9]);
                                return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon/".concat(poke1))];
                            case 4:
                                response = _c.sent();
                                return [4 /*yield*/, response.json()];
                            case 5:
                                data = _c.sent();
                                return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon/".concat(poke2))];
                            case 6:
                                response2 = _c.sent();
                                console.log("".concat(poke1, " vs ").concat(poke2, " rawrrawrrawr"));
                                return [4 /*yield*/, response2.json()];
                            case 7:
                                data2 = _c.sent();
                                pokestats1 = {
                                    name: poke1.toString(),
                                    hp: data.stats[0].base_stat,
                                    atk: data.stats[1].base_stat,
                                };
                                pokestats2 = {
                                    name: poke2,
                                    hp: data2.stats[0].base_stat,
                                    atk: data2.stats[1].base_stat,
                                };
                                printLabel(pokestats1);
                                printLabel(pokestats2);
                                if (pokestats1.atk == pokestats2.atk &&
                                    pokestats1.hp == pokestats2.hp) {
                                    console.log("DRAW!!");
                                }
                                else if ((pokestats1.atk > pokestats2.hp && pokestats2.atk > pokestats1.hp) ||
                                    (pokestats1.atk == pokestats2.atk && pokestats1.hp == pokestats2.hp)) {
                                    console.log("DRAW!!");
                                }
                                else if (pokestats1.atk > pokestats2.hp) {
                                    console.log("\n              ".concat(poke1, " WINS!!"));
                                }
                                else if (pokestats2.atk > pokestats1.hp) {
                                    console.log("".concat(poke2, " WINS!!"));
                                }
                                else {
                                    console.log("DRAW!!");
                                }
                                return [3 /*break*/, 9];
                            case 8:
                                error_2 = _c.sent();
                                // TypeError: Failed to fetch
                                console.log("\n\n[ERROR] \nPlease input pokemon name with given format");
                                return [3 /*break*/, 9];
                            case 9:
                                pause();
                                _c.label = 10;
                            case 10:
                                console.log("BYE BYE!!");
                                flag = false;
                                process.exit(0);
                                _c.label = 11;
                            case 11:
                                console.log("[ ERROR undefinded format, try again ]");
                                pause();
                                _c.label = 12;
                            case 12:
                                flag = true;
                                return [3 /*break*/, 14];
                            case 13:
                                console.log("\n\n [ ERROR undefinded format, try again  ]");
                                flag = true;
                                _c.label = 14;
                            case 14: return [2 /*return*/];
                        }
                    });
                };
                _a.label = 1;
            case 1:
                if (!flag) return [3 /*break*/, 3];
                return [5 /*yield**/, _loop_1()];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}); };
Battle();
