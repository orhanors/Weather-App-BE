const { verifyJWT } = require("../utils/jwt");
const ApiError = require("../utils/ApiError");
const UserModel = require("../models/userModel.js");
const validateToken = async (req, res, next) => {
	try {
		const token = req.cookies.token;

		const decoded = await verifyJWT(token);
		const user = await UserModel.findOne({
			_id: decoded._id,
		});

		if (!user) {
			throw new ApiError(401, "Unauthorized");
		}

		req.token = token;
		req.user = user;
		next();
	} catch (e) {
		next(new ApiError(401, "Unauthorized"));
	}
};

module.exports = { validateToken };
