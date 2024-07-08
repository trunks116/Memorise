const mysql = require('mysql2/promise');

const cnx = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "memorisedb",
});

cnx.getConnection(function(error){
    if(!!error) {
        console.log(error);
    } else {
        console.log('Database Connected Successfully!');
    }
});

export default cnx;