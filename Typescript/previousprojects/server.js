var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var express = require('express');
var app = express();
//Express via common js || Get require to work for es module
//import { createRequire } from "module";
//const require = createRequire(import.meta.url);
var readFile = require("fs").promises.readFile;
//PORT
var port = process.env.PORT || 8080; // Use the port provided by the host or default to 3000
app.listen(port, function () {
    console.log("Server listening on port ".concat(port));
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
var data = [
    { id: 1, name: 'Sir Srilan' },
    { id: 2, name: 'Kuya JF' },
    { id: 3, name: 'Kuya Jason' },
    { id: 4, name: 'Yves' },
    { id: 5, name: 'Lo' },
    { id: 6, name: 'Mike' },
    { id: 7, name: 'Jene' },
    { id: 8, name: 'Hanif' },
];
// Middleware to parse JSON requests
app.use(express.json());
// Create (POST) a new item
app.post('/Globaltek_Office', function (req, res) {
    var newItem = req.body;
    data.push(newItem);
    res.status(201).json(newItem);
});
// POST http://localhost:3000/Globaltek_Office
// Body: { "name": "New Item" }
// Read (GET) all Globaltek_Office
app.get('/Globaltek_Office', function (req, res) {
    res.json(data);
});
//GET http://localhost:3000/Globaltek_Office
// Read (GET) a specific item by ID
app.get('/Globaltek_Office/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var item = data.find(function (item) { return item.id === id; });
    if (!item) {
        res.status(404).json({ error: 'Item not found' });
    }
    else {
        res.json(item);
    }
});
//GET http://localhost:3000/Globaltek_Office/1
// Update (PUT) an item by ID
app.put('/Globaltek_Office/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var updatedItem = req.body;
    var index = data.findIndex(function (item) { return item.id === id; });
    if (index === -1) {
        res.status(404).json({ error: 'Item not found' });
    }
    else {
        data[index] = __assign(__assign({}, data[index]), updatedItem);
        res.json(data[index]);
    }
});
// PUT http://localhost:3000/Globaltek_Office/1
// Body: { "name": "Updated Item" }
// Delete (DELETE) an item by ID
app.delete('/Globaltek_Office/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var index = data.findIndex(function (item) { return item.id === id; });
    if (index === -1) {
        res.status(404).json({ error: 'Item not found' });
    }
    else {
        var deletedItem = data.splice(index, 1);
        res.json(deletedItem[0]);
    }
});
//DELETE http://localhost:3000/Globaltek_Office/1
