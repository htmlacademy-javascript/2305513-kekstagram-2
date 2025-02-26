// import { getPosts } from './data.js';
import { render } from './posts.js';
import { bigPictureHandler } from './big-posts.js';
import { updateModule } from './upload-form.js';
import { getData } from './api.js';
import { erroreMessages } from './util.js';

const startProgram = async () => {
  try {// получаю данные
    const postsList = await getData();
    // Отрисовываю посты
    render(postsList);
    //открытие большого поста
    bigPictureHandler(postsList);
    updateModule();
  } catch (error) {
    erroreMessages();
  }
};

startProgram();
