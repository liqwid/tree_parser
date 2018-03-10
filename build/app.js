"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var paths_1 = require("./utils/paths");
// Init express to serve static
var app = express();
app.use(express.static(paths_1.assetsPath));
exports.default = app;
//# sourceMappingURL=app.js.map