const MAX_SIMBOLS = 20;
const MAX_HASHTAGS = 5;

let errorMessage = '';
const error = () => errorMessage;

const errors = {
  onlyHash: 'Хештег не может состоять только из решётки',
  separatedBySpaces: 'Хештеги разделяются пробелами',
  startsWithHash: 'Хештег должен начинаться с решётки',
  noDuplicates: 'Хештеги не должны повторяться',
  maxLength: `Максимальная величина хештега с решёткой: ${MAX_SIMBOLS} символов`,
  maxHashtags: 'Досигнуто максимальное количество хештегов',
  invalidCharacters: 'Хештег содержит недопустимые символы',
};

const isValidateHashtags = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: errors.onlyHash,
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: errors.separatedBySpaces,
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: errors.startsWithHash,
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: errors.noDuplicates,
    },
    {
      check: inputArray.some((item) => item.length > MAX_SIMBOLS),
      error: errors.maxLength,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: errors.maxHashtags,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: errors.invalidCharacters,
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
