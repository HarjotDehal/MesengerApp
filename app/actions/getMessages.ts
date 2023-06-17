import prisma from "@/app/libs/prismadb";

const getMessages = async (
  conversationId: string

//   this uses our same convo id. 
) => {
  try {
    const messages = await prisma.message.findMany({

        // we will want to return our messages array. We return all of them and not just one like in ids. 
      where: {
        conversationId: conversationId
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc'
        // we order our messages so that newest messages are at the bottom
      }
    });

    return messages;
  } catch (error: any) {
    return [];
  }
};

export default getMessages;