require("dotenv").config();

const { createPool } = require("./src/createPool");
const { createApp } = require("./src/createApp");

const pool = createPool(process.env);
const app = createApp(pool, process.env);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`${process.env.CLIENT_NAME || "Client"} backend running on http://localhost:${PORT}`);
});
