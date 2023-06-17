'use client'

import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { useMemo, useState } from "react";
import Link from "next/link";
import { Conversation, User } from "@prisma/client";

import useOtherUser from "@/app/hooks/useOtherUser";
// import useActiveList from "@/app/hooks/useActiveList";

import Avatar from "@/app/components/Avatar";
import ProfileDrawer from './ProfileDrawer';
import AvatarGroup from '@/app/components/AvatarGroup';
import useActiveList from '@/app/hooks/useActiveList';
// import AvatarGroup from "@/app/components/AvatarGroup";

    interface HeaderProps {
    conversation: Conversation & {
        users: User[]

        // we pass in our convo and the users that associate
    }
    }

const Header: React.FC<HeaderProps> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation);
    // gets our other user
    const [drawerOpen, setDrawerOpen] = useState(false);

    const {members}= useActiveList();
    const isActive= members.indexOf(otherUser?.email!) !== -1;
    // const { members } = useActiveList();
    // const isActive = members.indexOf(otherUser?.email!) !== -1;
    const statusText = useMemo(() => {
        if (conversation.isGroup) {
        return `${conversation.users.length} members`;
                // if group, we return number of members

        }

        return isActive? 'Active'  : 'Offline';
    }, [conversation]);

    return (
    <>
        <ProfileDrawer 
        data={conversation} 
        isOpen={drawerOpen} 
        // this allows us to open our drawer whenever we click it. 
        onClose={() => setDrawerOpen(false)}
        />
        <div id='jatt'
        className="
            bg-white
            w-full 
            flex 
            border-b-[1px] 
            sm:px-4 
            py-3 
            px-4 
            lg:px-6 
            justify-between 
            items-center 
            shadow-sm
        "
        >
        <div className="flex gap-3 items-center">
            <Link
            href="/conversations" 
            // this is for mobile only. It just adds a nice bar at the top alongwith link to required area
            className="
                lg:hidden 
                block 
                text-black
                hover:text-gray
                transition 
                cursor-pointer
            "
            >
            <HiChevronLeft size={32} />
                {/* symbol to go back, its a back item to leave our conversation and go to main list page.  */}

            </Link>
           {conversation.isGroup?(
            <AvatarGroup users={conversation.users} />
           ):(
            <Avatar user={otherUser} />)}
            {/* shows icon of other user at the top of our right hand side conversation */}
     
            <div id='texxt' className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            {/* shows users name at the top */}
            <div className="text-sm font-light text-neutral-500">
                {statusText}
                {/* shows the status and if someones online on top, active or offline  */}
            </div>
            </div>
        </div>
        <HiEllipsisHorizontal

        // this creates an option button on the top right side. It opens a profile drawer. This is on both mobile and desktop
            size={32}
            onClick={() => {setDrawerOpen(true)} }
            className="
            text-sky-500
            cursor-pointer
            hover:text-sky-600
            transition
            "
        />
        </div>
        </>
    );
}
 
export default Header;