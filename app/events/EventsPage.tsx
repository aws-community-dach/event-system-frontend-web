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
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const locations = Array.from(
    new Set(eventList.map((event) => event.location))
  );

  const filteredEvents = eventList.filter((event) => {
    const nameMatch = fuzzyMatch(search, event.name);
    const locationMatch =
      selectedLocations.length === 0 ||
      selectedLocations.includes(event.location);
    return nameMatch && locationMatch;
  });

  const handleLocationCheckboxChange = (location: string, checked: boolean) => {
    if (checked) {
      setSelectedLocations([...selectedLocations, location]);
    } else {
      setSelectedLocations(selectedLocations.filter((l) => l !== location));
    }
  };

  return (
    <>
      <div className='w-full flex bg-white rounded'>
        <div className='w-1/4 p-4'>
          <h2 className='font-semibold mb-4 border-b-2 border-grey-200'>
            Standorte
          </h2>
          {locations.map((location) => (
            <div key={location} className='mb-2'>
              <input
                type='checkbox'
                id={location}
                onChange={(e) =>
                  handleLocationCheckboxChange(location, e.target.checked)
                }
              />
              <label htmlFor={location} className='ml-2'>
                {location}
              </label>
            </div>
          ))}
        </div>
        <div className='w-3/4 flex flex-col'>
          <div className='p-4 '>
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='rounded py-2 px-3 w-full border-2'
              placeholder='Suche...'
            />
          </div>

          <div className=' p-4 flex-1 overflow-y-auto'>
            <EventCardList className='border-2' eventList={filteredEvents} />
          </div>
        </div>
      </div>
    </>
  );
}
