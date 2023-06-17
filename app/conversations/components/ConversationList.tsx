'use client';

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from 'react-icons/md';
import clsx from "clsx";
import { find, uniq } from 'lodash';

import useConversation from "@/app/hooks/useConversation";
// import { pusherClient } from "@/app/libs/pusher";
// import GroupChatModal from "@/app/components/modals/GroupChatModal";
import ConversationBox from "./ConversationBox";
import { FullConversationType } from "@/app/types";
import GroupChatModal from "./GroupChatModal";
import { pusherClient } from "@/app/libs/pusher";

interface ConversationListProps {
  initialItems: FullConversationType[];
//   fullconvo type uses normal convo and gets seen and sender information
  users: User[];
  title?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  initialItems, 
  users
}) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {

    // gets the email of the user we need
    return session.data?.user?.email
  }, [session.data?.user?.email])

  useEffect(() => {
    if (!pusherKey) {

      // if session is not loaded then return
      return;
    }

    pusherClient.subscribe(pusherKey);
        // our email is pushed as that is used to trigger updates for convo list
    
    
        const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {

        // get current conversation from pusher and get its id. set messages then to our updated message. 
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages
          };
        }

        return currentConversation;
      }));
    }

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {

        // if current convo in our array, return our current
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current]
      });
    }
          // gets rid of our conversation from message screen in real time. return ones not equal
    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)]
      });
      if(conversationId===conversation.id){
        router.push('/conversations')
      }
    }

    pusherClient.bind('conversation:update', updateHandler)
    pusherClient.bind('conversation:new', newHandler)
    pusherClient.bind('conversation:remove', removeHandler)



    return () =>{

      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new',newHandler);
      pusherClient.unbind('conversation:update',updateHandler);
      pusherClient.unbind('conversation:remove',removeHandler);
    }
  }, [pusherKey, router, conversationId]);

  return (
    <>
      <GroupChatModal 
        users={users} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
          <aside className={clsx(`
            fixed 
            inset-y-0 
            pb-20
            lg:pb-0
            lg:left-20 
            lg:w-80 
            lg:block
            overflow-y-auto 
            border-r 
            border-gray-200 
          `, isOpen ? 'hidden' : 'block w-full left-0')}>
            <div className="px-5">
              <div className="flex justify-between mb-4 pt-4">
                <div className="text-2xl font-bold text-green-500">
                  Messages
                </div>
                <div 
                  onClick={() => setIsModalOpen(true)} 
                  className="
                    rounded-full 
                    p-2 
                    bg-gray-100 
                    text-gray-600 
                    cursor-pointer 
                    hover:opacity-75 
                    transition
                  "
                >
                  <MdOutlineGroupAdd size={20} />

                  {/* add message icon */}
                </div>
              </div>
              {items.map((item) => (
                <ConversationBox
                  key={item.id}
                  data={item}
                  selected={conversationId === item.id}
                />
              ))}
            </div>
          </aside>
    </>
   );
}
 
export default ConversationList;