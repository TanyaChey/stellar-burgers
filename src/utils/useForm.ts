import { useState, ChangeEvent } from 'react';

interface FormValues {
  email?: string;
  name?: string;
  password?: string;
  code?: string;
}

interface FormState {
  values: FormValues;
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  setValues: (values: FormValues) => void;
}

// Создаем кастомный хук для управления формой
export default function useForm(inputValues: FormValues): FormState {
  // Инициализация состояния с начальными значениями формы
  const [values, setValues] = useState<FormValues>(inputValues);

  // Обработчик изменения значений полей формы
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // Извлекаем имя и значение из события изменения
    const { name, value } = evt.target;
    // Обновляем состояние, сохраняя предыдущие значения и добавляя новое значение
    setValues({ ...values, [name]: value });
  };

  // Возвращаем объект с текущими значениями формы, обработчиком изменения и функцией установки значений
  return { values, handleChange, setValues };
}
