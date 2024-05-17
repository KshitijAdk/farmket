import mysql from "mysql";

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME
});

pool.getConnection((err, connection) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
    connection.release(); // Release the connection back to the pool
});

export default pool;
