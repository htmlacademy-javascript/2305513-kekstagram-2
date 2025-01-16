import { getPosts } from './data.js';
import { render } from './posts.js';
import { openBigPicture } from './bigPosts.js';

// получаю данные
const postsList = getPosts();

// Отрисовываю посты
const postsContainer = render(postsList);

// Добавляю обработчик событий на контейнер с постами
postsContainer.addListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    openBigPicture(currentPicture.dataset.pictureId);
  }
});
