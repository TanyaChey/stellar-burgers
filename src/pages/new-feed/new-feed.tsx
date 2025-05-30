import React from 'react';
import { Navigate } from 'react-router-dom';

// Подключение компонентов
import RenderContent from '../../components/render-content/render-content';

// Подключение Redux
import { useSelector } from '../../services/hooks';

// Подключение стилей
import { ERRORS } from '../../utils/constants';
import shallowEqual from '../../utils/shallowEqual';

// Основной компонент приложения
export default function NewFeedPage() {
  const state = { background: '/' };

  // Извлечение данных из состояния Redux
  const { isRequesting, hasRequestFailed, order } = useSelector((state) => state.burgerData, shallowEqual);

  return (
    <RenderContent isLoading={isRequesting} hasError={hasRequestFailed} error={ERRORS.placeOrder}>
      <Navigate to={`/feed/${order}/status`} state={state} replace={true} />
    </RenderContent>
  );
}
