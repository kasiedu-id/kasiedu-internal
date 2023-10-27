import Axios from 'axios';
import ErrorHandler from './error';

const httpClient = Axios.create();

let apiUrl = `${process.env.REACT_APP_BASE_URL}api/`;

const HttpPost = async (url: string, data: any, tempToken: string | null) => {
  const accessToken = sessionStorage.getItem('accessToken');

  return httpClient.post(apiUrl + url, data, {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : tempToken ? `Bearer ${tempToken}` : null,
    },
  })
    .then((res : any) => {
      return res.data.data;
    })
    .catch((error : any) => {
      ErrorHandler(error);
      throw error?.response.data;
    });
};

const HttpPut = async (url: string, data: any, tempToken: string | null) => {
  const accessToken = sessionStorage.getItem('accessToken');

  console.log(data);
  return httpClient.put(apiUrl + url, data, {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : tempToken ? `Bearer ${tempToken}` : null,
    },
  })
    .then((res : any) => {
      return res;
    })
    .catch((error : any) => {
      ErrorHandler(error);
      throw error?.response.data;
    });
};

const HttpDelete = async (url: string, tempToken: string) => {
  const accessToken = sessionStorage.getItem('accessToken');

  return httpClient
    .delete(apiUrl + url, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : tempToken ? `Bearer ${tempToken}` : null,
      },
    })
    .then((res : any) => {
      return res.data.data;
    })
    .catch((error : any) => {
      ErrorHandler(error);
      throw error?.response.data;
    });
};

const HttpGet = async (url: string, tempToken: string) => {
  const accessToken = sessionStorage.getItem('accessToken');

  return httpClient
    .get(apiUrl + url, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : tempToken ? `Bearer ${tempToken}` : null,
      },
    })
    .then((res : any) => {
      return res.data.data;
    })
    .catch((error : any) => {
      console.log(error);
      ErrorHandler(error);
      throw error?.response.data;
    });
};

const HttpGetWithoutToken = async (url: string) => {
  return httpClient
    .get(apiUrl + url)
    .then((res : any) => {
      return res.data.data;
    })
    .catch((error : any) => {
      ErrorHandler(error);
      throw error?.response.data;
    });
};

export { HttpPost, HttpGet, HttpPut, HttpDelete, HttpGetWithoutToken };
