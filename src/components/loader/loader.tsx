import React, { FC } from 'react';

// Подключение стилей
import styles from './loader.module.css';

const Loader: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
