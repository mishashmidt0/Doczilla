export function Student({student, deleteStudent}) {

    return (
        <div>
            <li className='student'>
                <ul>{student.name}</ul>
                <ul>{student.lastname}</ul>
                <ul>{student.patronymic}</ul>
                <ul>{student.birthday.slice(0, 10)}</ul>
                <ul>{student.numbergroup}</ul>
                <button className='delete' onClick={() => deleteStudent(student.id)}>X</button>
            </li>

        </div>
    )
}
