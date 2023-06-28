'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import Button from './Button';
import ParticipantFormCreate from './ParticipantFormCreate';

export default function EventFormModal({ eventId }: { eventId: string }) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setOpen(false);
    }
  };

  const submitCallback = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <>
      <Button className='w-full' onClick={() => setOpen(true)}>
        Registrieren
      </Button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='fixed z-20 h-3/4 m-auto inset-x-0 inset-y-0 overflow-y-scroll'
          initialFocus={cancelButtonRef}
          onClose={() => setOpen(false)}
        >
          <div className='flex w-full justify-center p-4 sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div
                className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
                onClick={handleClose}
              />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='bg-white w-10/12 lg:w-1/2 rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all'>
                <ParticipantFormCreate
                  eventId={eventId}
                  className='md:p-4'
                  onSubmit={submitCallback}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
