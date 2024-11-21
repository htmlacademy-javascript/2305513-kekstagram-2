const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Василий',
  'Елена',
  'Анатолий',
  'Анастасия',
  'Юлия',
  'Вероника',
  'Виктория',
];

const DESCRIPTION = [
  'Моя первая публикация',
  'Сегодня хороший день',
  'Доброе утро',
  'Хорошего дня',
];

//рандомное число

function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function createIdGenerator(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateId = createRandomIdFromRangeGenerator(1, 25);
const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generateLikes = createRandomIdFromRangeGenerator(15, 200);
const generateCommentatorId = createRandomIdFromRangeGenerator(1, 500);

// рандомное сообщение

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//создание рандомных коментариев

const createComment = () => ({
  id: generateCommentatorId(1, 500),
  message: getRandomArrayElement(MESSAGES),
  avatar: `img/avatar-${createIdGenerator(1, 6)}.svg`,
  name: getRandomArrayElement(NAMES),
});

const comment = Array.from({ length: 30 }, createComment);

//создание рандомных постов с комментариями

const createMessage = () => ({
  id: generateId(1, 25),
  url: `photos/${generatePhotoId(1, 25)}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: generateLikes(15, 200),
  comments: comment,
});

const similarMessage = Array.from({ length: 25 }, createMessage);

console.log(similarMessage);
