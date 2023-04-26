'use client';

import EventCardList from '@/components/EventCardList';
import { EventType } from '@/types/EventType';
import { useState } from 'react';

function fuzzyMatch(searchText: string, textToSearch: string): boolean {
  const searchPattern = searchText
    .split('')
    .reduce((pattern, char) => pattern + '.*' + char, '');

  const regex = new RegExp(searchPattern, 'i');
  return regex.test(textToSearch);
}

export default function EventsPage({ eventList }: { eventList: EventType[] }) {
  const [search, setSearch] = useState('');

  const filteredEvents = eventList.filter((event) => {
    const combinedText = event.name;
    return fuzzyMatch(search, combinedText);
  });

  return (
    <>
      <div className='w-full flex bg-white'>
        <div className='w-1/4 p-4 border-2 border-red-600'>
          <h2 className='font-semibold'>Sidebar</h2>
        </div>
        <div className='w-3/4 flex flex-col border-2 border-blue-500'>
          <div className='p-4 border-2 border-green-500'>
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='rounded border border-gray-300 py-2 px-3 w-full'
              placeholder='Search...'
            />
          </div>

          <div className='border-2 border-rose-200 p-4 flex-1 overflow-y-auto'>
            <EventCardList className='border-2' eventList={filteredEvents} />
          </div>
        </div>
      </div>
    </>
  );
}
