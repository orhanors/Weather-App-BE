const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const services = require("./routes");
const {
	notFoundHandler,
	genericErrorHandler,
	badRequestHandler,
	forbiddenError,
	unauthorizedError,
} = require("./middlewares/errorHandling");
const passport = require("passport");
const oauth = require("./middlewares/oauth");
const cookieParser = require("cookie-parser");
const server = express();

const port = process.env.PORT || 3001;
const mongodbUri = process.env.MONGODB_URI;

mongoose
	.connect(mongodbUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to DB"))
	.catch((err) => console.log("DB Connection Error! ", err));

//CORS SETTINGS

const whitelist = [process.env.REDIRECT_URL];
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true, //Allow cookie
};
//SETTING UP MIDDLEWARES
server.use(cors(corsOptions));
server.use(express.json());
server.use(passport.initialize());
server.use(cookieParser());

//ROUTES
server.use("/api", services);

//ERROR HANDLING MIDDLEWARES
server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(forbiddenError);
server.use(unauthorizedError);
server.use(genericErrorHandler);

//---------------------------------
server.listen(port, () => {
	if (server.get("env") === "production") {
		console.log("Server is running on CLOUD on port:", port);
	} else {
		console.log("Server is running on LOCALLY on port:", port);
	}
});
