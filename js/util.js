import { MESSAGES } from './data.js';

const ERRORE_MESSAGES_REMOVE = 5000;

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

export { getRandomUniqueElements, getRandomArrayElement, isEscBtn, getRandomInteger, erroreMessages };
