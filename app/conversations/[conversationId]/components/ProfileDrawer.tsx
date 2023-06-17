'use client';

import { Fragment, useMemo, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoClose, IoTrash } from 'react-icons/io5'
import { Conversation, User } from '@prisma/client';
import { format } from 'date-fns';

import useOtherUser from '@/app/hooks/useOtherUser';
// import useActiveList from '@/app/hooks/useActiveList';

import Avatar from '@/app/components/Avatar';
import Modal from '@/app/components/Modal';
import ConfirmModal from './ConfirmModal';
import AvatarGroup from '@/app/components/AvatarGroup';
import useActiveList from '@/app/hooks/useActiveList';
// import AvatarGroup from '@/app/components/AvatarGroup';


interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[]
  }
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
//   given inputs from our header
  data,
}) => {
  const {members}= useActiveList();
  // const isActive= members.indexOf(otherUser?.email!) !== -1;
        const [confirmOpen, setConfirmOpen] = useState(false);
        const otherUser = useOtherUser(data);
        // this gets our other user as needed
       
        const isActive= members.indexOf(otherUser?.email!) !== -1;

        const joinedDate = useMemo(() => {
            return format(new Date(otherUser.createdAt), 'PP');
            // gives date other user was created
        }, [otherUser.createdAt]);
        
        const title = useMemo(() => {
            return data.name || otherUser.name;
                // convo name which is a group chat or other persons name

        }, [data.name, otherUser.name]);

        // const { members } = useActiveList();
        // const isActive = members.indexOf(otherUser?.email!) !== -1;

        const statusText = useMemo(() => {
            if (data.isGroup) {
            return `${data.users.length} members`;
            // number of members
            }

            return isActive ? 'Active' : 'Offline' 
        }, [data]);

        return (
            <>
            <ConfirmModal 
        isOpen={confirmOpen} 
        onClose={() => {setConfirmOpen(false)}}
     />

      <Transition.Root show={isOpen} as={Fragment}>
        {/* transition for our opening of drawer */}
                <Dialog as="div" className="relative z-50" onClose={onClose}>
                        {/* dialog which closes */}
            <Transition.Child
            // our animations for the transition. it has transition for entering and leaving profile drawer
                as={Fragment}
                enter="ease-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">



            <div className="absolute inset-0 overflow-hidden">


              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            {/* this is all changing our profile drawer */}

                <Transition.Child
                        // this is for our actual drawer. It has our enter and exit transitions.
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"

                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">

                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                        {/* creates our white side Bar on right side */}
                      <div className="px-4 sm:px-6">

                        <div className="flex items-start justify-end">

                          <div className="ml-3 flex h-7 items-center">
                            
                            <button
                            //   this is for our close: Close button

                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={onClose}
                           
                            >
                              <span className="sr-only">Close panel</span>
                              {/* this is for server side only. not for client only */}
                              <IoClose size={24} aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">

                            {/* these divs are for displaying information. Show User icons and then group title/members */}
                          {data.isGroup?( 
                            <AvatarGroup users={data.users}/>
                          ):(
                             <Avatar user={otherUser} />)}
                          </div>
                          <div>
                            {title}
                            {/* has our title */}
                          </div>
                          <div className="text-sm text-gray-500">
                            {statusText}
                            {/* shows whose active */}
                          </div>
                          <div className="flex gap-10 my-8">

    {/* this will delete our conversation */}

                            <div onClick={() => setConfirmOpen(true)} className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75">
                              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                                <IoTrash size={20} />

                                
                              </div>
                              <div className="text-sm font-light text-neutral-600">
                                Delete

                                {/* deletes convo on click */}
                              </div>
                            </div>
                          </div>
                        <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                        <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">

                            {/* dl element which is interesting, this is a description list */}
                          {data.isGroup && (

                            // this is the styling and displays all emails of members in a group chat. 
                            <div>
                              <dt 
                                className="
                                  text-sm 
                                  font-medium 
                                  text-gray-500 
                                  sm:w-40 
                                  sm:flex-shrink-0
                                "
                              >
                                Emails
                              </dt>
                              <dd 
                                className="
                                  mt-1 
                                  text-sm 
                                  text-gray-900 
                                  sm:col-span-2
                                "
                              >
                                {data.users.map((user) => user.email).join(', ')}
                                {/* puts a comma and space between each email in group */}
                              </dd>
                            </div>
                          )}
                          
                          {/* this is for single message convos not group chats. */}
                          {!data.isGroup && (
                            <div>
                              <dt 
                                className="
                                  text-sm 
                                  font-medium 
                                  text-gray-500 
                                  sm:w-40 
                                  sm:flex-shrink-0
                                "
                              >
                                Email

                                {/* has the other users email */}
                              </dt>
                              <dd 
                                className="
                                  mt-1 
                                  text-sm 
                                  text-gray-900 
                                  sm:col-span-2
                                "
                              >
                                {/* has the other users email */}
                                {otherUser.email}
                              </dd>
                            </div>
                          )}

                          {/* this has the time you first messaged the other user.  */}
                          {!data.isGroup && (
                            <>
                              <hr />
                              <div>
                                <dt 
                                  className="
                                    text-sm 
                                    font-medium 
                                    text-gray-500 
                                    sm:w-40 
                                    sm:flex-shrink-0
                                  "
                                >
                                  Joined
                                </dt>
                                <dd 
                                  className="
                                    mt-1 
                                    text-sm 
                                    text-gray-900 
                                    sm:col-span-2
                                  "
                                >
                                    {/* date when they first joined dd is a time */}
                                  <time dateTime={joinedDate}>
                                    {joinedDate}
                                  </time>
                                </dd>
                              </div>
                            </>
                          )}
                        </dl>
                      </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default ProfileDrawer;