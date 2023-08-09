import './globals.css';
import { getServerSession } from 'next-auth/next';
import Footer from './Footer';
import Nav from './Nav';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html className='h-full'>
      <head />
      <body className='h-full'>
        <div className='flex flex-col min-h-screen'>
          <Nav session={session} />
          <main className='flex-grow'>
            <div className='mx-auto max-w-7xl py-6 px-3 sm:px-6 lg:px-8'>
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
