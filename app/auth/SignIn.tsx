'use client';

import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <li>
      <button onClick={() => signIn()}>Sign In</button>
    </li>
  );
}
