// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse, NextApiRequest } from "next";
import { eventList } from "@/data/event";
import type { EventType } from "@/types/EventType";

type ResponseType = EventType[];

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    res.status(200).json(eventList);
}
