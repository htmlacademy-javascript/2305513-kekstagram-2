const ERRORE_MESSAGES_REMOVE = 5000;
const TIMEOUT_DELAY = 500;

//рандомное число

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscBtn = (event) => event.key === 'Escape';

const showErrorMessage = () => {
  const template = document.getElementById('data-error');
  const errorMessage = template.content.querySelector('.data-error').cloneNode(true);

  document.body.appendChild(errorMessage);
  errorMessage.style.display = 'block';

  setTimeout(() => {
    errorMessage.remove();
  }, ERRORE_MESSAGES_REMOVE);
};

const debounce = (callback) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), TIMEOUT_DELAY);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export { isEscBtn, getRandomInteger, showErrorMessage, debounce };
