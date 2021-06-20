require('dotenv').config();

const config = {
	dev: process.env.NODE_ENV,
	port: process.env.PORT || 3000,
	db_uri: process.env.DB_URI,
	privatePassword: process.env.PRIVATE_PASSWORD,
};

module.exports = config;
