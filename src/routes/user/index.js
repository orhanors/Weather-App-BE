const userRoute = require("express").Router();
const passport = require("passport");
const handleTokens = require("../../middlewares/handleTokens");
const { validateToken } = require("../../middlewares/auth");
const {
	getMeProfile,
	refreshTokenHandler,
	logout,
	addFavoriteCity,
	removeFavoriteCity,
} = require("../../controllers/userController");

userRoute.get("/me", validateToken, getMeProfile);

userRoute.get("/refreshToken", refreshTokenHandler);

userRoute.get("/logout", validateToken, logout);
//GOOGLE
userRoute.get(
	"/googleLogin",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

userRoute.get("/googleRedirect", passport.authenticate("google"), handleTokens);

//FACEBOOK
userRoute.get(
	"/facebookLogin",
	passport.authenticate("facebook", { scope: ["email"] })
);
userRoute.get(
	"/facebookRedirect",
	passport.authenticate("facebook"),
	handleTokens
);

//Favorite weathers
userRoute.get("/favorites/:cityName", validateToken, addFavoriteCity);
userRoute.delete("/favorites/:cityName", validateToken, removeFavoriteCity);

module.exports = userRoute;
