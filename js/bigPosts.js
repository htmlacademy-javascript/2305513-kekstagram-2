
import { getPosts } from './data.js';

const bigPicture = document.querySelector('.big-picture');
// const commentsContainer = bigPicture.querySelector('.social__comments');
const closeBigPicture = document.querySelector('.big-picture__cancel');

closeBigPicture.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

const openBigPicture = (pictureId) => {
  const currentPicture = getPosts.find((photo) => photo.id === Number(pictureId));

  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img img').src = currentPicture.url;
  bigPicture.querySelector('.likes-count').textContent = currentPicture.likes;
  bigPicture.querySelector('.social__comment-shown-count').textContent = currentPicture.comments.length;
  bigPicture.querySelector('.social__comment-total-count').textContent = currentPicture.comments.length;

  // Описание фотографии
  bigPicture.querySelector('.social__caption').textContent = currentPicture.description;

  // Скрывает счетчики комментариев и загрузки
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  // Добавляет класс modal-open к body
  document.body.classList.add('modal-open');

  document.querySelector('.big-picture__cancel').addEventListener('click', closeBigPicture);
};

export { openBigPicture };

