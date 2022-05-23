const pg = require('pg');
require('dotenv').config();

const Pool = pg.Pool
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: 5432,
    database: process.env.PGDATABASE,
});
pool.connect();

const query = ` 
 create TABLE student(
   id SERIAL PRIMARY KEY,
   name VARCHAR(255),
   shortDesc VARCHAR(255),
   description VARCHAR(255),
   isDone boolean,
   date DATE
);
 `;

pool.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Table is successfully created');
    pool.end()
});

module.exports = pool
