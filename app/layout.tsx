import './globals.css';
import { getServerSession } from 'next-auth/next';
import Nav from './Nav';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html className='h-full bg-gray-100'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='h-full'>
        <div className='min-h-full'>
          <Nav session={session} />
          <main>
            <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
