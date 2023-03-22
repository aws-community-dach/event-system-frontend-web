import axios, { AxiosError, AxiosResponse } from 'axios';

const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });

const request = async ({ ...options }) => {
  let withCredentials = false;

  if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
    withCredentials = true;
  }
  client.defaults.withCredentials = withCredentials;
  const onSuccess = (response: AxiosResponse) => response;

  const onError = (error: AxiosError) => {
    console.log(error.message);
    return Promise.reject(error.response);
  };

  return client(options).then(onSuccess).catch(onError);
};

const mutationRequest = (endpoint: string, data: object, method: string) => {
  return request({ url: endpoint, data: data, method: method });
};

export default {
  get: (endpoint: string, parameter: object = {}) => {
    return request({ url: endpoint, params: { ...parameter } });
  },

  post: (endpoint: string, data: object) => {
    return mutationRequest(endpoint, data, 'post');
  },

  update: (endpoint: string, data: object) => {
    return mutationRequest(endpoint, data, 'put');
  },

  delete: (endpoint: string, data: object) => {
    return mutationRequest(endpoint, data, 'delete');
  },
};
