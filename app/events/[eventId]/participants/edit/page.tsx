import ParticipantFormAuth from '@/components/ParticipantFormAuth';

export default function ParticipantUpdateForm({
  params,
}: {
  params: { eventId: string };
}) {
  return <ParticipantFormAuth title='Update your data' params={params} />;
}
