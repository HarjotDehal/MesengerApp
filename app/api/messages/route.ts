import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from '@/app/libs/pusher'
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request,
    ) {
    try {
         const currentUser = await getCurrentUser();
            const body = await request.json();
             const {
            message,
            image,
            conversationId
            } = body;
            // we deconstruct this stuff as we need it

    if (!currentUser?.id || !currentUser?.email) {

        // basically if we are logged out, we do this
      return new NextResponse('Unauthorized', { status: 401 });
    }

        const newMessage = await prisma.message.create({

            // we create our new message with the following. Some properties are required and some not. 
        include: {
            seen: true,
                sender: true
            },
            data: {
                body: message,
                image: image,
                conversation: {
                connect: { id: conversationId }
                },
                sender: {
                connect: { id: currentUser.id }
                // we connect to our sender with our connect
                },
                seen: {
                connect: {
                id: currentUser.id
                // whoever sent the message has seen it already immediately. 
            }
            },
        }
        });

    
    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id
          }
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true
          }
        }
      }
    });
        // this will allow our real time conversations
    await pusherServer.trigger(conversationId, 'messages:new', newMessage);
            // adds new message in real time
    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

    // gets last message and updates it


    // this updates the message on the sidebar. also required. It does it for all members involved
    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, 'conversation:update', {
        id: conversationId,
        messages: [lastMessage]
      });
    });

    return NextResponse.json(newMessage)
  } catch (error) {



    console.log(error, 'ERROR_MESSAGES')
// use this error message so that we know where our error is coming from. 

    return new NextResponse('Error', { status: 500 });
  }
}