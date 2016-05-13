///////////////////////////////////////////////////////////////
// Module Dependencies
///////////////////////////////////////////////////////////////
var path    = require('path');
var fs      = require('fs');
var env     = {};
var envFile = require('path').join(__dirname, './env/configurations.json');

// Read env.json file, if it exists, load the id's and secrets from that
if (fs.existsSync(envFile)) {
	env = fs.readFileSync(envFile, 'utf-8');
	env = JSON.parse(env);

	Object.keys(env).forEach(function (key) {
		process.env[key] = env[key];
	});
}

///////////////////////////////////////////////////////////////
// 	Expose configurations
///////////////////////////////////////////////////////////////
module.exports = {
	mssqlDBConfig: {
		user:       process.env.DB_USER,
		password:   process.env.DB_PASSWORD,
		server:     process.env.DB_SERVER,      // 'localhost\\instance' to connect to named instance
		database:   process.env.DATABASE,
		//stream: true,                         // Enable streaming globally

		options: {
			encrypt: false                      // Use this if you're on Windows Azure
		}
	},

	mongoDBConfig: {
		server:     process.env.MONGO_DB_SERVER,
		port:       process.env.MONGO_DB_PORT,
		database:   process.env.MONGO_DB_DATABASE
	},

	scheduleConfig: {
		hour:       process.env.JSON_PROCESS_HOUR,
		minute:     process.env.JSON_PROCESS_MINUTE
	},

	outputConfig: {
		maxNoOfRecords: process.env.OUTPUT_RESULTSET_SIZE
	}


};

