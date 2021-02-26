const userRoute = require("express").Router();
const passport = require("passport");
const handleTokens = require("../../middlewares/handleTokens");
const { validateToken } = require("../../middlewares/auth");
const {
	getMeProfile,
	refreshTokenHandler,
	logout,
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

//SPOTIFY
userRoute.get(
	"/spotifyLogin",
	passport.authenticate("spotify", { scope: ["user-read-email"] })
);

userRoute.get(
	"/spotifyRedirect",
	passport.authenticate("spotify"),
	handleTokens
);
module.exports = userRoute;
