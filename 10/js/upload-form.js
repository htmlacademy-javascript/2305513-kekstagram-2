import { isEscBtn } from './util.js';
import { error, isValidateHashtags } from './validate-hashtags.js';
import { isEffectsRadio, resetImagePreview } from './picture-slider.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadCancelBtn = uploadForm.querySelector('.img-upload__cancel');
const uploadFileInput = uploadForm.querySelector('.img-upload__input');
const uploadFileOverlay = uploadForm.querySelector('.img-upload__overlay');

const hashtagUserInput = uploadForm.querySelector('.text__hashtags');
const commentUserInput = uploadForm.querySelector('.text__description');

//кнопочки и т.д для увеличения и уменьшения пикчи

const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

let scaleValue = 1;
const SCALE_STEP = 0.25;

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
  hashtagUserInput.value = '';
  commentUserInput.value = '';
  pristine.reset();
  scaleValue = 1;
  imagePreview.style.transform = 'scale(1)';
  scaleValueInput.value = '100%';
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
  resetImagePreview();
};

// функционал увеличения и уменьшения картинки

const onSmallerBtnClick = () => {
  if (scaleValue > SCALE_STEP) {
    scaleValue -= SCALE_STEP;
    imagePreview.style.transform = `scale(${scaleValue})`;
    scaleValueInput.value = `${Math.round(scaleValue * 100)}%`;
  }
};

const onBiggerBtnClick = () => {
  if (scaleValue < 1) {
    scaleValue += SCALE_STEP;
    imagePreview.style.transform = `scale(${scaleValue})`;
    scaleValueInput.value = `${Math.round(scaleValue * 100)}%`;
  }
};

const commentMaxLengthValidator = (value) => value.length <= 140;

pristine.addValidator(
  commentUserInput,
  commentMaxLengthValidator,
  'Длина комментария не должна превышать 140 символов.',
  false
);

// Функция для обновления модуля
const updateModule = () => {
  uploadFileInput.addEventListener('change', openModule);
  pristine.addValidator(hashtagUserInput, isValidateHashtags, error, false);
  uploadForm.addEventListener('submit', onFormSubmit);
  hashtagUserInput.addEventListener('input', onHashtagInput);
  smallerBtn.addEventListener('click', onSmallerBtnClick);
  biggerBtn.addEventListener('click', onBiggerBtnClick);
  isEffectsRadio();
};

export { updateModule };
