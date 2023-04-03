'use client';

import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <button
      onClick={() => signIn()}
      className={
        'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
      }
    >
      Anmelden
    </button>
  );
}
