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
		main: {
			doc: "primary DB",
			format: "*",
			env: "DB_MAIN",
			default: ""
		}
	},
	api_whitelist: {
		doc: "IP addresses able to utilize the api",
		format: "*",
		env: "API_WHITELIST",
		default: 8080
	}
});
  
// Load environment dependent configuration
const env = config.get("env");
config.loadFile("./config/" + env + ".json");
  
// Perform validation
config.validate({allowed: "strict"});
  
module.exports = config;