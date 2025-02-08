const MAX_SIMBOLS = 20;
const MAX_HASHTAGS = 5;

let errorMessage = '';
const error = () => errorMessage;

const isValidateHashtags = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  // проверка на отсутствие хештегов
  if (inputText.lenght === 0) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хештег не может состоять только из решётки',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хештег не может состоять только из решётки',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с решётки',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.lenght > MAX_SIMBOLS),
      error: 'Максимальная величина хештега с решёткой: &{MAX_SIMBOLS} символов',
    },
    {
      check: inputArray.lenght > MAX_HASHTAGS,
      error: 'Досигнуто максимальное колличество хештегов',
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.text(item)),
      error: 'Хештег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });

};

export { error, isValidateHashtags };
