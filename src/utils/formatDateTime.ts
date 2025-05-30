export default function formatDateTime(inputDate: Date | string): string {
  const currentDate = new Date();
  const date = inputDate instanceof Date ? inputDate : new Date(inputDate);

  // Устанавливаем таймзону на GMT+3
  date.setHours(date.getHours() + 3);

  // Функция для форматирования времени
  const formatTime = (time: Date) =>
    time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false });

  const daysDifference = getDaysDifference(date, currentDate);

  switch (daysDifference) {
    case 0:
      return `Сегодня, ${formatTime(date)} i-GMT+3`;
    case 1:
      return `Вчера, ${formatTime(date)} i-GMT+3`;
    default:
      return `${daysDifference} дн. назад, ${formatTime(date)} i-GMT+3`;
  }
}

function getDaysDifference(date1: Date | string, date2: Date | string): number {
  // Один день в миллисекундах (24 часа * 60 минут * 60 секунд * 1000 миллисекунд)
  const oneDay = 24 * 60 * 60 * 1000;

  // Преобразовываем даты в объекты Date, если они еще не являются таковыми
  const firstDate = date1 instanceof Date ? date1 : new Date(date1);
  const secondDate = date2 instanceof Date ? date2 : new Date(date2);

  // Вычисляем разницу в миллисекундах
  const timeDifference = Math.abs(firstDate.getTime() - secondDate.getTime());

  // Вычисляем разницу в днях и возвращаем результат
  return Math.round(timeDifference / oneDay);
}
