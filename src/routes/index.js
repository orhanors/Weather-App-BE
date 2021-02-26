const services = require("express").Router();

const usersRoute = require("./user");
const weatherRoute = require("./weather");
services.use("/users", usersRoute);
services.use("/weather", weatherRoute);

module.exports = services;
