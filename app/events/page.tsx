import EventCardList from '@/components/EventCardList';
import { EventService } from '@/service/events/EventService';
import { EventType } from '@/types/EventType';

async function getData() {
  const res = await EventService.getAll();

  return res.data;
}

export default async function Page() {
  const events: EventType[] = await getData();

  return (
    <div className='w-full flex bg-white'>
      <div className='w-1/4 p-4 border-2 border-red-600'>
        <h2 className='font-semibold'>Sidebar</h2>
      </div>
      <div className='w-3/4 flex flex-col border-2 border-blue-500'>
        <div className='p-4 border-2 border-green-500'>
          <h1 className='font-semibold'>Header</h1>
        </div>
        <div className='border-2 border-rose-200 p-4 flex-1 overflow-y-auto'>
          <EventCardList className='border-2' eventList={events} />
        </div>
      </div>
    </div>
  );
}
