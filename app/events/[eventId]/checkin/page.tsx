'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';

export default function ParticipanCheckinForm({
  params,
}: {
  params: { eventId: string };
}) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(
      `/events/${params.eventId}/participants/${email}/checkin?token=${token}`,
    );
  };

  return (
    <>
      <h3>Checkin</h3>

      <form className='w-full space-y-4' onSubmit={handleSubmit}>
        <FormInput
          type='email'
          label='E-Mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FormInput
          type='text'
          label='Token'
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />

        <Button type='submit'>Submit</Button>
      </form>
    </>
  );
}
