const express = require("express");
const cors = require("cors");

const usuariosRoutes = require("./routes/usuarios");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

// app.use("/", (req, res) => {
//   res.json({ message: "HELLO WORLD" });
// });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
