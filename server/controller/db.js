import mysql from "mysql";

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'farmket'
});

pool.getConnection((err, connection) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
    connection.release(); // Release the connection back to the pool
});

export default pool;
