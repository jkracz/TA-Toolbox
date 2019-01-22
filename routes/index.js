const express = require('express');
const router = express.Router();
const db = require('./../db');

/* GET home page. */
router.get('/', function(req, res, next) {
	db.connectionPool.getConnection(function(err, connection) {
		if (err) {
			throw error;
		}
		const queryStr = `SELECT * FROM tatoolbox.TrainingAttendance AS ta
							LEFT OUTER JOIN tatoolbox.TAInfo AS tai ON (tai.Barcode = ta.Barcode)
							WHERE ta.TimeOut IS NULL
							ORDER BY ta.TimeIn DESC;`;
		connection.query(queryStr, function(err, results, fields) {
			connection.release();
			if (err) {
				throw error;
			}
			console.log(fields);
			res.render('index', { title: 'TA Toolbox', data: results, fields: fields });
		});
	});
});

module.exports = router;
