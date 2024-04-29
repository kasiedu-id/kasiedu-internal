import Axios from 'axios';
import ErrorHandler from './error';

const httpClient = Axios.create();

let apiUrl = `${process.env.REACT_APP_BASE_URL}`;

const HttpPost = async (url, data, tempToken) => {
  const accessToken = sessionStorage.getItem('accessToken');

  return httpClient.post(apiUrl + url, data, {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : tempToken ? `Bearer ${tempToken}` : null,
    },
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      ErrorHandler(error);
      throw error?.response.data;
    });
};

const HttpPut = async (url, data, tempToken) => {
  const accessToken = sessionStorage.getItem('accessToken');

  return httpClient.put(apiUrl + url, data, {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : tempToken ? `Bearer ${tempToken}` : null,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      ErrorHandler(error);
      throw error?.response.data;
    });
};

const HttpDelete = async (url, tempToken) => {
  const accessToken = sessionStorage.getItem('accessToken');

  return httpClient
    .delete(apiUrl + url, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : tempToken ? `Bearer ${tempToken}` : null,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      ErrorHandler(error);
      throw error?.response.data;
    });
};

const HttpGet = async (url, tempToken) => {
  const accessToken = sessionStorage.getItem('accessToken');

  return httpClient
    .get(apiUrl + url, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : tempToken ? `Bearer ${tempToken}` : null,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      ErrorHandler(error);
      throw error?.response.data;
    });
};

const HttpGetWithoutToken = async (url) => {
  return httpClient
    .get(apiUrl + url)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      ErrorHandler(error);
      throw error?.response.data;
    });
};

export { HttpPost, HttpGet, HttpPut, HttpDelete, HttpGetWithoutToken };
