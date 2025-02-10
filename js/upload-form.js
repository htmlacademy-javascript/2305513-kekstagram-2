import { isEscBtn } from './util.js';
import { error, isValidateHashtags } from './validate-hashtags.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadCancelBtn = uploadForm.querySelector('.img-upload__cancel');
const uploadFileInput = uploadForm.querySelector('.img-upload__input');
const uploadFileOverlay = uploadForm.querySelector('.img-upload__overlay');

const hashtagUserInput = uploadForm.querySelector('.text__hashtags');
const commentUserInput = uploadForm.querySelector('.text__description');

// Валидация формы
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Функция для закрытия модуля
const closeModule = () => {
  uploadFileOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  uploadFileInput.value = '';
  pristine.reset();
};

const closeModuleBtnClick = () => closeModule();

const closeModuleOnEsc = (event) => {
  if (isEscBtn(event) && document.activeElement !== hashtagUserInput && document.activeElement !== commentUserInput) {
    closeModule();
  }
};

const addListeners = () => {
  uploadCancelBtn.addEventListener('click', closeModuleBtnClick);
  document.addEventListener('keydown', closeModuleOnEsc);
};

const onHashtagInput = () => {
  isValidateHashtags(hashtagUserInput.value);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    hashtagUserInput.value = hashtagUserInput.value.trim().replaceAll(/\s+/g, ' ');
    uploadForm.submit();
  }
};

// Функция для открытия модуля
const openModule = () => {
  uploadFileOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  addListeners();
};

// Функция для обновления модуля
const updateModule = () => {
  uploadFileInput.addEventListener('change', openModule);
  pristine.addValidator(hashtagUserInput, isValidateHashtags, error, false);
  uploadForm.addEventListener('submit', onFormSubmit);
  hashtagUserInput.addEventListener('input', onHashtagInput);
};

export { updateModule };
