'use client';

import { ParticipantFormElementsType } from '@/types/ParticipantType';

export default function EventForm({ eventId }: { eventId: number }) {
  const handleSubmit = async (
    event: React.FormEvent<ParticipantFormElementsType>
  ) => {
    event.preventDefault();

    const target = event.currentTarget;

    const data = {
      name: target.name.value,
      displayName: target.displayName.value,
      email: target.email.value,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = `/api/samples/events/${eventId}/participants`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();
    alert(
      `Is this your submitted data: \nName: ${result.name}\nDisplay Name: ${result.displayName}\nEmail: ${result.email}`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='participant-name'>Name:</label>
      <input type='text' id='participant-name' name='name' required />

      <label htmlFor='displayName'>Display Name:</label>
      <input type='text' id='displayName' name='displayName' required />

      <label htmlFor='email'>Email:</label>
      <input type='email' id='email' name='email' required />

      <button type='submit'>Submit</button>
    </form>
  );
}
