const convict = require("convict");

// schema
const config = convict({
	env: {
		doc: "The application environment",
		format: ["production", "development", "test"],
		default: "development",
		env: "NODE_ENV"
	},
	port: {
		doc: "The port to bind",
		format: "port",
		default: 8080,
		env: "PORT",
		arg: "port"
	},
	db: {
		connectionLimit: {
			doc: 'number of connections allowed in pool at once',
			format: 'int',
			env: 'POOL_CONNECTION_LIMIT',
			default: 10
		},
		host: {
			doc: 'ip address of connection',
			format: 'ipaddress',
			env: 'DB_HOST',
			default: ''
		},
		user: {
			doc: 'username',
			format: String,
			env: 'DB_USER',
			default: ''
		},
		password: {
			doc: 'password for DB_USER',
			format: String,
			env: 'DB_PASS',
			default: ''
		},
		database: {
			doc: 'name of db we are connecting to',
			format: String,
			env: 'DB_NAME',
			default: 'tatoolbox'
		}
	}
});
  
// Load environment dependent configuration
const env = config.get("env");
config.loadFile("./config/" + env + ".json");
  
// Perform validation
config.validate({allowed: "strict"});
  
module.exports = config;