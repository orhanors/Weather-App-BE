const UserModel = require("../models/userModel");
const { handleRefreshToken } = require("../utils/jwt");
exports.getMeProfile = async (req, res, next) => {
	try {
		res.status(201).json({ data: req.user });
	} catch (error) {
		console.log("profile get me error", error);
		next(error);
	}
};

exports.refreshTokenHandler = async (req, res, next) => {
	try {
		const oldRefreshToken = req.cookies.refreshToken;
		if (!oldRefreshToken)
			throw new ApiError(400, "Refresh token is missing");
		const newTokens = await handleRefreshToken(oldRefreshToken);
		res.cookies("token", newTokens.token);
		res.cookies("refreshToken", newTokens.refreshToken);
		res.send("OK");
	} catch (error) {
		console.log("Refresh token error", error);
		next(new ApiError(403, error.message));
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
