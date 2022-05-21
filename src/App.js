import './App.css';
import {v4} from 'uuid';
import {useState} from "react";

function App() {
    let state = [
        {id: v4(), firstname: 'Misha', lastname: 'shmidt', patronymic: 'Egorovich', birthday: '03.01.01', group: '3'},
        {id: v4(), firstname: 'Misha', lastname: 'shmidt', patronymic: 'Egorovich', birthday: '03.01.01', group: '3'},
        {id: v4(), firstname: 'Misha', lastname: 'shmidt', patronymic: 'Egorovich', birthday: '03.01.01', group: '3'},
        {id: v4(), firstname: 'Misha', lastname: 'shmidt', patronymic: 'Egorovich', birthday: '03.01.01', group: '3'},
        {id: v4(), firstname: 'Misha', lastname: 'shmidt', patronymic: 'Egorovich', birthday: '03.01.01', group: '3'},
    ]

    const [isDone, setIsDone] = useState(false)

    return (
        <div className="App">
            <div className='container'>


                <div>
                    <h1>Задание #2</h1>
                    <input type="text" placeholder={' Имя'}/>
                    <input type="text" placeholder={' Фамилилия'}/>
                    <input type="text" placeholder={' Отчество'}/>
                    <input type="text" placeholder={' Дата рождения'}/>
                    <input type="text" placeholder={' Ваша группа'}/>

                    <button className='addUser'>Добавить</button>
                </div>


                <button className='list' onClick={() => setIsDone(!isDone)}>Список студентов</button>
                {isDone && state.map((el) => {
                    return <div key={el.id}>
                        <li className='student'>
                            <ul>{el.firstname}</ul>
                            <ul>{el.lastname}</ul>
                            <ul>{el.patronymic}</ul>
                            <ul>{el.birthday}</ul>
                            <ul>{el.group}</ul>
                            <button className='delete'>X</button>
                        </li>

                    </div>
                })}
            </div>

        </div>
    );
}

export default App;
