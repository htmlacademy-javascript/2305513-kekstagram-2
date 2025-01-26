import { isEscBtn } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
const containerPicture = document.querySelector('.pictures');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const commentsPerPage = 5;
let currentCommentIndex = 0;

// Отрисовка комментариев
const renderComments = (comments, startIndex = 0) => {
  const commentsToShow = comments.slice(startIndex, startIndex + commentsPerPage);
  const fragment = document.createDocumentFragment();

  commentsToShow.forEach((comment, index) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    if (index > 5) {
      commentElement.classList.add('hidden');
    };

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

const displayChangeableNumber = (comments) => {
  const remainingComments = comments.length - currentCommentIndex;
  commentsLoader.classList.toggle('hidden', remainingComments <= commentsPerPage);
};

const handleCommentsLoaderClick = (currentPicture) => {
  currentCommentIndex += commentsPerPage;
  renderComments(currentPicture.comments, currentCommentIndex);
  bigPicture.querySelector('.social__comment-shown-count').textContent = commentsPerPage;
  displayChangeableNumber(currentPicture.comments);
};

const openBigPicture = (currentPicture) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = currentPicture.url;
  bigPicture.querySelector('.likes-count').textContent = currentPicture.likes;

  commentsContainer.innerHTML = '';
  currentCommentIndex = 0;
  renderComments(currentPicture.comments, currentCommentIndex);

  bigPicture.querySelector('.social__comment-shown-count').textContent = commentsPerPage;
  bigPicture.querySelector('.social__comment-total-count').textContent = currentPicture.comments.length;

  bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  commentsLoader.addEventListener('click', handleCommentsLoaderClick);

  bigPicture.querySelector('.social__caption').textContent = currentPicture.description;
  document.body.classList.add('modal-open');
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
  document.addEventListener('keydown', isEscBtn);

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
