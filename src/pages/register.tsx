import register from './register.module.css';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { getRegisterData } from '../services/actions/authActions';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from '../utils/hooks';

function Register() {
    const registerSuccess = useSelector(store => store.authReducer.registerSuccess);
    const user = useSelector(store => store.authReducer.user);
    const token = localStorage.getItem('refreshToken');

    const dispatch = useDispatch();

    const [nameValue, setNameValue] = useState('');
    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(e.target.value)
    }

    const [emailValue, setEmailValue] = useState('');
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value)
    }

    const [passwordValue, setPasswordValue] = useState('');
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value)
    }

    const registerNewUser = () => {
        dispatch(getRegisterData(nameValue, emailValue, passwordValue));
    };

    if (user || token) {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    }

    if (registerSuccess) {
        return (
            <Redirect
                to={{
                    pathname: '/login'
                }}
            />
        );
    }

return (
    <div className={register.wrapper}>
        <div className={register.container}>
            <p className="text text_type_main-medium">Регистрация</p>
            <form onSubmit={(event) => {event.preventDefault(); registerNewUser()}} className={register.inputs}>
                <Input type={'text'} size="default" value={nameValue} placeholder={'Имя'}  onChange={onChangeName}/>
                <EmailInput size="default" value={emailValue} name={'email'} onChange={onChangeEmail}/>
                <PasswordInput onChange={onChangePassword} size="default" value={passwordValue} name={'password'}/>
                <Button htmlType="submit" type="primary" size="medium">
                    Зарегистрироваться
                </Button>
            </form>
            <p className="mt-20 text text_type_main-default">Уже зарегистрированы? 
            <Link to='/login' className={register.link}> Войти</Link>
            </p>
        </div>
    </div>

    );
}

export default Register;