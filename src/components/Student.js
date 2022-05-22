export function Student({student, deleteStudent}) {

    console.log('asdf    ' + student[0])
    return (
        <div>
            <li className='student'>
                <ul>{student.name}</ul>
                <ul>{student.lastname}</ul>
                <ul>{student.patronymic}</ul>
                <ul>{student.birthday.slice(0, 10)}</ul>
                <ul>{student.group}</ul>
                <button className='delete' onClick={() => deleteStudent(student.id)}>X</button>
            </li>

        </div>
    )
}
