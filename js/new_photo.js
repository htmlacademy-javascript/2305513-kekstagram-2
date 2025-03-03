const inputNewPhoto = document.querySelector('.img-upload__input');
const labelNewPhoto = document.querySelector('.img-upload__preview > img');
const uploadPreviewPhoto = document.querySelectorAll('.effects__preview');

const FILE_TYPES = ['.jpg', '.jpeg', '.png'];

const fileInputChange = () => {
  const file = inputNewPhoto.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    const url = URL.createObjectURL(file);
    labelNewPhoto.src = url;
    uploadPreviewPhoto.forEach((item) => {
      item.style.backgroundImage = `url(${url})`;
    });
  } else {
    document.querySelector('.data-error__title');
  }
};

export { fileInputChange };
