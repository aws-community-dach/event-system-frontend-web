'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';

export default function ParticipantUpdateForm({
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
      `/events/${params.eventId}/participants/${email}?token=${token}`,
    );
  };

  return (
    <>
      <h3>Registrierung aktualisieren</h3>

      <form className='w-full' onSubmit={handleSubmit}>
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
