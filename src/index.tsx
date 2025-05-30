// React и ReactDOM - основные библиотеки для разработки интерфейса
import React from 'react';
import ReactDOM from 'react-dom';

// Компонент App - основной компонент приложения
import App from './components/app/app';

import { Provider } from 'react-redux';

import { store } from './services/store';

// Функция для измерения производительности приложения
import reportWebVitals from './reportWebVitals';

// Подключение стилей
import './index.css';

// Рендеринг основного компонента с поддержкой DnD и Redux
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
