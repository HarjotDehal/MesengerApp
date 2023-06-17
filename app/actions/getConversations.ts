import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";



const getConversations = async () => {
  const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];

        // return empty array if no current user. 
    }

        try {

            // find conversations by newest.
            const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc',
            },
            where: {
                userIds: {
                has: currentUser.id
                }
                // this has single and group chats together as desired. 
            },
            include: {
                users: true,
                messages: {
                include: {
                    sender: true,
                    seen: true,
                    // include the sender and seen of the messages. Seen includes people whove seen the message. 
                }
                },
            }
            });

            return conversations;
        } catch (error: any) {
            return [];
        }
        };

        export default getConversations;