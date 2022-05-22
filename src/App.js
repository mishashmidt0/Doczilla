import './App.css';
import {useEffect, useState} from "react";
import {Axios} from './core/axios'
import {FormComponent} from "./components/Form";
import {Student} from "./components/Student";

function App() {
    const [isDone, setIsDone] = useState(false)
    const [students, setStudents] = useState([])

    async function addStudent(student) {

        await Axios.post('/student', student)
        Axios.get('/student').then((resp) => {
            const allStudents = resp.data;
            allStudents.reverse()
            setStudents(allStudents);
        });
    }

    async function deleteStudent(id) {
        await Axios.delete(`/student/${id}`)
        Axios.get('/student').then((resp) => {
            const allStudents = resp.data;
            allStudents.reverse()
            setStudents(allStudents);
        });
    }


    useEffect(() => {
        Axios.get('/student').then((resp) => {
            const allStudents = resp.data;
            allStudents.reverse()
            setStudents(allStudents);
        });
    }, [setStudents]);

    console.log(students)
    return (
        <div className="App">
            <div className='container'>
                <h1>Задание #2</h1>
                <FormComponent addStudent={addStudent}/>

                <button className='list' onClick={() => setIsDone(!isDone)}>Список студентов</button>

                {isDone && students.map((el) => <Student key={el.id} student={el} deleteStudent={deleteStudent}/>)}
            </div>

        </div>
    );
}

export default App;
