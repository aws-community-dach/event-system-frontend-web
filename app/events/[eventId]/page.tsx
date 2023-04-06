import Box from '@/components/Box';
import EventForm from '@/components/EventsForm';

export default async function Page({
  params,
}: {
  params: { eventId: string };
}) {
  return (
    <div className='grid grid-flow-row-dense lg:grid-cols-3 gap-4'>
      <div className='col-span-2'>
        <Box className=''>Lorem</Box>
      </div>

      <div className='hidden lg:block self-start sticky top-2 col-span-1'>
        <EventForm eventId={params.eventId} />
      </div>
    </div>
  );
}
