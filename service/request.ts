import axios, { AxiosError, AxiosResponse } from 'axios';

const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });

const request = async ({
  url,
  data,
  method,
  params,
}: {
  url: string;
  data?: object;
  method?: string;
  params?: object;
}) => {
  let withCredentials = false;

  if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
    withCredentials = true;
  }
  client.defaults.withCredentials = withCredentials;
  const onSuccess = (response: AxiosResponse) => response;

  const onError = (error: AxiosError) => {
    const customError = {
      customError: true,
      message: error.message,
      status: error.response?.status || 500,
      data: null,
      fault: '',
      name: '',
    };

    if (error.code === 'ECONNREFUSED') {
      throw {
        ...customError,
        message: 'Connection refused. Please ensure the server is running.',
        status: 500,
        data: null,
      };
    }

    if (error.code === 'ERR_BAD_RESPONSE') {
      const responseData = error.response?.data as string;

      if (responseData.startsWith('{') || responseData.startsWith('[')) {
        try {
          const response_error = JSON.parse(responseData.split('context: ')[1]);
          const err = response_error?.err;
          customError.fault = err?.fault;
          customError.name = err?.name;
          customError.data = err;
        } catch (parseError) {
          throw {
            ...customError,
            message: responseData,
          };
        }
      } else {
        throw {
          ...customError,
          message: responseData,
        };
      }
    }

    throw customError;
  };

  return client({ url, data, method, params }).then(onSuccess).catch(onError);
};

const mutationRequest = ({
  endpoint,
  data,
  method,
  params,
}: {
  endpoint: string;
  data: object;
  method?: string;
  params?: object;
}) => {
  return request({
    url: endpoint,
    data: data,
    method: method,
    params: params,
  });
};

export default {
  get: ({ endpoint, params = {} }: { endpoint: string; params?: object }) => {
    return request({ url: endpoint, params: { ...params } });
  },

  post: ({
    endpoint,
    data,
    params = {},
  }: {
    endpoint: string;
    data: object;
    params?: object;
  }) => {
    return mutationRequest({
      endpoint: endpoint,
      data: data,
      method: 'post',
      params: { ...params },
    });
  },

  update: ({
    endpoint,
    data,
    params = {},
  }: {
    endpoint: string;
    data: object;
    params?: object;
  }) => {
    return mutationRequest({
      endpoint: endpoint,
      data: data,
      method: 'put',
      params: { ...params },
    });
  },

  delete: ({
    endpoint,
    data,
    params = {},
  }: {
    endpoint: string;
    data: object;
    params?: object;
  }) => {
    return mutationRequest({
      endpoint: endpoint,
      data: data,
      method: 'delete',
      params: { ...params },
    });
  },
};
