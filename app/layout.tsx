import './globals.css';
import Nav from './Nav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={`mx-4 md:mx-48 xl:mx-96 font-sans bg-gray-200`}>
        {/* @ts-expect-error Server Component */}
        <Nav />
        {children}
      </body>
    </html>
  );
}
