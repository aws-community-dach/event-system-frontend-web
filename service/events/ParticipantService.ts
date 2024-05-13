import { EventEndpoint } from './EventService';
import { BaseService, idType, OperationParams } from '../BaseService';

const participantEndpoint = 'participants';

type ParamsWithEmail = OperationParams & {
  email: string;
};

export const ParticipantService = (eventId: string) => {
  const baseService = BaseService(
    `${EventEndpoint}/${eventId}/${participantEndpoint}`,
  );

  return {
    ...baseService,
    get: ({ id, params }: { id: idType; params: ParamsWithEmail }) => {
      return baseService.get({ id, params });
    },
    update: ({
      id,
      data,
      params,
    }: {
      id: idType;
      data: object;
      params: ParamsWithEmail;
    }) => {
      return baseService.update({ id: id, data: data, params: params });
    },
    delete: ({ id, params }: { id: idType; params: ParamsWithEmail }) => {
      return baseService.delete({ id: id, data: {}, params: params });
    },
  };
};
