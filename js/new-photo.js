import { showErrorMessage } from './util.js';

const FILE_TYPES = ['.jpg', '.jpeg', '.png'];

const inputNewPhoto = document.querySelector('.img-upload__input');
const labelNewPhoto = document.querySelector('.img-upload__preview > img');
const uploadPreviewPhotos = document.querySelectorAll('.effects__preview');

const fileInputChange = () => {
  const file = inputNewPhoto.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    const url = URL.createObjectURL(file);
    labelNewPhoto.src = url;
    uploadPreviewPhotos.forEach((item) => {
      item.style.backgroundImage = `url(${url})`;
    });
  } else {
    showErrorMessage();
  }
};

export { fileInputChange };
