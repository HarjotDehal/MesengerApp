'use client';

import axios from "axios";
import { useEffect, useRef, useState } from "react";

// import { pusherClient } from "@/app/libs/pusher";
import useConversation from "@/app/hooks/useConversation";
// import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import { find } from "lodash";
import MessageBox from "./MessageBox";
import { pusherClient } from "@/app/libs/pusher";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ 
    initialMessages = [] 

}) => {

    const [messages, setMessages] = useState(initialMessages);

  const bottomRef = useRef<HTMLDivElement>(null);
  
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
    // whenever we load our conversation, we tell the program that weve seen all the messages.
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId)

    // this connects our pusher client to our conversation as needed


// this scrolls the message screen lower to the latest message
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

            // this marks the message as seen, changes it on the screen and scrolls if needed
      setMessages((current) => {
        // from lodash, make sure we do not post a duplicate message
        if (find(current, { id: message.id })) {
          return current;
        }
              // if no more new messages, then we spread our array of messages 
        return [...current, message]
      });
      
      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
          // updating our current message to the new newmessage. 
            // if they are not equal then return current
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }
  
        return currentMessage;
      }))
    };
  

    pusherClient.bind('messages:new', messageHandler)

    // always bind and unbind so that there is not an overflow. We unbind below

    // this is for our seen element
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId)
      // have to pass message handler when unbinding also. 
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationId]);

  return ( 
    <div  className="flex-1 overflow-y-auto">

      
      {messages.map((message, i) => (
        <MessageBox 

        // this sends our messages to our message box
          isLast={i === messages.length - 1} 
          key={message.id} 
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
     </div>


  );
}


 
export default Body;