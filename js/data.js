import { generateId, generatePhotoId, generateLikes, generateCommentatorId, createIdGenerator, getRandomInteger } from './util.js';

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

// рандомное сообщение

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//создание рандомных коментариев

const createComment = () => ({
  id: generateCommentatorId(1, 500),
  message: getRandomArrayElement(MESSAGES),
  avatar: `img/avatar-${createIdGenerator(1, 6)}.svg`,
  name: getRandomArrayElement(NAMES),
});

//создание рандомных постов с комментариями

const createMessage = () => ({
  id: generateId(1, 25),
  url: `photos/${generatePhotoId(1, 25)}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: generateLikes(15, 200),
  comments: Array.from({ length: createIdGenerator(0, 30) }, createComment),
});

const similarMessage = Array.from({ length: 25 }, createMessage);

export {similarMessage};
