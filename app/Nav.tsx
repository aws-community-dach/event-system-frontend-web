'use client';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { Fragment } from 'react';
import SignIn from './auth/SignIn';

let navigation = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Nav({ session }: { session: Session | null }) {
  const pathname = usePathname();

  const isCurrentHref = (itemHref: string): boolean => {
    if (itemHref === '/') {
      return pathname === itemHref;
    }
    return pathname!.startsWith(itemHref);
  };
  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex h-16 items-center justify-between'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-8 w-8'
                    src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                    alt='AWS DACH'
                  />
                </div>
                <div className='hidden md:block'>
                  <div className='ml-10 flex items-baseline space-x-4'>
                    {navigation.map((item) => {
                      const isActive = isCurrentHref(item.href);
                      return (
                        <Link
                          className={classNames(
                            isActive
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={isActive ? 'page' : undefined}
                          key={item.name}
                          href={item.href}
                        >
                          {' '}
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className='hidden md:block'>
                <div className='ml-4 flex items-center md:ml-6'>
                  {/* Profile dropdown */}
                  <Menu as='div' className='relative ml-3'>
                    <div>
                      {session?.user ? (
                        <Menu.Button className='flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                          <span className='sr-only'>Open user menu</span>
                          <img
                            className='h-8 w-8 rounded-full'
                            src={user.imageUrl}
                            alt=''
                          />
                        </Menu.Button>
                      ) : (
                        <SignIn />
                      )}
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='#'
                              onClick={() => signOut()}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Abmelden
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className='-mr-2 flex md:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='md:hidden'>
            <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
              {navigation.map((item) => {
                const isActive = isCurrentHref(item.href);
                return (
                  <Disclosure.Button
                    key={item.name}
                    as='a'
                    href={item.href}
                    className={classNames(
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
