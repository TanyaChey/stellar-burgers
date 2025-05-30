import React, { FormEvent, useState, FC } from 'react';

// Подключение компонентов
import { EmailInput, Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение Redux
import { useDispatch, useSelector } from '../../services/hooks';
import { sendUserData } from '../../services/thunk/user';

// Подключение стилей и данных
import styles from './profile-form.module.css';
import useForm from '../../utils/useForm';
import shallowEqual from '../../utils/shallowEqual';

const ProfileForm: FC = () => {
  // Получение диспетчера Redux и состояния пользователя
  const dispatch = useDispatch();
  const {
    isRequestingSendUserData: isReques,
    hasRequestSendUserDataFailed: hasRequesFailed,
    information: userInfo,
  } = useSelector((state) => state.userData, shallowEqual);

  // Использование хука для управления значениями формы
  const { values, handleChange, setValues } = useForm({
    name: userInfo ? userInfo.name : '',
    email: userInfo ? userInfo.email : '',
    password: '',
  });
  // Состояние для отслеживания отправки формы
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Проверка, были ли изменения в форме
  const isFormChanged =
    userInfo && (userInfo.name !== values.name || userInfo.email !== values.email || values.password);
  // Проверка валидности формы
  const isFormValid = values.name && values.email && values.password;

  // Обработчик отправки формы
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormSubmitted(true);
    // Проверка валидности формы и наличия изменений
    if (!isFormValid || !isFormChanged) return;
    // Отправка данных
    dispatch(sendUserData(values));
  };

  // Обработчик отмены редактирования
  const onCancelEditing = () => {
    // Восстановление значений формы
    setValues({ name: userInfo ? userInfo.name : '', email: userInfo ? userInfo.email : '', password: '' });
    setIsFormSubmitted(false);
  };

  if (isFormSubmitted && isFormChanged && isFormValid && !isReques && !hasRequesFailed) onCancelEditing();

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Поле ввода имени */}
      <Input
        onChange={handleChange}
        value={values.name!}
        placeholder="Имя"
        name="name"
        autoComplete="user-name"
        error={isFormSubmitted && !values.name}
        errorText="Это поле должно быть заполнено."
      />

      {/* Поле ввода электронной почты */}
      <EmailInput
        onChange={handleChange}
        value={values.email!}
        placeholder="E-mail"
        name="email"
        isIcon={true}
        autoComplete="user-email"
      />

      {/* Поле ввода пароля */}
      <PasswordInput onChange={handleChange} value={values.password!} name="password" autoComplete="user-password" />

      {/* Отображение сообщения об ошибке */}
      {isFormChanged && (
        <>
          {!isReques && hasRequesFailed && (
            <p className="text text_type_main-default text_color_error">
              Ошибка восстановления пароля. Пожалуйста, попробуйте еще раз позже.
            </p>
          )}
          {/* Контейнер кнопок */}
          <div className={styles.buttons_container}>
            {/* Кнопка отмены редактирования */}
            <Button onClick={onCancelEditing} htmlType="reset" type="secondary" size="medium">
              Отмена
            </Button>
            {/* Кнопка сохранения изменений */}
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default ProfileForm;
