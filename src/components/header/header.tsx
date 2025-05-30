import React, { useMemo, FC } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

// Подключение компонентов
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение Redux
import { useSelector } from '../../services/hooks';

// Подключение стилей
import styles from './header.module.css';
import shallowEqual from '../../utils/shallowEqual';

const Header: FC = () => {
  // Получение текущего местоположения
  const currentLocation = useLocation();

  // Получение информации о пользователе из Redux
  const { information: userInformation } = useSelector((store) => store.userData, shallowEqual);

  // Функция для определения типа иконки на основе текущего местоположения
  const getIconType = (url: string) => (currentLocation.pathname === url ? 'primary' : 'secondary');

  // Мемоизация функции для определения стиля ссылки
  const getLinkStyle = useMemo(
    () =>
      ({ isActive }: { isActive: boolean }) => {
        const defaultStyle = `${styles.link} text_color_inactive pt-4 pb-4 pr-5 pl-5`;
        return `${defaultStyle} ${isActive ? styles.link_active : ''}`;
      },
    [],
  );

  // Конфигурации каждой ссылки
  const linkConfigurations = [
    { to: '/', label: 'Конструктор', icon: <BurgerIcon type={getIconType('/')} /> },
    { to: '/feed', label: 'Лента заказов', icon: <ListIcon type={getIconType('/feed')} /> },
  ];

  // Конфигурации ссылки в личный кабинет
  const linkConfigurationProfile = {
    to: '/profile',
    label: userInformation ? userInformation.name : 'Личный кабинет',
    icon: <ProfileIcon type={getIconType('/profile')} />,
  };

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {linkConfigurations.map(({ to, label, icon }, index) => (
            <li key={index}>
              {/* Использование NavLink для навигации с активным состоянием */}
              <NavLink className={getLinkStyle} to={to}>
                {icon}
                <span className="text text_type_main-default">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        {/* Использование обычной ссылки для логотипа */}
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        {/* Использование NavLink для навигации в кабинет пользователя */}
        <NavLink className={getLinkStyle} to={linkConfigurationProfile.to}>
          {linkConfigurationProfile.icon}
          <span className="text text_type_main-default">{linkConfigurationProfile.label}</span>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
