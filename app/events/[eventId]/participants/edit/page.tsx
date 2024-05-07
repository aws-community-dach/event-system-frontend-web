'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';

export default function ParticipantUpdateForm({
  params,
}: {
  params: { eventId: string };
}) {
  const [participantId, setParticipantId] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(`/events/${params.eventId}/participants/${participantId}`);
  };

  return (
    <>
      <h3>Update your data</h3>

      <form className='w-full space-y-4' onSubmit={handleSubmit}>
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
