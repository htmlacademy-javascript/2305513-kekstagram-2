import { isEscBtn } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
const picturesСontainer = document.querySelector('.pictures');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsCountLabel = bigPicture.querySelector('.social__comment-count');

let currentComments = [];
const COMMENTS_TO_SHOW = 5;

// Отрисовываю комменты
const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const pictureNode = document.createElement('img');
    pictureNode.classList.add('social__picture');
    pictureNode.src = comment.avatar;
    pictureNode.alt = comment.name;

    const textNode = document.createElement('p');
    textNode.classList.add('social__text');
    textNode.textContent = comment.message;

    commentElement.appendChild(pictureNode);
    commentElement.appendChild(textNode);
    fragment.appendChild(commentElement);
  });

  commentsContainer.appendChild(fragment);
};

// Показываю скрытые комменты
const showMoreComments = () => {
  const hiddenComments = commentsContainer.querySelectorAll('.hidden');

  for (let i = 0; i < Math.min(COMMENTS_TO_SHOW, hiddenComments.length); i++) {
    hiddenComments[i].classList.remove('hidden');
  }

  if (hiddenComments.length <= COMMENTS_TO_SHOW) {
    commentsLoader.classList.add('hidden');
  }

  // Обновляю количество комментов
  const visibleComments = commentsContainer.querySelectorAll('.social__comment:not(.hidden)');
  commentsCountLabel.textContent = ` Показано ${visibleComments.length} из ${currentComments.length} комментариев`;
};

// Открываю большую пикчу и загружаю комменты
const openBigPicture = (currentPicture) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = currentPicture.url;
  bigPicture.querySelector('.likes-count').textContent = currentPicture.likes;

  // Очищаю контейнер и подготавливаю комменты
  commentsContainer.innerHTML = '';
  currentComments = currentPicture.comments;

  // Отрисовываю все комменты
  renderComments(currentComments);

  // Скрываю лишние комменты
  const allComments = commentsContainer.querySelectorAll('.social__comment');
  if (allComments.length > COMMENTS_TO_SHOW) {
    for (let i = COMMENTS_TO_SHOW; i < allComments.length; i++) {
      allComments[i].classList.add('hidden');
    }
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }

  commentsLoader.addEventListener('click', showMoreComments);

  // Показываю колличество показанных комментов
  commentsCountLabel.textContent = ` Показано ${Math.min(currentComments.length, COMMENTS_TO_SHOW)} из ${currentComments.length} комментариев `;
  document.body.classList.add('modal-open');
};

// Закрываю пост
const closeBigPictureHandler = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// Проверка на Esc
const closeBigPictureOnEsc = (event) => {
  if (isEscBtn(event)) {
    closeBigPictureHandler();
  }
};

// Удаление обработчиков
const initBigPictureEvents = () => {
  closeBigPicture.addEventListener('click', closeBigPictureHandler);
  document.addEventListener('keydown', closeBigPictureOnEsc);
};

// Вся логика
const bigPictureHandler = (generatedPosts) => {
  initBigPictureEvents();

  picturesСontainer.addEventListener('click', (evt) => {
    const currentPictures = evt.target.closest('.picture');

    if (currentPictures) {
      const pictureId = Number(currentPictures.dataset.pictureId);
      const currentPicture = generatedPosts.find((photo) => photo.id === pictureId);
      if (currentPicture) {
        openBigPicture(currentPicture);
      }
    }
  });
};

export { bigPictureHandler };
