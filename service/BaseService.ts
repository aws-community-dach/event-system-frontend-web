import request from './request';

export type idType = Number | string;

export type OperationParams = {
  query?: { [key: string]: string | number };
};

export type EntityOperationParams = {
  id: idType;
  data: object;
  params?: OperationParams;
};

export const BaseService = (endpoint: string) => {
  const objectURL = (id: idType) => `${endpoint}/${id}`;

  return {
    getAll: (params: object = {}) => {
      return request.get({ endpoint: endpoint, params: params });
    },

    get: ({ id, params }: { id: idType; params?: object }) => {
      return request.get({ endpoint: objectURL(id), params: params });
    },

    add: ({ id, data, params }: EntityOperationParams) => {
      return request.post({
        endpoint: objectURL(id),
        data: data,
        params: params,
      });
    },

    update: ({ id, data, params }: EntityOperationParams) => {
      return request.update({
        endpoint: objectURL(id),
        data: data,
        params: params,
      });
    },

    delete: ({ id, data, params }: EntityOperationParams) => {
      return request.delete({
        endpoint: objectURL(id),
        data: data,
        params: params,
      });
    },
  };
};
