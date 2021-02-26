const generateUserFromGoogle = (profile) => {
	const newUser = {
		googleId: profile.id,
		name: profile.name.givenName,
		surname: profile.name.familyName,
		email: profile.emails[0].value,
		image: profile.photos[0].value,
	};
	return newUser;
};
const generateUserFromFacebook = (profile) => {
	const newUser = {
		facebookId: profile.id,
		name: profile.name.givenName,
		surname: profile.name.familyName,
		email: profile.emails[0].value,
		image: profile.photos[0].value,
	};

	return newUser;
};

const generateUserFromSpotify = (profile) => {
	const newUser = {
		spotifyId: profile.id,
		name: profile.displayName.split(" ")[0],
		surname: profile.displayName.split(" ")[1],
		email: profile.emails[0].value,
		image: profile.photos[0].value,
	};

	return newUser;
};

module.exports = {
	generateUserFromFacebook,
	generateUserFromGoogle,
	generateUserFromSpotify,
};
