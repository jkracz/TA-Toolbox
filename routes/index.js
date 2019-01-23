const express = require('express');
const router = express.Router();
const db = require('./../db');

/* GET home page. */
router.get('/', function(req, res) {
	db.connectionPool.getConnection(function(err, connection) {
		if (err) {
			throw error;
		}

		const queryStr = db.getQueryString('fetchClockedIn');
		connection.query(queryStr, function(err, results, fields) {
			connection.release();
			if (err) {
				throw error;
			}
			res.render('index', { title: 'TA Toolbox', data: results, fields: fields });
		});
	});
});

router.post('/clockInOut', function(req, res, next) {
	db.connectionPool.getConnection(function(err, connection) {
		if (err) {
			throw error;
		}
		const barcode = req.body['barcode'];
		let queryStr = db.getQueryString('checkStatus', barcode);
		connection.query(queryStr, function(err, results) {
			if (err) {
				throw error;
			}
			if (results.length === 0) {
				queryStr = db.getQueryString('clockIn', barcode);
			}
			else {
				queryStr = db.getQueryString('clockOut', barcode);
			}

			connection.query(queryStr, function(err) {
				connection.release();
				if (err) {
					throw error;
				}
				res.redirect('/');
			});
		});
	});
});

router.post('/clockOutAll', function(req, res) {
	db.connectionPool.getConnection(function(err, connection) {
		if (err) {
			throw error;
		}
		const queryStr = db.getQueryString('clockOutAll', req.body['timeout']);
		connection.query(queryStr, function(err) {
			connection.release();
			if (err) {
				throw error;
			}
			res.redirect('/');
		});
	});
});

module.exports = router;
