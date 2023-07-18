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
    if (error.code === 'ECONNREFUSED') {
      throw {
        customError: true,
        message: 'Connection refused. Please ensure the server is running.',
        status: 500,
        data: null,
      };
    }

    if (error.code === 'ERR_BAD_RESPONSE') {
      const response_error = JSON.parse(
        (error.response?.data as string).split('context: ')[1],
      );
      const err = response_error?.err;
      throw {
        customError: true,
        message: error.message,
        fault: err.fault,
        name: err.name,
        status: err.$metadata?.httpStatusCode,
        data: err,
      };
    }

    throw error;
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
