const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
const container = document.querySelector('.pictures');

const bigPictureHandler = (generatedPosts) => {
  const openBigPicture = (pictureId) => {
    const currentPicture = generatedPosts.find((photo) => photo.id === Number(pictureId));

    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img img').src = currentPicture.url;
    bigPicture.querySelector('.likes-count').textContent = currentPicture.likes;
    bigPicture.querySelector('.social__comment-shown-count').textContent = currentPicture.comments.length;
    bigPicture.querySelector('.social__comment-total-count').textContent = currentPicture.comments.length;

    commentsContainer.innerHTML = ''; // Очищает предыдущие комментарии
    const fragment = document.createDocumentFragment();

    currentPicture.comments.forEach((comment) => {
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
    bigPicture.querySelector('.social__caption').textContent = currentPicture.description;

    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    document.body.classList.add('modal-open');

  };

  const closeBigPictureHandler = () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  const closeBigPictureOnEsc = (event) => {
    if (event.key === 'Escape') {
      closeBigPictureHandler();
    }
  };

  closeBigPicture.addEventListener('click', closeBigPictureHandler);
  document.addEventListener('keydown', closeBigPictureOnEsc);

  container.addEventListener('click', (evt) => {
    const currentPictures = evt.target.closest('.picture');

    if (currentPictures) {
      openBigPicture(currentPictures.dataset.pictureId);
    }
  });
};

export { bigPictureHandler };
