import { getRandomUniqueElements, getRandomArrayElement, getRandomInteger } from './util.js';

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

const minIdAvatar = 1;
const maxIdAvatar = 6;
const minIdLikes = 15;
const maxIdLikes = 200;
const minComments = 0;
const maxComments = 30;

//создание рандомных коментариев

const createComment = (_, index) => ({
  id: index + 1,
  message: getRandomUniqueElements(),
  avatar: `img/avatar-${getRandomInteger(minIdAvatar, maxIdAvatar)}.svg`,
  name: getRandomArrayElement(NAMES),
});

//создание рандомных постов с комментариями

const createMessage = (_, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(minIdLikes, maxIdLikes),
  comments: Array.from({ length: getRandomInteger(minComments, maxComments) }, createComment),
});

const getPosts = () => Array.from({ length: 25 }, createMessage);

export { MESSAGES, getPosts };

