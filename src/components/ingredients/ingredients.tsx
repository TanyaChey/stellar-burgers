import React, { useMemo, useCallback, FC } from 'react';

// Подключение компонентов
import IngredientsRow from '../ingredients-row/ingredients-row';

// Подключение Redux
import { useSelector, useDispatch } from '../../services/hooks';
import { setActiveTab } from '../../services/actions/tabs';

// Подключение стилей и данных
import styles from './ingredients.module.css';
import { TAB_OFFSET, ROW_HEIGHT_THRESHOLD } from '../../utils/constants';
import shallowEqual from '../../utils/shallowEqual';

interface IIngredientsProps {
  rowsRefObj: { [key: string]: React.RefObject<HTMLLIElement> };
}

// Компонент отображения ингредиентов
const Ingredients: FC<IIngredientsProps> = ({ rowsRefObj }) => {
  // Получение диспетчера Redux
  const dispatch = useDispatch();

  // Получение состояний из Redux
  const { tabs: tabsData, activeTab } = useSelector((state) => state.tabsData, shallowEqual);

  // Функция для расчета расстояния от верха контейнера до ближайшей вкладки
  const calculateDistanceFromTop = useCallback(
    (containerElement) => {
      const containerRect = containerElement.getBoundingClientRect();
      const tabRefs = tabsData.map(([tabKey, tabName]) => rowsRefObj[tabKey].current);

      // Определение последнего элемента вкладки
      const lastTabRef = tabRefs[tabRefs.length - 1];
      const lastTabRect = lastTabRef?.getBoundingClientRect();

      if (lastTabRef !== null && lastTabRect && lastTabRect.y + lastTabRect.height <= containerRect.y + containerRect.height + TAB_OFFSET) {
        return lastTabRef.id;
      }

      // Поиск новой активной вкладки на основе расстояния
      const newActiveTabRef = tabRefs.find((tabRef) => {
        const tabRect = tabRef?.getBoundingClientRect();
        return tabRect
          ? tabRect.bottom >= containerRect.top - ROW_HEIGHT_THRESHOLD &&
              tabRect.top <= containerRect.bottom + ROW_HEIGHT_THRESHOLD
          : false;
      });

      return newActiveTabRef ? newActiveTabRef.id : null;
    },
    [rowsRefObj, tabsData],
  );

  // Обработчик события скролла
  const scrollHandler = useCallback(
    (event) => {
      // Вызываем функцию для расчета активной вкладки
      const newActiveTab = calculateDistanceFromTop(event.currentTarget);

      // Обновление активной вкладки в Redux
      if (newActiveTab && newActiveTab !== activeTab) {
        dispatch(setActiveTab(newActiveTab));
      }
    },
    [calculateDistanceFromTop, dispatch, activeTab],
  );

  // Создание компонентов строк с ингредиентами
  const ingredientRows = useMemo(
    () => tabsData.map(([tabKey, tabName]: string[]) => <IngredientsRow key={tabKey} data={{ tabKey, tabName }} rowRef={rowsRefObj[tabKey]} />),
    [tabsData],
  );

  // Класс контейнера для стилей
  const containerClassName = `${styles.container} custom-scroll mt-10 pr-2`;

  return (
    // Контейнер для списка ингредиентов с обработчиком события скролла
    <ul onScroll={scrollHandler} className={containerClassName}>
      {ingredientRows}
    </ul>
  );
};

export default Ingredients;
