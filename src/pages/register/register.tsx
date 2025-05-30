import React, { useState, useEffect, FC, FormEvent } from 'react';
import { Link } from 'react-router-dom';

// Подключение компонентов
import { Input, EmailInput, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение Redux
import { useDispatch, useSelector } from '../../services/hooks';
import { startRegistration } from '../../services/actions/user';
import { registration } from '../../services/thunk/user';

// Подключение стилей
import styles from './register.module.css';
import useForm from '../../utils/useForm';

const RegisterPage: FC = () => {
  // Получение диспетчера Redux
  const dispatch = useDispatch();
  // Получение данных из Redux-стейта
  const { isRequestingRegistration: isRequesting, hasRequestRegistrationFailed: hasRequesFailed } = useSelector(
    (state) => state.userData,
  );

  // Использование хука для управления значениями формы
  const { values, handleChange } = useForm({ name: '', email: '', password: '' });
  // Состояние для отслеживания отправки формы
  const [isFormSubmitted, setisFormSubmitted] = useState(false);

  useEffect(() => {
    dispatch(startRegistration());
  }, [dispatch]);

  // Обработчик отправки формы
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setisFormSubmitted(true);
    if (!values.name || !values.email || !values.password) return;
    dispatch(registration(values));
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className="text text_type_main-medium">Регистрация</h1>

          {/* Поле ввода имени */}
          <Input
            type="text"
            onChange={handleChange}
            value={values.name!}
            placeholder="Имя"
            name="name"
            // Показываем ошибку, если форма была отправлена и поле не заполнено
            error={isFormSubmitted && !values.name}
            errorText="Это поле должно быть заполнено."
            autoComplete="user-name"
          />

          {/* Поле ввода электронной почты */}
          <EmailInput
            onChange={handleChange}
            value={values.email!}
            placeholder="E-mail"
            name="email"
            isIcon={false}
            autoComplete="user-email"
          />

          {/* Поле ввода пароля */}
          <PasswordInput
            onChange={handleChange}
            value={values.password!}
            name="password"
            autoComplete="user-password"
          />

          {/* Отображение ошибки запроса, если есть */}
          {!isRequesting && hasRequesFailed && (
            <p className="text text_type_main-default text_color_error">
              Ошибка регистрации. Пожалуйста, попробуйте еще раз позже.
            </p>
          )}

          {/* Кнопка для отправки формы */}
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>

        {/* Ссылка для перехода на страницу входа */}
        <div className={styles.actions}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?&nbsp;
            <Link to="/login" className={styles.actions__link}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
