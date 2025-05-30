import React, { useState, useEffect, FC, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';

// Подключение компонентов
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение Redux
import { useDispatch, useSelector } from '../../services/hooks';
import { startResetPassword } from '../../services/actions/user';
import { resetPassword } from '../../services/thunk/user';

// Подключение стилей
import styles from './reset-password.module.css';
import useForm from '../../utils/useForm';

const ResetPasswordPage: FC = () => {
  // Получение диспетчера Redux
  const dispatch = useDispatch();
  // Получение данных из Redux-стейта
  const {
    isRequestingResetPassword: isRequesting,
    hasRequestResetPasswordFailed: hasRequesFailed,
    isPasswordForgot,
  } = useSelector((state) => state.userData);

  // Использование хука для управления значениями формы
  const { values, handleChange } = useForm({ password: '', code: '' });
  // Состояние для отслеживания отправки формы
  const [isFormSubmitted, setisFormSubmitted] = useState(false);

  useEffect(() => {
    dispatch(startResetPassword());
  }, [dispatch]);

  // Обработчик отправки формы
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setisFormSubmitted(true);
    if (!values.password || !values.code) return;
    dispatch(resetPassword(values));
  };

  if (!isPasswordForgot) return <Navigate to="/forgot-password" />;

  if (!isRequesting && !hasRequesFailed && isFormSubmitted) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        {/* Поле для ввода нового пароля */}
        <PasswordInput
          onChange={handleChange}
          value={values.password!}
          name="password"
          autoComplete="user-password"
        />
        {/* Поле для ввода кода из письма */}
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
          value={values.code!}
          name={'code'}
          // Проверка наличия значения и отображение ошибки при необходимости
          error={isFormSubmitted && !values.code}
          errorText="Это поле должно быть заполнено."
          autoComplete="user-code"
        />
        {/* Отображение ошибки запроса смены пароля */}
        {!isRequesting && hasRequesFailed && (
          <p className="text text_type_main-default text_color_error">
            Ошибка смены пароля. Пожалуйста, попробуйте еще раз позже.
          </p>
        )}
        {/* Кнопка для отправки формы */}
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      {/* Ссылка для возврата на страницу входа */}
      <div className={styles.actions}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?&nbsp;
          <Link to="/login" className={styles.actions__link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
