// // Строка короче 20 символов
// имяФункции('проверяемая строка', 20); // true
// // Длина строки ровно 18 символов
// имяФункции('проверяемая строка', 18); // true
// // Строка длиннее 10 символов
// имяФункции('проверяемая строка', 10); // false


// const checkString = (string = '', maxSymbols = 1) => string.length <= maxSymbols;

// checkString();

// // Строка является палиндромом
// имяФункции('топот'); // true
// // Несмотря на разный регистр, тоже палиндром
// имяФункции('ДовОд'); // true
// // Это не палиндром
// имяФункции('Кекс');  // false

/*  const isPaledrome = (string = '') => {
    string = string.replaceAll(' ', '').toLowerCase();

    let invertedLine = '';

    for (let i = string.length - 1; i >= 0; i--) {
      invertedLine += string[i];
    }

    return string === invertedLine;
    };

    isPaledrome();

*/

// решение через массив

// const isPaledrome = (string) => {
//   const newString = string.replaceAll(' ', '').toLowerCase();
//   const reversString = newString.split('').reverse().join('');

//   return newString === reversString;
// };

// isPaledrome();


// дополнительная задача.

// function isString(str) {
//   str = str.toString();
//   return Number(
//     [...str].filter((item) => !isNaN(parseInt(item, 10))).join('') || NaN
//   );
// }

// console.log(isString());


// --------------------------- задание module5-task2 ---------------------------


//   Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.

// Время указывается в виде строки в формате часы: минуты. Для указания часов и минут могут использоваться как две цифры, так и одна.Например, 8 часов 5 минут могут быть указаны по - разному: 08:05, 8: 5, 08: 5 или 8:05.

// Продолжительность задаётся числом.Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.
//
//   '8:00' - начало рабочего дня
//   '17:30' - конец рабочего дня
//   '14:00' - начало встречи
//   90 - продолжительность встречи в минутах

// const isMeetingWithinWorkday = (startOfWorkday, endOfWorkday, meetingStart, meetingDuration) => {

//   const timeToMinutes = (time) => {
//     const [hours, minutes] = time.split(':').map(Number);
//     return hours * 60 + minutes;
//   };

//   const startMinutes = timeToMinutes(startOfWorkday);
//   const endMinutes = timeToMinutes(endOfWorkday);
//   const meetingStartMinutes = timeToMinutes(meetingStart);
//   const meetingEndMinutes = meetingStartMinutes + meetingDuration;

//   if (startMinutes <= meetingStartMinutes && meetingEndMinutes <= endMinutes) {
//     return true;
//   } {
//     return false;
//   }
// };

// console.log(isMeetingWithinWorkday());
