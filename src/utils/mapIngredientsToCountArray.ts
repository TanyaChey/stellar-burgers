// Импортируем функцию isEmpty из файла './isEmpty'
import isEmpty from './isEmpty';

interface IIngredientCount {
  ingredient: string;
  count: number;
}

// Экспортируем функцию mapIngredientsToCountArray, которая принимает массив ингредиентов
export default function mapIngredientsToCountArray(ingredients: string[]): IIngredientCount[] {
  // Проверяем, является ли массив пустым с помощью функции isEmpty
  if (isEmpty(ingredients)) {
    // Если массив пуст, возвращаем пустой массив
    return [];
  }

  // Создаем новый объект Map для отслеживания количества каждого ингредиента
  const ingredientCountMap = new Map<string, number>();

  // Итерируем по массиву ингредиентов
  ingredients.forEach((ingredient) => {
    // Получаем текущее количество данного ингредиента из Map, или 0, если его еще нет
    const currentCount = ingredientCountMap.get(ingredient) || 0;
    // Увеличиваем количество данного ингредиента на 1 и сохраняем в Map
    ingredientCountMap.set(ingredient, currentCount + 1);
  });

  // Преобразуем Map в массив объектов с полями ingredient и count
  return Array.from(ingredientCountMap, ([ingredient, count]) => ({ ingredient, count }));
}
