const axios = require("axios");
//https://api.openweathermap.org/data/2.5/forecast?q=${keyword}&appid=eed5642c06252c49dccb7d54648c7cf9
exports.getWeather = async (req, res, next) => {
	try {
		const { cityName } = req.params;
		const response = await axios.get(
			`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${process.env.WEATHER_API_KEY}`
		);

		const data = response.data;
		res.status(200).send(data);
	} catch (error) {
		console.log("weather error: ", error);
		next(error);
	}
};
