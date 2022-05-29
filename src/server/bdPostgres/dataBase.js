const pg = require('pg');
require('dotenv').config();

const Pool = pg.Pool
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
});
pool.connect();

const query = ` 
 create TABLE students(
   id SERIAL PRIMARY KEY,
   name VARCHAR(255),
   lastname VARCHAR(255),
   patronymic VARCHAR(255),
   birthday DATE,
   numberGroup SMALLINT
);
 `;

pool.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Table is successfully created');
});

module.exports = pool
