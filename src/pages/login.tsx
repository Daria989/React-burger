import login from './login.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getLoginData } from '../services/actions/authActions';
import { Redirect } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from '../utils/hooks';

function Login() {

    interface LocationState {
        from: {
          pathname: string;
        };
      }

    const dispatch = useDispatch();
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
          dispatch(getLoginData(form))
        },
        [form]
      );

    const user = useSelector((store) => store.authReducer.name);
    const hasToken = localStorage.getItem('refreshToken')
    if (user && hasToken) {
        return (
            <Redirect
                to={ location.state?.from?.pathname || '/' }
            />
        );
    }
    
return (
    <div className={login.wrapper}>
        <div className={login.container}>
            <form data-testid = 'form' className={login.form} onSubmit={userAuthorization}>
                <p className="text text_type_main-medium">Вход</p>
                <Input  type={'email'} size="default" value={emailValue} placeholder={'Email'} onChange={onChangeEmail}/>
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