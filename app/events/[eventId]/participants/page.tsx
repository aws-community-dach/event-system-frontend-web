import { ParticipantService } from '@/service/events/ParticipantService';
import { ParticipantType } from '@/types/ParticipantType';

async function getData(eventId: string) {
  try {
    const res = await ParticipantService(eventId).getAll();
    return res.data;
  } catch (error) {
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: { eventId: string };
}) {
  const participantList: ParticipantType[] = await getData(params.eventId);
  participantList; // just to satisfy the linter
  return (
    <>
      {/* {participantList?.map((participant) => (
        <div key={participant.id}>{participant.id}</div>
      ))} */}
      <h1 className='text-center'>ಠ_ಠ</h1>
    </>
  );
}
