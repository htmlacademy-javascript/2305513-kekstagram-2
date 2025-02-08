import { isEscBtn } from './util.js';
import { error, isValidateHashtags } from './validate-hashtags.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadCancelBtn = uploadForm.querySelector('.img-upload__cancel');
const uploadFileInput = uploadForm.querySelector('.img-upload__input');
const uploadFileOverlay = uploadForm.querySelector('.img-upload__overlay');

const hashtagUserInput = uploadForm.querySelector('.text__hashtags');
const commentUserInput = uploadForm.querySelector('.text__description');

//закрыть модуль
const closeModule = () => {
  uploadFileOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  uploadFileInput.value = '';
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

// валидация формы
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(hashtagUserInput, isValidateHashtags, error, false);

//функционал модуля
const updateModule = () => {
  uploadFileInput.addEventListener('change', () => {
    uploadFileOverlay.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    uploadCancelBtn.addEventListener('click', closeModuleBtnClick);
    document.addEventListener('keydown', closeModuleOnEsc);
  });
};

export { updateModule };
