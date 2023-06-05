import { ParticipantService } from '@/service/events/ParticipantService';
import { ParticipantType } from '@/types/ParticipantType';

async function getData(eventId: string) {
  const res = await ParticipantService(eventId).getAll();

  return res.data;
}

export default async function Page({
  params,
}: {
  params: { eventId: string };
}) {
  const participantList: ParticipantType[] = await getData(params.eventId);
  console.log(participantList);
  return (
    <>
      {participantList?.map((participant) => (
        <div key={participant.id}>{participant.id}</div>
      ))}
    </>
  );
}
