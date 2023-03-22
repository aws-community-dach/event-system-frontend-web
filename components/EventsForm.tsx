'use client';

import { ParticipantService } from '@/service/events/ParticipantService';
import { ParticipantFormType } from '@/types/ParticipantType';

export default function EventForm({ eventId }: { eventId: string }) {
  const handleSubmit = async (event: React.FormEvent<ParticipantFormType>) => {
    event.preventDefault();

    const target = event.currentTarget.elements;

    const data = {
      name: target.name.value,
      displayName: target.displayName.value,
      email: target.email.value,
    };

    ParticipantService.add(eventId, data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Name:</label>
      <input type='text' id='name' required />

      <label htmlFor='displayName'>Display Name:</label>
      <input type='text' id='displayName' required />

      <label htmlFor='email'>Email:</label>
      <input type='email' id='email' required />

      <button type='submit'>Submit</button>
    </form>
  );
}
