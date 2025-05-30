// Экспорт функции по умолчанию
export default function isEmpty(value: any): boolean {
  // Проверка типа значения
  if (Array.isArray(value)) {
    // Если тип значения - массив
    return value.length === 0; // Вернуть true, если массив пуст, иначе false
  } else if (typeof value === 'object' && value !== null) {
    // Если тип значения - объект
    return Object.keys(value).length === 0; // Вернуть true, если объект пуст, иначе false
  } else {
    // Для остальных типов значений
    return !value; // Вернуть true, если значение ложно (пусто), иначе false
  }
}
