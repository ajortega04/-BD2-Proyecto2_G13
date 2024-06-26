const express = require("express");
const cors = require("cors");
const authorsRoutes = require("./routes/authors");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", authRoutes);
app.use("/", authorsRoutes);

const PORT = 3000;

mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'store'
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conexión exitosa a MongoDB');
});

app.listen(PORT, () => {
    console.log(`server listening on port ${ PORT }`);
});