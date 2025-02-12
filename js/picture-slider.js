const slider = document.querySelector('.effect-level__slider');
const uploadWrapper = document.querySelector('.img-upload__wrapper');

noUiSlider.create(slider, {
  start: 0,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 1,
  },

});

slider.noUiSlider.on('update', {

});
