const mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: 'testdb.cso7pkzz0exg.us-east-1.rds.amazonaws.com',
        user: 'root',
        password: 'admin123',
        database: 'alumnosdb'
    })
}