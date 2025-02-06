import { isEscBtn } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadCancelBtn = uploadForm.querySelector('.img-upload__cancel');
const uploadFileInput = uploadForm.querySelector('.img-upload__input');
const uploadFileOverlay = uploadForm.querySelector('.img-upload__overlay');

const closeModule = () => {
  uploadFileOverlay.classList.add('.hidden');
  pageBody.classList.remove('.modal-open');
  uploadFileInput.value = '';
};

const closeModuleBtnClick = () => closeModule();

const closeModuleOnEsc = (event) => {
  if (isEscBtn(event)) {
    closeModule();
  }
};

// const removeListener = () => {
//   uploadCancelBtn.removeEventListener('click', closeModuleBtnClick);
//   document.removeEventListener('keydown', closeModuleOnEsc);
// };

const updateModule = () => {
  uploadFileInput.addEventListener('change', () => {
    uploadFileOverlay.classList.remove('.hidden');
    pageBody.classList.add('.modal-open');
    uploadCancelBtn.addEventListener('click', closeModuleBtnClick);
    document.addEventListener('keydown', closeModuleOnEsc);
  });
};

export { updateModule };
