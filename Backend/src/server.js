const express = require("express");
const cors = require("cors");
const authorsRoutes = require("./routes/authors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authorsRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server listening on port ${ PORT }`);
});