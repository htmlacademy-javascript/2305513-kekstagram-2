import { isEscBtn } from './util.js';

const COMMENTS_TO_SHOW = 5;

const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const closeBigPictureBtn = bigPicture.querySelector('.big-picture__cancel');
const picturesContainer = document.querySelector('.pictures');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');

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

    if (index >= COMMENTS_TO_SHOW) {
      commentElement.classList.add('hidden');
    }

    commentElement.append(pictureNode, textNode);
    fragment.appendChild(commentElement);
  });

  commentsContainer.appendChild(fragment);
  commentsLoader.classList.toggle('hidden', comments.length <= COMMENTS_TO_SHOW);
  commentShownCount.textContent = Math.min(comments.length, COMMENTS_TO_SHOW);
  commentTotalCount.textContent = comments.length;
};

const onClickShowMoreComments = () => {
  const hiddenComments = commentsContainer.querySelectorAll('.hidden');
  const commentsToShow = Array.from(hiddenComments).slice(0, COMMENTS_TO_SHOW);
  commentsToShow.forEach((comment) => {
    comment.classList.remove('hidden');
  });

  commentsLoader.classList.toggle('hidden', hiddenComments.length <= COMMENTS_TO_SHOW);
  const visibleCommentsCount = commentsContainer.querySelectorAll('.social__comment:not(.hidden)').length;
  commentShownCount.textContent = visibleCommentsCount;
};

const openBigPicture = (currentPicture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = currentPicture.url;
  bigPicture.querySelector('.likes-count').textContent = currentPicture.likes;

  renderComments(currentPicture.comments);
};

const onClickBigPictureСlose = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onClickOnEscBigPictureСlose = (event) => {
  if (isEscBtn(event)) {
    onClickBigPictureСlose();
  }
};

const handlePictureClick = (evt, generatedPosts) => {
  const closestPictureElement = evt.target.closest('.picture');

  if (closestPictureElement) {
    const pictureId = Number(closestPictureElement.dataset.pictureId);
    const currentPicture = generatedPosts.find((photo) => photo.id === pictureId);
    openBigPicture(currentPicture);
  }
};

const bigPictureHandler = (generatedPosts) => {
  picturesContainer.addEventListener('click', (evt) => handlePictureClick(evt, generatedPosts));
  closeBigPictureBtn.addEventListener('click', onClickBigPictureСlose);
  document.addEventListener('keydown', onClickOnEscBigPictureСlose);
  commentsLoader.addEventListener('click', onClickShowMoreComments);
};

export { bigPictureHandler };
