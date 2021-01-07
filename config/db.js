const mysql = require('mysql');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// config for your database
const con = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    multipleStatements: true
});

var sessionStore = new MySQLStore({}/* session store options */, con);

// connect to your database
con.connect((err) => {
    if (err) throw err;
    console.log("Connected to database");
});

module.exports = { con, sessionStore };