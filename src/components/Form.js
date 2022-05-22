import React from 'react'
import {useCallback, useState} from "react";


function Form({addStudent}) {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [otchstvo, setOtchstvo] = useState('')
    const [date, setDate] = useState('')
    const [err, setError] = useState(true)
    const [group, setGroup] = useState('');
    let isPush = true

    const onChangeName = useCallback((e) => {

        setName(e.currentTarget.value.trim());
    }, []);
    const onChangeLastName = useCallback((e) => {

        setLastName(e.currentTarget.value.trim());
    }, []);
    const onChangeF = useCallback((e) => {

        setOtchstvo(e.currentTarget.value.trim());
    }, []);
    const onChangeDate = useCallback((e) => {

        setDate(e.currentTarget.value.trim());
    }, []);
    const onChangeGroup = useCallback((e) => {

        setGroup(e.currentTarget.value.trim());
    }, []);

    const add = () => {
        [name, lastName, otchstvo, date, group].forEach((el) => {
            if (el.trim() === '') {
                isPush = false
                setError(false)
            }
        })

        if (isPush) {
            addStudent({
                "name": name,
                "lastname": lastName,
                "patronymic": otchstvo,
                "birthday": date,
                "numbergroup": group
            })
            setName('');
            setLastName('')
            setOtchstvo('')
            setDate('')
            setGroup('')
            setError(true)
            isPush = true
        } else {
            alert('Заполните все поля')
        }

    };


    return (
        <div>
            <input className={err || !!name.trim() ? '' : 'errStyle'} type="text" placeholder={' Имя'}
                   onChange={onChangeName} value={name}/>
            <input className={err || !!lastName.trim() ? '' : 'errStyle'} type="text" placeholder={' Фамилилия'}
                   onChange={onChangeLastName} value={lastName}/>
            <input className={err || !!otchstvo.trim() ? '' : 'errStyle'} type="text" placeholder={' Отчество'}
                   onChange={onChangeF} value={otchstvo}/>
            <input className={err || !!date.trim() ? '' : 'errStyle'} type="date" placeholder={' Дата рождения'}
                   onChange={onChangeDate} value={date}/>
            <input className={err || !!group.trim() ? '' : 'errStyle'} type="number" placeholder={' Ваша группа'}
                   onChange={onChangeGroup} value={group}/>

            <button className='addUser' onClick={() => add()}>Добавить</button>
        </div>
    )
}

export const FormComponent = React.memo(Form)
