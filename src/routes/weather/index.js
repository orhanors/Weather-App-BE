const weatherRouter = require("express").Router();
const { getWeather } = require("../../controllers/weatherController");
const { validateToken } = require("../../middlewares/auth");

weatherRouter.get("/:cityName", validateToken, getWeather);

module.exports = weatherRouter;
