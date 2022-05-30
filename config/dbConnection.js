const mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: 'yourDBHostnameHere',
        user: 'yourDBUserHere',
        password: 'yourDBPasswordHere',
        database: 'yourDBHere'
    })
}