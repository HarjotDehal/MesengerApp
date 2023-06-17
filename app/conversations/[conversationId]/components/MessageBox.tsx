'use client';

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullMessageType } from "@/app/types";

import Avatar from "@/app/components/Avatar";
import ImageModal from "./ImageModal";
// import ImageModal from "./ImageModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ 
  data, 
//   has our data and checks the most recent message
  isLast
}) => {

    // gets our current conversation session
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);


  const isOwn = session.data?.user?.email === data?.sender?.email
// determines whether its our own or other users message. checks our versus sender email

  const seenList = (data.seen || [])
        // use [] to protect in bad cases

//   gets everyone who has seen the message. In case its a group, we join the members whove seen by a ,
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(', ');

  const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');
            // has conditional attributes. if its own message then justify on end. 

  const avatar = clsx(isOwn && 'order-2');

    const body = clsx('flex flex-col gap-2', isOwn && 'items-end');
        const message = clsx(
            'text-sm w-fit overflow-hidden', 
            isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100', 

            // we change text color depending on if its our message or not
            data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
        );

  return ( 
            <div className={container}>

        <div className={avatar}>
            {/* has the senders avatar, put it next to the message.  */}
            <Avatar user={data.sender} />
        </div>
        <div className={body}>
            <div className="flex items-center gap-1">
                
            <div className="text-sm text-green-500  ">
                {data.sender.name}
                            {/* has persons name next to message */}
            </div>
            <div className="text-xs text-gray-400">
                {format(new Date(data.createdAt), 'p')}
                                {/* puts date of when the message is created as desired */}
                
            </div>
            </div>
        <div className={message}>
            {/* this displays our message where weve sent it.  */}
          <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />
          

          {/* image modal. If we click on the image then it opens it up. We can close easily also. */}
          {data.image ? (
            <Image
            // this renders images which weve sent. If our message is an image then only send that and move on to next when needed
             // hovering zooms in on our picture
            //  this works on both desktop and phone
            alt="Image"
              height="288"
              width="288"
              onClick={() => setImageModalOpen(true)} 
              src={data.image} 
              className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
                // this shows whether someone has seen it
            <div 
            className="
            text-xs 
            font-light 
            text-gray-500
            "
          >
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
   );
}
 
export default MessageBox;