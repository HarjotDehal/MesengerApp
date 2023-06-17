


'use client'


// this is so we have cleaner transitions between pages. It is our loading modal 

import React, { Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { ClipLoader } from 'react-spinners';

const LoadingModal = () => {


  return (

    // transitions as it makes our whole page a transition. 
    // loading modal always open
    <Transition.Root show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>

        {/* empty close function  */}

            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
          <div id='loader'
            className="
              fixed 
              inset-0 
              bg-gray-500
              bg-opacity-50 
              transition-opacity
            "
          />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">

            {/* this a new div which has a clip loader. The clip loader essentially gets rid of the load */}
          <div 
            className="
              flex 
              min-h-full 
              items-center 
              justify-center 
              p-4 
              text-center 
            "
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel>
                <ClipLoader size={40} color="#0284c7" />
                {/* this is a loader in middle of page */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default LoadingModal;
