const mysql = require('mysql');
const config = require('./config');

const pool = mysql.createPool(config.get('db'));

function getQueryString(actionID, ...args) {
	let queryString = '';
	const now = new Date();
	const yyyy = now.getFullYear();
	const mm = now.getMonth() + 1;
	const dd = now.getDate();
	const hh = now.getHours();
	const mins = now.getMinutes();
	switch (actionID) {
		case 'fetchClockedIn':
			queryString = `SELECT ta.Barcode, tai.NetID, tai.FirstName, tai.LastName, ta.TimeIn
							FROM tatoolbox.TrainingAttendance AS ta
							LEFT OUTER JOIN tatoolbox.TAInfo AS tai ON (tai.Barcode = ta.Barcode)
							WHERE ta.TimeOut IS NULL
							ORDER BY ta.TimeIn DESC`;
			break;
		case 'clockIn':
			queryString = `INSERT INTO tatoolbox.TrainingAttendance (Barcode, TimeIn)
							VALUES ('${args[0]}', '${yyyy}-${mm}-${dd} ${hh}:${mins}')`;
			break;
		case 'checkStatus':
			queryString = `SELECT * FROM tatoolbox.TrainingAttendance
							WHERE Barcode = '${args[0]}'
							AND TimeOut IS NULL`;
			break;
		case 'clockOut':
			queryString = `UPDATE tatoolbox.TrainingAttendance
							SET TimeOut = '${yyyy}-${mm}-${dd} ${hh}:${mins}'
							WHERE Barcode = '${args[0]}'`;
			break;
		case 'clockOutAll':
			const timeOut = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${args[0]}`;
			queryString = `UPDATE tatoolbox.TrainingAttendance
						SET TimeOut = '${timeOut}'
						WHERE TimeOut IS NULL`;
			break;
	}
	return queryString;
}

module.exports = {
	connectionPool: pool,
	getQueryString: getQueryString
};