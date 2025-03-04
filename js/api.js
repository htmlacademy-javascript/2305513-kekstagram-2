const API_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Methods = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [Methods.GET]: 'Не удалось загрузить данные :( Попробуйте ещё раз!',
  [Methods.POST]: 'Не удалось отправить данные формы :( Попробуйте ещё раз!',
};

const Routes = {
  GET_DATA: '/data',
  SENT_DATA: '/',
};

const uploadingData = async (route, method = Methods.GET, body = null) => {
  const response = await fetch(`${API_URL}${route}`, { method, body });
  return response.ok ? await response.json() : Promise.reject(ErrorText[method]);
};

const getData = async () => await uploadingData(Routes.GET_DATA);

const sentData = async (body) => await uploadingData(Routes.SENT_DATA, Methods.POST, body);

export { getData, sentData };
