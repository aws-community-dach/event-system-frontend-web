import { BaseService } from '../BaseService';
import request from '../request';
import { EventEndpoint } from './EventService';

const participantEndpoint = 'participants';

export const ParticipantService = (eventId: string) =>
  BaseService(`${EventEndpoint}/${eventId}/${participantEndpoint}`);

ParticipantService.add = (eventId: string, data: object) => {
  return request.post(
    `${EventEndpoint}/${eventId}/${participantEndpoint}`,
    data
  );
};
