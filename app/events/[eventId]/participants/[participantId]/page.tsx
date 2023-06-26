import ParticipantFormUpdate from '@/components/ParticipantFormUpdate';
import { ParticipantService } from '@/service/events/ParticipantService';
import { ParticipantType } from '@/types/ParticipantType';

async function getData(eventId: string, participantId: string) {
  const res = await ParticipantService(eventId).get(participantId);

  return res.data;
}

export default async function Page({
  params,
}: {
  params: { eventId: string; participantId: string };
}) {
  const participant: ParticipantType = await getData(
    params.eventId,
    params.participantId,
  );
  return (
    <>
      <h1>Update your Registration</h1>
      <>
        <ParticipantFormUpdate
          eventId={params.eventId}
          participantData={participant}
        />
      </>
    </>
  );
}
