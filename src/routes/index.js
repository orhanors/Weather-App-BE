const services = require("express").Router();

const usersRoute = require("./user");

services.use("/users", usersRoute);

module.exports = services;
