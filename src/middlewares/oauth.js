const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStregy = require("passport-facebook").Strategy;

const UserModel = require("../models/userModel");
const { generateTokens } = require("../utils/jwt");
const {
	generateUserFromFacebook,
	generateUserFromGoogle,
	generateUserFromSpotify,
} = require("../utils/oauthUsers");
const {
	GOOGLE_OAUTH_CLIENT_ID,
	GOOGLE_OAUTH_CLIENT_SECRET,
	GOOGLE_REDIRECT_URL,
	FACEBOOK_APP_ID,
	FACEBOOK_APP_SECRET,
	FACEBOOK_REDIRECT_URL,
} = process.env;

passport.use(
	"google",
	new GoogleStrategy(
		{
			clientID: GOOGLE_OAUTH_CLIENT_ID,
			clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
			callbackURL: GOOGLE_REDIRECT_URL,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const user = await UserModel.findOne({ googleId: profile.id });

				if (user) {
					const tokens = await generateTokens(user);
					return done(null, { user, tokens });
				}

				const newUser = new UserModel(generateUserFromGoogle(profile));
				await newUser.save();
				const tokens = await generateTokens(newUser);
				done(null, { user: newUser, tokens });
			} catch (error) {
				console.log("Google passportjs error: ", error);
				done(error, false);
			}
		}
	)
);

passport.use(
	"facebook",
	new FacebookStregy(
		{
			clientID: FACEBOOK_APP_ID,
			clientSecret: FACEBOOK_APP_SECRET,
			callbackURL: FACEBOOK_REDIRECT_URL,
			profileFields: ["id", "displayName", "photos", "emails", "name"],
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const user = await UserModel.findOne({
					facebookId: profile.id,
				});

				if (user) {
					const tokens = await generateTokens(user);
					return done(null, { user, tokens });
				}

				const newUser = new UserModel(
					generateUserFromFacebook(profile)
				);
				await newUser.save();
				const tokens = await generateTokens(newUser);
				done(null, { user: newUser, tokens });
			} catch (error) {
				console.log("Facebook passportjs error: ", error);
				done(error, false);
			}
		}
	)
);

passport.serializeUser(function (user, next) {
	next(null, user);
});
