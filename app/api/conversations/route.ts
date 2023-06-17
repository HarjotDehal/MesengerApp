import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
// import { pusherServer } from "@/app/libs/pusher";

export async function POST(
  request: Request,
) {
    // only create new conversations when we have to. 
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const {
      userId,
      isGroup,
      members,
      name
    } = body;
    // this is so that we are able to handle groupchats. Therefore we must have members of it. 

        if (!currentUser?.id || !currentUser?.email) {
        return new NextResponse('Unauthorized', { status: 401 });
      }
    //   this checks whether it is a current user or not. 

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse('Invalid data', { status: 400 });
    }
        // this checks whether it is a group but does not fulfull requirements of it. It must have 2+ members. 




            if (isGroup) {
            const newConversation = await prisma.conversation.create({
            //  Since it is a valid group, we now create it. 
             
                data: {
                name,
                isGroup,
                users: {
                    connect: [
                    ...members.map((member: { value: string }) => ({  
                        // we connect the users using prisma 
                        id: member.value 
                        // use id to connect the users. 
                    })),
                    {
                        // we connect our currentuser to the members defined above. We cant do it at once.  
                        id: currentUser.id
                    }
                    ]
                }
                },
                include: {
                users: true,
                // if you want to show the user, define it as true. 
                }
            });

    //    // Update all connections with new conversation. For a new user, create new convo
      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, 'conversation:new', newConversation);
        }
      });

      return NextResponse.json(newConversation);
    }

    const existingConversations = await prisma.conversation.findMany({
    // use find many as our query requires it. Get an array and extract from it. It finds existing convos of our user. 
        where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId]
            }
          },
          {
            userIds: {
              equals: [userId, currentUser.id]
            }
          }
        ]
      }
    });

    const singleConversation = existingConversations[0];
// this gets our only required existing convo. we return it below
    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    // we create new if there is no existing convo above
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id
            },
            {
              id: userId
            }
          ]
        }
      },
      include: {
        users: true
      }
    });

    // // Update all connections with new conversation
    newConversation.users.map((user) => {
      // add convo to associated email
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:new', newConversation);
      }
    });

    return NextResponse.json(newConversation)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}