import { BaseService } from '../BaseService';
import { EventEndpoint } from './EventService';

const participantEndpoint = 'participants';

export const ParticipantService = (eventId: string) =>
  BaseService(`${EventEndpoint}/${eventId}/${participantEndpoint}`);
