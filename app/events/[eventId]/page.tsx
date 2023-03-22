import EventForm from '@/components/EventsForm';

export default async function Page({
  params,
}: {
  params: { eventId: string };
}) {
  return (
    <>
      <EventForm eventId={params.eventId} />;
    </>
  );
}
