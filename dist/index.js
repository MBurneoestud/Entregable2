"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const PORT = process.env.PORT || 3000;
const app = (0, app_js_1.crearApp)();
app.listen(PORT, () => {
    console.log(`Warhammer 40,000 Army List API running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/salud`);
    console.log(`Army lists: http://localhost:${PORT}/api/armylists`);
    console.log(`Units: http://localhost:${PORT}/api/units`);
    console.log(`Weapons: http://localhost:${PORT}/api/weapons`);
});
