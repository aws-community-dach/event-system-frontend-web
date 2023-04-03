import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import SignIn from './auth/SignIn';
import Authenticated from './auth/Authenticated';

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <nav className='flex justify-between items-center py-8 '>
      <Link href={'/'}>
        <h1 className='font-bold text-lg'>AWS DACH Events</h1>
      </Link>
      <ul className='flex items-center gap-6'></ul>
      {!session?.user && <SignIn />}
      {session?.user && <Authenticated />}
    </nav>
  );
}
