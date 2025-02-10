import { getPosts } from './data.js';
import { render } from './posts.js';
import { bigPictureHandler } from './big-posts.js';
import { updateModule } from './upload-form.js';

// получаю данные
const postsList = getPosts();

// Отрисовываю посты
render(postsList);

//открытие большого поста
bigPictureHandler(postsList);

updateModule();
