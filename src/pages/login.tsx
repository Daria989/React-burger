import login from './login.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getLoginData } from '../services/actions/auth-actions';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {getCookie } from '../services/cookie';
import {useLocation} from 'react-router-dom';

function Login() {

    interface LocationState {
        from: {
          pathname: string;
        };
      }

    const dispatch = useDispatch<any>();
    const location = useLocation<LocationState>();
    
    const [emailValue, setEmailValue] = useState('');
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value)
    }

    const [passwordValue, setPasswordValue] = useState('')
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value)
    }

    const form = {
        email: emailValue, 
        password: passwordValue
    }

    const userAuthorization = useCallback(
        (e: React.FormEvent) => {
          e.preventDefault();
          dispatch(getLoginData(form));
        },
        [form]
      );

    const user = useSelector<any>((store) => store.authReducer.name);
    const accessToken = getCookie('token');
    
    if (user || accessToken) {
        return (
            <Redirect
            to={ location.state?.from?.pathname || '/' }
            />
        );
    }
    
return (
    <div className={login.wrapper}>
        <div className={login.container}>
            <form className={login.form} onSubmit={userAuthorization}>
                <p className="text text_type_main-medium">Вход</p>
                <Input type={'email'} size="default" value={emailValue} placeholder={'Email'} onChange={onChangeEmail}/>
                <PasswordInput onChange={onChangePassword} size="default" value={passwordValue} name={'password'}/>
                <Button type="primary" size="medium"> 
                    Войти
                </Button>
            </form>
            <p className="mt-20 text text_type_main-default">Вы — новый пользователь? 
                <Link to='/register' className={login.link}> Зарегистрироваться</Link>
            </p> 
            <p className="text text_type_main-default" >Забыли пароль? 
                <Link to='/forgot-password' className={login.link}> Восстановить пароль</Link>
            </p>
        </div>
    </div>
    );
}

export default Login;