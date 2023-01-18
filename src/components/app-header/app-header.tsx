import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from './app-header.module.css';
import { Link, useLocation  } from 'react-router-dom';
import { useSelector } from '../../utils/hooks';

function AppHeader() {
  const user = useSelector((store) => store.authReducer.name);
  const { pathname } = useLocation();

  return (
    <header className={`${appHeader.header}`}>
      <ul className={appHeader.container}>
        <li className={`${appHeader.burger} pl-5 pr-5 pb-4 pt-4 mr-2`}>
          <Link className = {appHeader.link} to="/">
            <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'}/>
            <span className={pathname === '/' ? `${appHeader.textActive} pl-2 text text_type_main-default`: `${appHeader.text} pl-2 text text_type_main-default`}>Конструктор</span>
          </Link>
        </li>
    		<li className={`${appHeader.list} pl-5 pr-5 pb-4 pt-4`}>
          <Link className = {appHeader.link} to="/feed">
            <ListIcon type={pathname === '/feed' ? 'primary' : 'secondary'}/>
            <span className={pathname === '/feed' ? `${appHeader.textActive} pl-2 text text_type_main-default`: `${appHeader.text} pl-2 text text_type_main-default`}>Лента заказов</span>
          </Link>
        </li>
        <li className={appHeader.logo}>
          <Link className = {appHeader.link} to="/">
            <Logo />
          </Link>
        </li>
        <li className={`${appHeader.profile} pl-5 pr-5 pb-4 pt-4`}>
          <Link data-testid = 'profile' className = {appHeader.link} to="/profile">
            <ProfileIcon type={pathname === '/profile' ? 'primary' : 'secondary'}/>
            {user ?  
              <span className={pathname === '/profile' ? `${appHeader.textActive} pl-2 text text_type_main-default`: `${appHeader.text} pl-2 text text_type_main-default`}>{user}</span>
              :  <span className={pathname === '/profile' ? `${appHeader.textActive} pl-2 text text_type_main-default`: `${appHeader.text} pl-2 text text_type_main-default`}>Личный кабинет</span>
            }
          </Link>
        </li>
      </ul>
   </header>
  );
}

export default AppHeader;
