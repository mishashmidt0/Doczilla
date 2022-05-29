const pool = require('../bdPostgres/dataBase.js')

class StudentController {
    async createStudent(req, res) {
        const {name, lastname, patronymic, birthday, numberGroup} = req.body

        const newStudent = await pool.query(`INSERT INTO students (name, lastname, patronymic, birthday, numberGroup) 
        values ($1,$2,$3,$4,$5) RETURNING *`, [name, lastname, patronymic, birthday, numberGroup])
        res.json(newStudent)
    }

    async getStudents(req, res) {
        const students = await pool.query('SELECT * FROM students')
        res.json(students.rows)

    }

    async deleteStudent(req, res) {
        const id = req.params.id;
        const student = await pool.query(`DELETE FROM students where id = $1`, [id])
        res.json(student.rows[0])
    }
}

module.exports = StudentController
