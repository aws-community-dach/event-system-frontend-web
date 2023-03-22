import request from './request';

export const BaseService = (endpoint: string) => {
  return {
    getAll: (parameter: object = {}) => {
      return request.get(endpoint, parameter);
    },

    get: (parameter: object = {}) => {
      return request.get(endpoint, parameter);
    },

    add: (data: object) => {
      return request.post(endpoint, data);
    },

    update: (data: object) => {
      return request.update(endpoint, data);
    },

    delete: (data: object) => {
      return request.delete(endpoint, data);
    },
  };
};
