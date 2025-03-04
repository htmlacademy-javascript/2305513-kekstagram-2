import { render } from './posts.js';
import { bigPictureHandler } from './big-posts.js';
import { updateModule } from './upload-form.js';
import { getData } from './api.js';
import { showErrorMessage } from './util.js';
import { initFilters } from './filters.js';

const startProgram = async () => {
  try {// получаю данные
    const postsList = await getData();
    initFilters(postsList);
    // Отрисовываю посты
    render(postsList);
    //открытие большого поста
    bigPictureHandler(postsList);
    updateModule();
  } catch (error) {
    showErrorMessage();
  }
};

startProgram();
