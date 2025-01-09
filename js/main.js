import { getPosts } from './data.js';
import { render } from './posts.js';

// получаю данные
const postsList = getPosts();

//отрисовываю посты
render(postsList);
