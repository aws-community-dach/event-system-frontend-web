import ParticipantFormAuth from '@/components/ParticipantFormAuth';

export default function ParticipantCheckinForm({
  params,
}: {
  params: { eventId: string };
}) {
  return (
    <ParticipantFormAuth title='Checkin' pushPath='checkin' params={params} />
  );
}
