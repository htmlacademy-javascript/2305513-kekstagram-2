import { isEscBtn } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
const containerPicture = document.querySelector('.pictures');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const commentsPerPage = 5;
let currentCommentIndex = 0;

// Отрисовка комментариев
const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment, index) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    if (index < commentsPerPage) {
      commentElement.classList.remove('hidden');
    } else {
      commentElement.classList.add('hidden');
    }

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
  commentsLoader.classList.toggle('hidden', comments.length <= commentsPerPage);
};

const displayChangeableNumber = (comments) => {
  const totalComments = comments.length;
  const shownComments = currentCommentIndex + Math.min(commentsPerPage, totalComments - currentCommentIndex);
  const remainingComments = totalComments - shownComments;

  bigPicture.querySelector('.social__comment-shown-count').textContent = shownComments;
  bigPicture.querySelector('.social__comment-total-count').textContent = totalComments;
  commentsLoader.classList.toggle('hidden', remainingComments <= 0);
};

const handleCommentsLoaderClick = (currentPicture) => {
  const allHiddenComments = commentsContainer.querySelectorAll('.social__comment.hidden');
  const commentsToLoad = Array.from(allHiddenComments).slice(0, commentsPerPage);

  if (commentsToLoad.length === 0) {
    commentsLoader.classList.add('hidden');
    return;
  }

  commentsToLoad.forEach((commentElement) => {
    commentElement.classList.remove('hidden');
  });

  currentCommentIndex += commentsToLoad.length;
  displayChangeableNumber(currentPicture.comments);

  if (currentCommentIndex >= currentPicture.comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const openBigPicture = (currentPicture) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = currentPicture.url;
  bigPicture.querySelector('.likes-count').textContent = currentPicture.likes;
  commentsContainer.innerHTML = '';
  currentCommentIndex = 0;
  renderComments(currentPicture.comments);
  bigPicture.querySelector('.social__caption').textContent = currentPicture.description;
  document.body.classList.add('modal-open');
  displayChangeableNumber(currentPicture.comments);

  if (currentPicture.comments.length <= commentsPerPage) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');

    const handleLoaderClick = () => handleCommentsLoaderClick(currentPicture);
    commentsLoader.removeEventListener('click', handleLoaderClick);
    commentsLoader.addEventListener('click', handleLoaderClick);
  }
};

const onCloseBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsContainer.innerHTML = '';
  commentsLoader.removeEventListener('click', handleCommentsLoaderClick);
  document.removeEventListener('keydown', isEscBtn);
};

const bigPictureHandler = (generatedPosts) => {
  closeBigPicture.addEventListener('click', onCloseBigPicture);
  document.addEventListener('keydown', (evt) => {
    if (isEscBtn(evt)) {
      onCloseBigPicture();
    }
  });

  containerPicture.addEventListener('click', (evt) => {
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
