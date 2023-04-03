'use client';
import { EventType } from '@/types/EventType';
import Link from 'next/link';
import { useState } from 'react';

export default function EventCard({ event }: { event: EventType }) {
  return (
    <div className='relative overflow-hidden mb-8'>
      <div className='bg-white rounded'>
        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{event.name}</div>
          <p className='text-gray-700 text-base'>{event.summary}</p>
        </div>
        <Link href={`/events/${event.id}`}>Mehr erfahren</Link>

        <div>Registrieren</div>
        <div>{event.date}</div>
        <div>{event.location}</div>
      </div>
    </div>
  );
}
