import pg from 'pg'

const Pool = pg.Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '123',
    port: 5432,
    database: 'students',
});

// {"name": "misha",
//     "lastname": "shmidt",
//     "patronymic": "olegovich",
//     "birthday": "03.03.03",
//     "numberGroup": "2"}

export default pool
