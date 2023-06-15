'use client';

import { useState } from 'react';
import Box from './Box';
import Button from './Button';
import FormInput from './FormInput';
import { ParticipantService } from '@/service/events/ParticipantService';
import { ParticipantFormType } from '@/types/ParticipantType';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

type EventFormProps = {
  eventId: string;
  onSubmitCallback?: () => void;
  className?: string;
};

export default function EventForm({
  eventId,
  onSubmitCallback = () => {},
  className = '',
}: EventFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<ParticipantFormType>) => {
    event.preventDefault();

    const target = event.currentTarget.elements;
    const form = event.currentTarget;

    const data = {
      name: target.name.value.trim(),
      displayName: target.displayName.value.trim(),
      email: target.email.value.trim(),
    };

    await ParticipantService(eventId).add('', data);
    form.reset();
    onSubmitCallback();
    setIsSubmitted(true);
  };

  return (
    <Box className={className}>
      {isSubmitted ? (
        <div className='w-full text-center mb-6'>
          <CheckCircleIcon className='h-12 w-12 text-success mx-auto mt-4' />
          <p>Erfolgreich angemeldet</p>
        </div>
      ) : (
        <form className='w-full' onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-x-6 gap-y-6'>
            <FormInput
              type='text'
              name='name'
              id='name'
              placeholder='Name'
              autoComplete='given-name'
              required
            />

            <FormInput
              type='text'
              name='displayName'
              id='displayName'
              placeholder='Anzeigename'
              required
            />

            <FormInput
              id='email'
              name='email'
              type='email'
              placeholder='E-Mail'
              autoComplete='email'
              required
            />
          </div>
          <p className='mt-4 text-sm leading-6 text-gray-600'>
            Es gelten die Datenschutzbestimmungen
          </p>
          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <Button className='w-full' type='submit'>
              Registrieren
            </Button>
          </div>
          <div className='mt-5'>
            <div>Bereits registiert?</div>
            <div>
              <Link
                className='text-link'
                href={`/events/${eventId}/participants/edit`}
              >
                <Button type='button' className='w-full' color='secondary'>
                  Daten ändern
                </Button>
              </Link>
            </div>
          </div>
        </form>
      )}
    </Box>
  );
}
