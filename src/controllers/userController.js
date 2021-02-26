const UserModel = require("../models/userModel");
const { removeItem } = require("../utils/arrayUtils");
const { handleRefreshToken, verifyJWT } = require("../utils/jwt");
const ApiError = require("../utils/ApiError");
exports.getMeProfile = async (req, res, next) => {
	try {
		res.status(201).send(req.user);
	} catch (error) {
		console.log("profile get me error", error);
		next(error);
	}
};

exports.refreshTokenHandler = async (req, res, next) => {
	try {
		const oldRefreshToken = req.cookies.refreshToken;
		console.log("old token is:", oldRefreshToken);
		if (!oldRefreshToken)
			throw new ApiError(400, "Refresh token is missing");
		const newTokens = await handleRefreshToken(oldRefreshToken);
		console.log("new token is: ", newTokens.token);
		res.cookie("token", newTokens.token);
		res.cookie("refreshToken", newTokens.refreshToken);
		res.send("OK");
	} catch (error) {
		console.log("Refresh token error", error);
		next(error);
	}
};

exports.logout = async (req, res, next) => {
	try {
		req.user.refreshTokens = [];
		await req.user.save();
		res.clearCookie("token");
		res.clearCookie("refreshToken");
		res.cookie("isAuthUser", false);
		// res.redirect(process.env.REDIRECT_LOGIN_URL);
		res.send("OK");
	} catch (error) {
		console.log("logout error: ", error);
		next(error);
	}
};

exports.addFavoriteCity = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		const { cityName } = req.params;
		const { _id } = await verifyJWT(token);

		const user = await UserModel.findById(_id);
		user.favoriteCities.push(cityName);
		await user.save();
		res.status(200).send(user);
	} catch (error) {
		console.log(error);
		next(error);
	}
};

exports.removeFavoriteCity = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		const { cityName } = req.params;
		const { _id } = await verifyJWT(token);

		const user = await UserModel.findById(_id);

		removeItem(user.favoriteCities, cityName);
		await user.save();
		res.status(200).send(user);
	} catch (error) {
		console.log("fav delete error", error);
		next(error);
	}
};
