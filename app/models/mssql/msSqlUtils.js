/**
 * Created by Bandula Gamage on 12/05/2016.
 */
///////////////////////////////////////////////////////////////
// Module Dependencies
///////////////////////////////////////////////////////////////
var sql         = require('mssql');
var request     = require('request');
var moment      = require('moment-timezone');
var constants   = require('../../shared/constants');
var config      = require('../../config/config');

///////////////////////////////////////////////////////////////
// 	Exposed Methods
///////////////////////////////////////////////////////////////
module.exports = {
    /**
     * Refreshes the outages information from the DB providing the given latest ID,
     * generate GeoJSON objects and stores in MongoDB for later retrieval.
     *
     * @param req
     * @param res
     */
    catchupRecentUpdatesTriggeredByScheduler: function() {
        readLatestFromDB();
    }

};

///////////////////////////////////////////////////////////////
// 	Internal Implementation Functions
///////////////////////////////////////////////////////////////

/**
 * Reads the latest from the db
 */
function readLatestFromDB() {
    updateSequence++;

    /**
     * Use of streaming with PL/SQL SPs to handle large number of records
     */
    sql.connect(config.odsDBConfig, function(err) {
        var request = new sql.Request();
        request.stream = true; 						// You can set streaming differently for each request
        request.execute('[dbo].sample_stored_procedure');

        request.on('recordset', function(columns) {
            // Emitted once for each recordset in a query
            //console.dir(columns);
        });

        request.on('row', function(row) {
            // Emitted for each row in a recordset
            processUpdate(row);
        });

        request.on('error', function(err) {
            // May be emitted multiple times
            console.dir('<CR::msSqlUtils.readLatestFromDB> Error: ' + err);
        });

        request.on('done', function(returnValue) {
            // Always emitted as the last one

            // Update latest refreshed details
            latestRefreshedTime = moment().format('x');

            console.log('<CR::msSqlUtils.readLatestFromDB> Time: ' + moment().format() + ', No of records: ' + updateSequence);
        });
    });

    sql.on('error', function(err) {
        console.log('<CR::msSqlUtils.readLatestFromDB> Error occurred ' + err);
    });
}

function processUpdate() {
    updateSequence++;
}
