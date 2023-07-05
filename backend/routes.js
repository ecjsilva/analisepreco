const express = require("express");
const routes = express.Router();

const productSeach = require("./productSeach");
const productSeachVZ = require("./productSeachVZ");
const productSeachAC = require("./productSeachAC");
const productSeachCZ = require("./productSeachCZ");



routes.get("/product/:id", productSeach.index);

routes.get("/productvz/:id", productSeachVZ.index);

routes.get("/productac/:id", productSeachAC.index);

routes.get("/productcz/:id", productSeachCZ.index);

module.exports = routes;
