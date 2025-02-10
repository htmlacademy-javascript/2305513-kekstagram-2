import { isEscBtn } from './util.js';
import { error, isValidateHashtags } from './validate-hashtags.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadCancelBtn = uploadForm.querySelector('.img-upload__cancel');
const uploadFileInput = uploadForm.querySelector('.img-upload__input');
const uploadFileOverlay = uploadForm.querySelector('.img-upload__overlay');

const hashtagUserInput = uploadForm.querySelector('.text__hashtags');
const commentUserInput = uploadForm.querySelector('.text__description');

// валидация формы
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper--error',
  errorClass: 'pristine-error',
});

//закрыть модуль
const closeModule = () => {
  uploadFileOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  uploadFileInput.value = '';
  pristine.reset();
};

const closeModuleBtnClick = () => closeModule();

//закрыть модуль на Esc
const closeModuleOnEsc = (event) => {
  if (isEscBtn(event)) {
    if (document.activeElement !== hashtagUserInput && document.activeElement !== commentUserInput) {
      closeModule();
    }
  }
};

//функционал модуля
const openModule = () => {
  uploadFileOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
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

const updateModule = () => {
  uploadFileInput.addEventListener('change', openModule);
  pristine.addValidator(hashtagUserInput, isValidateHashtags, error, false);
  uploadForm.addEventListener('submit', onFormSubmit);
  hashtagUserInput.addEventListener('input', onHashtagInput);
};

export { updateModule };
