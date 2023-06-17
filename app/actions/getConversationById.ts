import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

        const getConversationById = async (

            // we have to wait to recieve our convo id. 
        conversationId: string
        ) => {
        try {
            const currentUser = await getCurrentUser();

            if (!currentUser?.email) {
                // no current user means no conversation exported. its just to keep application safe
            return null;
            }
        
            const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true,
            },
            });

            return conversation;
        } catch (error: any) {
            console.log(error, 'SERVER_ERROR')
            return null;
        }
        };

        export default getConversationById;