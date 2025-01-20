import { MESSAGES } from './data.js';
import { closeBigPictureHandler } from './big-posts.js';

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

const closeBigPictureOnEsc = (event) => {
  if (event.key === 'Escape') {
    closeBigPictureHandler();
  }
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

export { getRandomUniqueElements, getRandomArrayElement, closeBigPictureOnEsc, getRandomInteger };
