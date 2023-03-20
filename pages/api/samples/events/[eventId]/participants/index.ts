// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse, NextApiRequest } from 'next';
import { ParticipantType } from '@/types/ParticipantType';

type ResponseType = ParticipantType;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'POST') {
  } else {
    // Handle any other HTTP method
  }

  res.status(200).json(req.body);
}
