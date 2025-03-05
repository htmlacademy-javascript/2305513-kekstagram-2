import { isEscBtn } from './util.js';
import { getErrorMessage, isValidateHashtags } from './validate-hashtags.js';
import { isEffectsRadio, resetImagePreview } from './picture-slider.js';
import { sentData } from './api.js';
import { fileInputChange } from './new-photo.js';

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

const SCALE_STEP = 0.25;
const errorLengthMessages = 'Длина комментария не должна превышать 140 символов!';
let scaleValue = 1;

// Валидация
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'form__error',
});

// Валидаторы
const validateComment = (value) => value.length <= 140;
const validateHashtags = (value) => isValidateHashtags(value);

// Добавление валидаторов с кастомизацией
pristine.addValidator(
  commentUserInput,
  validateComment,
  errorLengthMessages,
  {
    errorTextParent: commentUserInput.parentElement,
    errorTextTag: 'div',
    errorTextClass: 'pristine-error'
  }
);

pristine.addValidator(
  hashtagUserInput,
  validateHashtags,
  getErrorMessage,
  {
    errorTextParent: hashtagUserInput.parentElement,
    errorTextTag: 'div',
    errorTextClass: 'pristine-error'
  }
);

// Функция для закрытия модуля
const closeModule = () => {
  uploadFileOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  resetImagePreview();
  scaleValue = 1;
  imagePreview.style.transform = 'scale(1)';
  scaleValueInput.value = '100%';
};

const closeModuleOnEsc = (event) => {
  if (isEscBtn(event) && !document.activeElement.matches('.text__hashtags, .text__description')) {
    closeModule();
  }
};

// Масштабирование изображения
const updateScale = (value) => {
  imagePreview.style.transform = `scale(${value})`;
  scaleValueInput.value = `${Math.round(value * 100)}%`;
};

const onSmallerBtnClick = () => {
  if (scaleValue > SCALE_STEP) {
    scaleValue = Math.max(scaleValue - SCALE_STEP, SCALE_STEP);
    updateScale(scaleValue);
  }
};

const onBiggerBtnClick = () => {
  if (scaleValue < 1) {
    scaleValue = Math.min(scaleValue + SCALE_STEP, 1);
    updateScale(scaleValue);
  }
};

// Системные сообщения
const createMessage = (id) => {
  const template = document.getElementById(id);
  if (!template) {
    return
  };

  const message = template.content.cloneNode(true);
  const messageBox = message.querySelector(`.${id}`);
  const closeButton = messageBox.querySelector('button');

  function close() {
    messageBox.remove();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  const handleDocumentClick = (event) =>
    !messageBox.contains(event.target) && close();

  const handleKeydown = (event) =>
    isEscBtn(event) && close();

  closeButton.addEventListener('click', close);
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleKeydown);

  document.body.append(message);
  return close;
};

const displaySuccessMessage = () => createMessage('success');
const displayErrorMessage = () => createMessage('error');

// Отправка формы
const handleFormSubmit = async (event) => {
  event.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    return
  };

  try {
    await sentData(new FormData(uploadForm));
    closeModule();
    displaySuccessMessage();
  } catch {
    displayErrorMessage();
  }
};

// Функция для обновления модуля
const updateModule = () => {
  uploadFileInput.addEventListener('change', () => {
    uploadFileOverlay.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    fileInputChange();
    document.addEventListener('keydown', closeModuleOnEsc);
    resetImagePreview();
  });

  const validateField = (field) => {
    pristine.resetErrors(field);
    pristine.validate(field);
  };

  commentUserInput.addEventListener('input', () => validateField(commentUserInput));
  hashtagUserInput.addEventListener('input', () => validateField(hashtagUserInput));

  uploadCancelBtn.addEventListener('click', closeModule);
  smallerBtn.addEventListener('click', onSmallerBtnClick);
  biggerBtn.addEventListener('click', onBiggerBtnClick);
  uploadForm.addEventListener('submit', handleFormSubmit);
  isEffectsRadio();
};

export { updateModule };
