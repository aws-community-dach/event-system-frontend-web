'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';

interface ParticipantFormAuthProps {
  title: string;
  pushPath?: '' | 'checkin';
  params: { eventId: string };
}

export default function ParticipantFormAuth({
  title,
  pushPath = '',
  params,
}: ParticipantFormAuthProps) {
  const [participantId, setParticipantId] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(
      `/events/${params.eventId}/participants/${participantId}/${pushPath}?email=${participantEmail}`,
    );
  };

  return (
    <>
      <h3>{title}</h3>

      <form className='w-full space-y-4' onSubmit={handleSubmit}>
        <FormInput
          type='email'
          label='Your E-Mail'
          value={participantEmail}
          onChange={(e) => setParticipantEmail(e.target.value)}
          required
        />
        <FormInput
          type='text'
          label='Participant Id'
          value={participantId}
          onChange={(e) => setParticipantId(e.target.value)}
          required
        />

        <Button type='submit'>Submit</Button>
      </form>
    </>
  );
}
