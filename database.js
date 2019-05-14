/**
 * MySQL Database connector
 * 
 * @author : ludovic@toinel.com
 */
var mysql = require('mysql')
var util = require('util')
const config = require('./config')

// Create a connection to the MySQL Dotclear DB
var pool = mysql.createPool(config.database)

// Promisify the pool query
pool.query = util.promisify(pool.query);

// Return a connexion
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})

module.exports = pool