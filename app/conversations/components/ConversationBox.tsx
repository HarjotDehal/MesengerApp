'use client'





import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
// import AvatarGroup from "@/app/components/AvatarGroup";
import { FullConversationType } from "@/app/types";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationBoxProps {
  data: FullConversationType,
    // newly created which holds our convo. selected shows we are currently looking at this conversation. 
  selected?: boolean;
}

        const ConversationBox: React.FC<ConversationBoxProps> = ({ 
        data, 
        selected 
        }) => {

            // we must be sure which user point of view we are viewing the conversation from. 
        const otherUser = useOtherUser(data);
        // gets the other user. 
        const session = useSession();
        const router = useRouter();

        const handleClick = useCallback(() => {
            // this pushes to a unique conversation page. 
            router.push(`/conversations/${data.id}`);
        }, [data, router]);
            // change to data.id if needed
        const lastMessage = useMemo(() => {
            const messages = data.messages || [];
                    // gets our last message. 
            return messages[messages.length - 1];
        }, [data.messages]);

        const userEmail = useMemo(() => session.data?.user?.email,
        [session.data?.user?.email]);
            // our email

        const hasSeen = useMemo(() => {
            if (!lastMessage) {
            return false;
            }
                    // first check if there even exists an last message
            const seenArray = lastMessage.seen || [];
                    // we have [] in case lastmessage.seen doesnt work,
            if (!userEmail) {
            return false;
            }

            return seenArray
            .filter((user) => user.email === userEmail).length !== 0;
        }, [userEmail, lastMessage]);
            // this makes sure the seen array only finds the user who is currently logged in and people whove seen


        const lastMessageText = useMemo(() => {
            if (lastMessage?.image) {
            return 'Sent an image';
            }
            // we use this as we cant show the image on the multiple chat page. Otherwise we do following

            if (lastMessage?.body) {
            return lastMessage?.body
            }

            return 'Started a conversation';
        }, [lastMessage]);

        return ( 
            <div id='box'
            onClick={handleClick}
            className={clsx(`
                w-full 
                relative 
                flex 
                items-center    
                space-x-3 
                p-3 
                hover:bg-gray-300
                rounded-lg
                transition
                cursor-pointer
                
                `,
                selected ? 'bg-gray-300' : null
                // our conversation list edits based on if clicked
            )}
            >
          {/* create dynamic render where it has multiple for group chats */}

                {data.isGroup? (
                            <AvatarGroup users={data.users} />
                ):(
                <Avatar user={otherUser} />)}
                {/* // shows picture of singular person who we are messaging.  */}
            
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />

                <div className="flex justify-between items-center mb-1">
                    {/*  */}

                    <p id="pan" className="text-md font-medium text-green-500">
                    {data.name || otherUser.name}
                        {/* data.name is our groupchat name, and otheruser is the singular users name.  */}
                    </p>
                    {lastMessage?.createdAt && (
                    <p 
                    // this checks if we have a last message and lightly displays it
                        className="
                        text-xs 
                        text-gray-500 
                        font-light
                        "
                    >
                        {format(new Date(lastMessage.createdAt), 'p')}
                        {/* if there is a last message, we show a little mark of how long ago the last message was sent. */}
                    </p>
                    )}
                </div>
                <p 
                    className={clsx(`
                    people
                    truncate 
                    text-sm
                    `,
                    hasSeen ? 'text-gray-500' : 'text-black font-medium'
                    )}>
                        {/* shows last message, or that a new conversation or sent a image.  */}
                    {lastMessageText}
                    </p>
                </div>
            </div>
            </div>
        );
}
 
export default ConversationBox;