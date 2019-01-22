const mysql = require('mysql');
const config = require('./config');

const pool = mysql.createPool(config.get('db'));

module.exports = {
	connectionPool: pool
};