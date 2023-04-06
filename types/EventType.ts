import { AgendaType } from './AgendaType';

export type EventType = {
  id: string;
  name: string;
  date: string;
  location: string;
  summary: string;
  agenda: AgendaType[];
};
