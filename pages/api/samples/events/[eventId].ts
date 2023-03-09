// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse, NextApiRequest } from 'next';
import { eventList } from '@/data/event';
import type { EventType } from '@/types/EventType';

type NotFoundError = {
  message: string;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventType | NotFoundError>
) {
  const { eventId } = req.query;
  const id = Number(eventId) - 1;
  const event = eventList[id];

  if (!event) {
    return res.status(404).json({ message: 'Not Found' });
  }
  res.status(200).json(event);
}
