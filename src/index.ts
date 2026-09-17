import { crearApp } from "./app.js";

const PORT = process.env.PORT || 3000;

const app = crearApp();

app.listen(PORT, () => {
  console.log(`Warhammer 40,000 Army List API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/salud`);
  console.log(`Army lists: http://localhost:${PORT}/api/armylists`);
  console.log(`Units: http://localhost:${PORT}/api/units`);
  console.log(`Weapons: http://localhost:${PORT}/api/weapons`);
});