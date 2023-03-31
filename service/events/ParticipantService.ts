import { EventEndpoint } from './EventService';
import { BaseService } from '../BaseService';

const participantEndpoint = 'participants';

export const ParticipantService = (eventId: string) =>
  BaseService(`${EventEndpoint}/${eventId}/${participantEndpoint}`);
