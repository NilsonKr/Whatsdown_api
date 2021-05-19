const express = require('express');
const app = express();

const config = require('./config/index');
const routes = require('./network/routes');
//Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Routes
routes(app);

//Run server
app.listen(config.port, () => {
	console.log(`Magic Happens at http://localhost:${config.port}`);
});
