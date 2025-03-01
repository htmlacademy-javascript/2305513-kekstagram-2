import { MESSAGES } from './data.js';

const ERRORE_MESSAGES_REMOVE = 5000;
const TIMEOUT_DELAY = 500

//рандомное число

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// рандомный элемент из массива

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// ------------------------------ дополнительное задание через while ------------------------------

const getRandomUniqueElements = () => {
  // случайное количество от 1 до длины массива
  const count = Math.floor(Math.random() * (MESSAGES.length)) + 1;
  const selected = [];

  while (selected.length < count) {
    const randomIndex = Math.floor(Math.random() * MESSAGES.length);
    const randomElement = MESSAGES[randomIndex];

    if (!selected.includes(randomElement)) {
      selected.push(randomElement);
    }
  }
  return selected;
};

const isEscBtn = (event) => event.key === 'Escape';


const erroreMessages = () => {
  const template = document.getElementById('data-error');
  const errorMessage = template.content.querySelector('.data-error').cloneNode(true);

  document.body.appendChild(errorMessage);
  errorMessage.style.display = 'block';

  setTimeout(() => {
    errorMessage.remove();
  }, ERRORE_MESSAGES_REMOVE);
};

const debounce = (callback, TIMEOUT_DELAY) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), TIMEOUT_DELAY);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

const throttle = (callback, delayBetweenFrames) => {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

// ------------------------------ дополнительное задание через рекурсию ------------------------------

// const getRandomUniqueElements = () => {
//   if (MESSAGES.length === 0) {
//     return [];
//   }
//   const randomCount = Math.floor(Math.random() * MESSAGES.length) + 1;
//   const uniqueElements = new Set();
//   const selectRandomElements = () => {
//     if (uniqueElements.size === randomCount) {
//       return;
//     }
//     const randomIndex = Math.floor(Math.random() * MESSAGES.length);
//     uniqueElements.add(MESSAGES[randomIndex]);
//     selectRandomElements();
//   };
//   selectRandomElements();
//   return Array.from(uniqueElements);
// };

export { getRandomUniqueElements, getRandomArrayElement, isEscBtn, getRandomInteger, erroreMessages, debounce, throttle };
