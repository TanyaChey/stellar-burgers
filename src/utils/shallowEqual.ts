export default function shallowEqual(prev: any, next: any): boolean {
  // Простое сравнение для примитивных типов
  if (prev === next) {
    return true;
  }

  // Сравнение массивов
  if (Array.isArray(prev) && Array.isArray(next)) {
    if (prev.length !== next.length) {
      return false;
    }

    for (let i = 0; i < prev.length; i++) {
      if (prev[i] !== next[i]) {
        return false;
      }
    }

    return true;
  }

  // Сравнение объектов
  if (typeof prev === 'object' && typeof next === 'object') {
    const prevKeys = Object.keys(prev);
    const nextKeys = Object.keys(next);

    if (prevKeys.length !== nextKeys.length) {
      return false;
    }

    for (const key of prevKeys) {
      if (prev[key] !== next[key]) {
        return false;
      }
    }

    return true;
  }

  // Все остальные случаи считаем значениями разными
  return false;
}