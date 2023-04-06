'use client';

import { ParticipantService } from '@/service/events/ParticipantService';
import { ParticipantFormType } from '@/types/ParticipantType';
import Card from './Card';

export default function EventForm({ eventId }: { eventId: string }) {
  const handleSubmit = (event: React.FormEvent<ParticipantFormType>) => {
    event.preventDefault();

    const target = event.currentTarget.elements;

    const data = {
      name: target.name.value,
      displayName: target.displayName.value,
      email: target.email.value,
    };

    void ParticipantService(eventId).add(data);
  };

  return (
    <Card>
      <form className='w-full' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-x-6 gap-y-6'>
          <div>
            <div className='mt-2'>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                autoComplete='given-name'
                className='pl-2 py-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <div className='mt-2'>
              <input
                type='text'
                name='displayName'
                id='displayName'
                placeholder='Anzeigename'
                className='pl-2 py-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                type='email'
                placeholder='E-Mail'
                autoComplete='email'
                className='pl-2 py-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
        </div>

        <p className='mt-4 text-sm leading-6 text-gray-600'>
          Es gelten die Datenschutzbestimmungen
        </p>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <button
            type='submit'
            className='rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
          >
            Registrieren
          </button>
        </div>
      </form>
    </Card>
  );
}
