import React, { useEffect, useCallback, FC } from 'react';
import { HashRouter as Router } from 'react-router-dom';

// Подключение компонентов
import Header from '../header/header';
import Routes from '../router/router';
import RenderContent from '../render-content/render-content';

// Подключение Redux
import { useDispatch, useSelector } from '../../services/hooks';
import { getIngredients } from '../../services/thunk/ingredients';
import { getUserData } from '../../services/thunk/user';

// Подключение стилей и данных
import styles from './app.module.css';
import { ERRORS } from '../../utils/constants';

// Основной компонент приложения
const App: FC = () => {
  // Получение диспетчера Redux
  const dispatch = useDispatch();

  // Извлечение данных из состояния Redux
  const { isRequestingGetUserData } = useSelector((state) => state.userData);
  const { isRequesting: isRequestingGetIngredients, hasRequestFailed: hasRequestGetIngredientsFailed } = useSelector(
    (state) => state.ingredientsData,
  );

  // Функция для получения данных пользователя и ингредиентов
  const fetchData = useCallback(() => {
    dispatch(getUserData()); // Запрос данных пользователя
    dispatch(getIngredients()); // Запрос списка ингредиентов
  }, [dispatch]);

  // Загрузка данных пользователя и ингредиентов при монтировании компонента
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Стили для контейнера
  const mainContainerStyles = `${styles.container} pr-5 pl-5`;

  // Возвращение разметки компонента
  return (
    <div className={styles.app}>
      <RenderContent
        isLoading={isRequestingGetUserData && isRequestingGetIngredients}
        hasError={hasRequestGetIngredientsFailed}
        error={ERRORS.ingredients}
      >
        <Router>
          <Header />
          <main className={styles.main}>
            <div className={mainContainerStyles}>
              <Routes />
            </div>
          </main>
        </Router>
      </RenderContent>
    </div>
  );
};

export default App;
