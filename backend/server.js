const express = require("express");
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");
const port = 3002;
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.listen(port, console.log(`Servidor rodando na porta ${port}`));
