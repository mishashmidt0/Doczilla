const pg = require('pg');

const Pool = pg.Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '123',
    port: 5432,
    database: 'students',
});

module.exports = pool
