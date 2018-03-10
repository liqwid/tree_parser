"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, function () {
    console.log("App listening on port " + PORT + "!");
});
app_1.default.on('error', console.error);
//# sourceMappingURL=index.js.map