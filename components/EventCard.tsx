import { EventType } from '@/types/EventType';

export default function EventCard({ event }: { event: EventType }) {
  return (
    <div className='relative overflow-hidden mb-8'>
      <div className='bg-white rounded'>
        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{event.name}</div>
          <p className='text-gray-700 text-base'>{event.summary}</p>
        </div>
        <div className='px-6 pt-4 pb-12'>
          <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
            {event.location}
          </span>
        </div>
      </div>
    </div>
  );
}
