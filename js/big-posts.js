import { isEscBtn } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
const picturesContainer = document.querySelector('.pictures');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsCountLabel = bigPicture.querySelector('.social__comment-count');

let currentComments = [];
const COMMENTS_TO_SHOW = 5;

const renderComments = (comments) => {
  commentsContainer.innerHTML = '';
  const fragment = document.createDocumentFragment();

  comments.forEach((comment, index) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const pictureNode = document.createElement('img');
    pictureNode.classList.add('social__picture');
    pictureNode.src = comment.avatar;
    pictureNode.alt = comment.name;

    const textNode = document.createElement('p');
    textNode.classList.add('social__text');
    textNode.textContent = comment.message;

    commentElement.append(pictureNode, textNode);
    commentElement.classList.toggle('hidden', index >= COMMENTS_TO_SHOW);
    fragment.appendChild(commentElement);
  });

  commentsContainer.appendChild(fragment);
  commentsLoader.classList.toggle('hidden', comments.length <= COMMENTS_TO_SHOW);
  commentsCountLabel.textContent = `Показано ${Math.min(comments.length, COMMENTS_TO_SHOW)} из ${comments.length} комментариев`;
};

const showMoreComments = () => {
  const hiddenComments = commentsContainer.querySelectorAll('.hidden');
  hiddenComments.forEach((comment, index) => {
    if (index < COMMENTS_TO_SHOW) {
      comment.classList.remove('hidden');
    }
  });
  commentsLoader.classList.toggle('hidden', hiddenComments.length <= COMMENTS_TO_SHOW);
  commentsCountLabel.textContent = `Показано ${commentsContainer.querySelectorAll('.social__comment:not(.hidden)').length} из ${currentComments.length} комментариев`;
};

const toggleBigPicture = (currentPicture) => {
  if (currentPicture) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = currentPicture.url;
    bigPicture.querySelector('.likes-count').textContent = currentPicture.likes;

    currentComments = currentPicture.comments;
    renderComments(currentComments);
    commentsLoader.addEventListener('click', showMoreComments);
    document.body.classList.add('modal-open');
  } else {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsLoader.removeEventListener('click', showMoreComments);
  }
};

const closeBigPictureOnEsc = (event) => {
  if (isEscBtn(event)) {
    toggleBigPicture(null);
  }
};

const initBigPictureEvents = () => {
  closeBigPicture.addEventListener('click', () => toggleBigPicture(null));
  document.addEventListener('keydown', closeBigPictureOnEsc);
};

const bigPictureHandler = (generatedPosts) => {
  initBigPictureEvents();
  picturesContainer.addEventListener('click', (evt) => {
    const currentPictures = evt.target.closest('.picture');

    if (currentPictures) {
      const pictureId = Number(currentPictures.dataset.pictureId);
      const currentPicture = generatedPosts.find((photo) => photo.id === pictureId);
      toggleBigPicture(currentPicture);
    }
  });
};

export { bigPictureHandler };
