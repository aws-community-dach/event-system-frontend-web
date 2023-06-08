'use client';

import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Button from '@/components/Button';
import EventCardList from '@/components/EventCardList';
import { EventType } from '@/types/EventType';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const locations = Array.from(
    new Set(eventList.map((event) => event.location)),
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
      <div className='w-full flex flex-col md:flex-row border  rounded'>
        <div className='md:hidden p-4 mb-2 ml-auto border '>
          <Button
            className={` ${sidebarOpen ? 'bg-accent-600' : ''}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <AdjustmentsHorizontalIcon
              className='block h-6 w-6'
              aria-hidden='true'
            />
          </Button>
        </div>
        <div
          className={`w-full md:w-1/4 p-4 md:block ${
            sidebarOpen ? 'block' : 'hidden'
          }`}
        >
          <h2 className='font-semibold mb-4'>Standorte</h2>
          {locations.map((location) => (
            <div key={location} className='mb-2 '>
              <input
                type='checkbox'
                id={location}
                className='cursor-pointer'
                onChange={(e) =>
                  handleLocationCheckboxChange(location, e.target.checked)
                }
              />
              <label htmlFor={location} className='ml-2 cursor-pointer'>
                {location}
              </label>
            </div>
          ))}
        </div>
        <div className='w-full md:w-3/4 flex flex-col'>
          <div className='p-4'>
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='rounded py-2 px-3 w-full border border-link hover:bg-polar'
              placeholder='Suche...'
            />
          </div>

          <div className='p-4 flex-1 overflow-y-auto'>
            <EventCardList
              className='border  hover:bg-polar'
              eventList={filteredEvents}
            />
          </div>
        </div>
      </div>
    </>
  );
}
