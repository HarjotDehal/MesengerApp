import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
    // if there is no current session with a user then return nothing. 
  }

  try {

    // try returning messages, we will return all but ourselves as we dont want to include the self user itself in the conversation list. 

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
        // this is ordering users by newest. 
      },
      where: {
        NOT: {
          email: session.user.email
        }
      }
    });

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;