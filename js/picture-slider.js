const effectLevelValue = document.querySelector('.effect-level__value');
const effectsRadio = document.querySelectorAll('.effects__radio');
const imgPreview = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');

let currentEffect = 'none';
let currentEffectLevel = 100;

// Создание слайдера
noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: currentEffectLevel,
  step: 1,
  connect: 'lower'
});

// Функция для обновления стилей изображения
const updateEffect = () => {
  switch (currentEffect) {
    case 'chrome':
      imgPreview.style.filter = `grayscale(${(currentEffectLevel / 100).toFixed(1)})`;
      break;
    case 'sepia':
      imgPreview.style.filter = `sepia(${(currentEffectLevel / 100).toFixed(1)})`;
      break;
    case 'marvin':
      imgPreview.style.filter = `invert(${currentEffectLevel}%)`;
      break;
    case 'phobos':
      imgPreview.style.filter = `blur(${(currentEffectLevel / 10).toFixed(1)}px)`;
      break;
    case 'heat':
      imgPreview.style.filter = `brightness(${(currentEffectLevel / 100 + 1).toFixed(1)})`;
      break;
    case 'none':
      imgPreview.style.filter = '';
      break;
  }
};

// Изменение слайдера
slider.noUiSlider.on('update', (values, handle) => {
  currentEffectLevel = Math.round(values[handle]);
  effectLevelValue.value = currentEffectLevel;
  updateEffect();
});

// Переключение эффектов
const isEffectsRadio = () => {
  effectsRadio.forEach((radio) => {
    radio.addEventListener('change', (evt) => {
      currentEffect = evt.target.value;

      // Управление отображением ползунка
      if (['chrome', 'sepia', 'marvin', 'phobos', 'heat'].includes(currentEffect)) {
        slider.style.display = 'block';
        currentEffectLevel = 100;
        slider.noUiSlider.set(currentEffectLevel);
      } else {
        slider.style.display = 'none';
        currentEffectLevel = 0;
      }

      updateEffect();
    });
  });
};

const resetImagePreview = () => {
  currentEffect = 'none';
  currentEffectLevel = 100;
  imgPreview.style.filter = '';

  slider.style.display = 'none';
  slider.noUiSlider.set(currentEffectLevel);
};

export { isEffectsRadio, resetImagePreview };
