const API_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const methods = {
  GET: 'GET',
  POST: 'POST',
};

const errorText = {
  [methods.GET]: 'Не удалось загрузить данные :( Попробуйте ещё раз!',
  [methods.POST]: 'Не удалось отправить данные формы :( Попробуйте ещё раз!',
};

const routes = {
  GET_DATA: '/data',
  SENT_DATA: '/',
};

const uploadingData = async (route, method = methods.GET, body = null) => {
  const response = await fetch(`${API_URL}${route}`, { method, body });
  return response.ok ? await response.json() : Promise.reject(errorText[method]);
};

const getData = async () => await uploadingData(routes.GET_DATA);

const sentData = async (body) => await uploadingData(routes.SENT_DATA, methods.POST, body);

export { getData, sentData };
