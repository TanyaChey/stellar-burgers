import React, { useEffect, FC } from 'react';
import ReactDOM from 'react-dom';

// Подключение компонентов
import ModalHeader from '../modal-header/modal-header';
import ModalOverlay from '../modal-overlay/modal-overlay';

// Подключение стилей и данных
import styles from './modal.module.css';

interface IModalProps {
  title?: string;
  onClose: () => void;
}

const modalRoot = document.getElementById('portal-root');

// Компонент модального окна
const Modal: FC<IModalProps> = ({ children, title, onClose }) => {
  // Обработка события нажатия на клавишу "Escape" для закрытия модального окна
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal} p-10`}>
        <ModalHeader close={onClose} title={title} />
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot,
  );
};

export default Modal;
