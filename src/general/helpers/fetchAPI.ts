import { BASE_URL } from '../constants/api';

type Request = {
  requestInit?: RequestInit;
  body?: ObjectKey;
};

const fetchAPI = async (path: string, request: Request = {}) => {
  let { requestInit, body } = request;
  let url = `${BASE_URL}${path}`;

  let response = await fetch(url, {
    ...requestInit,
    body: body && JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  if (response.headers.get('Content-Type')?.includes('application/json')) {
    return response.json();
  }
  return response;
};

export default fetchAPI;
