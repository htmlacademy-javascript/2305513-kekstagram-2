import { isEscBtn } from './util.js';
import { getErrorMessage, isValidateHashtags } from './validate-hashtags.js';
import { isEffectsRadio, resetImagePreview } from './picture-slider.js';
import { sentData } from './api.js';
import { fileInputChange } from './new-photo.js';

const SCALE_STEP = 0.25;

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadCancelBtn = uploadForm.querySelector('.img-upload__cancel');
const uploadFileInput = uploadForm.querySelector('.img-upload__input');
const uploadFileOverlay = uploadForm.querySelector('.img-upload__overlay');

const hashtagUserInput = uploadForm.querySelector('.text__hashtags');
const commentUserInput = uploadForm.querySelector('.text__description');

const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const errorLengthMessages = 'Длина комментария не должна превышать 140 символов!';
let scaleValue = 1;
let isErrorMessageOpen = false;

// Валидация
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const validateComment = (value) => value.length <= 140;
const validateHashtags = (value) => isValidateHashtags(value);

// Функция для закрытия модуля
const onModuleCloseClick = () => {
  uploadFileOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  resetImagePreview();
  scaleValue = 1;
  imagePreview.style.transform = 'scale(1)';
  scaleValueInput.value = '100%';
  isErrorMessageOpen = false;
};

const onEscCloseModuleClick = (event) => {
  if (isEscBtn(event) &&
    !document.activeElement.matches('.text__hashtags, .text__description') &&
    !isErrorMessageOpen) {
    onModuleCloseClick();
  }
};

// Масштабирование изображения
const updateScale = (value) => {
  imagePreview.style.transform = `scale(${value})`;
  scaleValueInput.value = `${Math.round(value * 100)}%`;
};

const onSmallerBtnClick = () => {
  if (scaleValue > SCALE_STEP) {
    scaleValue -= SCALE_STEP;
    updateScale(scaleValue);
  }
};

const onBiggerBtnClick = () => {
  if (scaleValue < 1) {
    scaleValue += SCALE_STEP;
    updateScale(scaleValue);
  }
};

// Сообщения
const createMessage = (id) => {
  const template = document.getElementById(id);
  if (!template) {
    return;
  }

  const message = template.content.cloneNode(true);
  const messageBox = message.querySelector(`.${id}`);
  const closeButton = messageBox?.querySelector('button');

  if (!messageBox || !closeButton) {
    return;
  }

  // Локальный обработчик ESC для попапа
  const onPopupEscKeydown = (event) => {
    if (isEscBtn(event)) {
      event.stopPropagation();
      close();
    }
  };

  const onDocumentClick = (event) => {
    if (!messageBox.contains(event.target)) {
      close();
    }
  };

  function close() {
    if (messageBox.parentElement) {
      messageBox.remove();
    }
    document.removeEventListener('keydown', onPopupEscKeydown);
    document.removeEventListener('click', onDocumentClick);
    isErrorMessageOpen = false;
  }

  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onDocumentClick);
  closeButton.addEventListener('click', close);

  document.body.append(message);
  isErrorMessageOpen = true;

  return close;
};

const displaySuccessMessage = () => createMessage('success');
const displayErrorMessage = () => createMessage('error');

// Отправка формы
const handleFormSubmit = async (event) => {
  event.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  try {
    const formData = new FormData(uploadForm);
    await sentData(formData);

    onModuleCloseClick();
    displaySuccessMessage();
  } catch (err) {
    displayErrorMessage();
  }
};

pristine.addValidator(
  commentUserInput,
  validateComment,
  errorLengthMessages,
  {
    errorTextParent: commentUserInput.parentElement,
    errorTextTag: 'span',
    errorTextClass: 'error-text error-text--comment'
  }
);

pristine.addValidator(
  hashtagUserInput,
  validateHashtags,
  getErrorMessage,
  {
    errorTextParent: hashtagUserInput.parentElement,
    errorTextTag: 'span',
    errorTextClass: 'error-text error-text--hashtag'
  }
);

// Функция для обновления модуля
const updateModule = () => {
  uploadFileInput.addEventListener('change', () => {
    uploadFileOverlay.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    fileInputChange();
    document.addEventListener('keydown', onEscCloseModuleClick);
    resetImagePreview();
  });
  commentUserInput.addEventListener('input', () => {
    pristine.validate(commentUserInput);
  });

  hashtagUserInput.addEventListener('input', () => {
    pristine.validate(hashtagUserInput);
  });

  uploadCancelBtn.addEventListener('click', onModuleCloseClick);
  smallerBtn.addEventListener('click', onSmallerBtnClick);
  biggerBtn.addEventListener('click', onBiggerBtnClick);
  uploadForm.addEventListener('submit', handleFormSubmit);
  isEffectsRadio();
};

export { updateModule };
