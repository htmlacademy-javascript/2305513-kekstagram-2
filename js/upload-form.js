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

const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

let scaleValue = 1;
const SCALE_STEP = 0.25;
const errorLengthMessages = 'Длина комментария не должна превышать 140 символов!';

// Валидация формы
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Валидация
pristine.addValidator(
  commentUserInput,
  (value) => value.length <= 140,
  errorLengthMessages
);

pristine.addValidator(
  hashtagUserInput,
  (value) => isValidateHashtags(value),
  error
);

// Функция для закрытия модуля
const closeModule = () => {
  uploadFileOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  resetImagePreview();
  document.removeEventListener('keydown', closeModuleOnEsc);
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

// Отправка формы
const handleFormSubmit = async (event) => {
  event.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  const formData = new FormData(uploadForm);

  try {
    const response = await fetch(uploadForm.action, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      closeModule();
      displaySuccessMessage();
    } else {
      displayErrorMessage();
    }
  } catch (err) {
    displayErrorMessage();
  }
};

// Сообщения
const createMessage = (id) => {
  const template = document.getElementById(id);
  if (!template) return;

  const message = template.content.cloneNode(true);
  const messageBox = message.querySelector(`.${id}`);
  const closeButton = messageBox.querySelector('button');

  const close = () => messageBox.remove();

  const onDocumentClick = (event) => {
    if (!messageBox.contains(event.target)) {
      close();
    }
  };

  const onDocumentKeydown = (event) => {
    if (isEscBtn(event)) {
      close();
    }
  };

  closeButton.addEventListener('click', close);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);

  document.body.append(message);
};

const displaySuccessMessage = () => createMessage('success');
const displayErrorMessage = () => createMessage('error');

// Функция для обновления модуля
const updateModule = () => {
  uploadFileInput.addEventListener('change', () => {
    uploadFileOverlay.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    document.addEventListener('keydown', closeModuleOnEsc);
    resetImagePreview();
  });

  uploadCancelBtn.addEventListener('click', closeModule);
  smallerBtn.addEventListener('click', onSmallerBtnClick);
  biggerBtn.addEventListener('click', onBiggerBtnClick);
  uploadForm.addEventListener('submit', handleFormSubmit);
  isEffectsRadio();
};

export { updateModule };
