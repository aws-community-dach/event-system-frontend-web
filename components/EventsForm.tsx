'use client';

import { ParticipantService } from '@/service/events/ParticipantService';
import { ParticipantFormType } from '@/types/ParticipantType';
import Box from './Box';
import Button from './Button';

type EventFormProps = {
  eventId: string;
  onSubmitCallback?: () => void;
};

export default function EventForm({
  eventId,
  onSubmitCallback = () => {},
}: EventFormProps) {
  const handleSubmit = (event: React.FormEvent<ParticipantFormType>) => {
    event.preventDefault();

    const target = event.currentTarget.elements;
    const form = event.currentTarget;

    const data = {
      name: target.name.value.trim(),
      displayName: target.displayName.value.trim(),
      email: target.email.value.trim(),
    };

    void ParticipantService(eventId).add('', data);
    form.reset();
    onSubmitCallback();
  };

  return (
    <Box>
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
                required
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
                required
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
                required
                className='pl-2 py-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
        </div>

        <p className='mt-4 text-sm leading-6 text-gray-600'>
          Es gelten die Datenschutzbestimmungen
        </p>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <Button className='w-full' type='submit'>
            Registrieren
          </Button>
        </div>
      </form>
    </Box>
  );
}
