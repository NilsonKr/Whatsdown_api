//DEBUG=app:* node scripts/seedApiKeys.js
const debug = require('debug')('app:scripts:users');
const crypto = require('crypto');
const chalk = require('chalk');
const config = require('../config/index');

const connectDb = require('../db');

connectDb(config.db_uri);
