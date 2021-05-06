const sql = require('mssql');
require('dotenv').config();
console.log(process.env)

// const dbConfig = require('../config/db_config');

const dbConfig = {
    "connection": {
        "user": `${process.env.DB_USER}`,
        "password": `${process.env.DB_PASSWORD}`,
        "server": `${process.env.DB_SERVER}`,
        "database": "stox_db",
        "parseJSON": true,
        "options": {
            "encrypt": true,
            "enableArithAbort": false
        },
        "pool": {
            "min": 2,
            "max": 4,
            "idleTimeoutMills": 30000
        }
    }
}



const dbConnection = new sql.ConnectionPool(dbConfig.connection)
    .connect()
    .then( pool => {
        console.log('Connected to STOX DATABASE - MSSQL - AZURE');
        return pool;
    })
    .catch( err => console.log('Database connection Failed - Error: ' + err));


module.exports = {
    sql, dbConnection
}
