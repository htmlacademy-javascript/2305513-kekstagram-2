import { getPosts } from './data.js';
import { render } from './posts.js';
import { bigPictureHandler } from './bigPosts.js';

// получаю данные
const postsList = getPosts();

// Отрисовываю посты
render(postsList);

//открытие большого поста
bigPictureHandler(postsList);
