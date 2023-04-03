'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Authenticated() {
  return (
    <li className='flex gap-8 items-center'>
      <button
        className='bg-gray-700 text-white text-sm px-6 py-2 rounded-md '
        onClick={() => signOut()}
      >
        Sign Out
      </button>
      <Link href={'/dashboard'}>Dashboard</Link>
    </li>
  );
}
