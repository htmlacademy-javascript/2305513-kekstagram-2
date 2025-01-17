import { getPosts } from './data.js';
import { render } from './posts.js';
import { openBigPicture } from './bigPosts.js';

// получаю данные
const postsList = getPosts();

// Отрисовываю посты
render(postsList);

// Добавляю обработчик событий на контейнер с постами
const container = document.querySelector('.pictures');

container.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    openBigPicture(currentPicture.dataset.pictureId);
  }
});
