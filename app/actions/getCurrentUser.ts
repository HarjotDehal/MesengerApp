import prisma from "@/app/libs/prismadb";



import getSession from "./getSession";
// we import get session so we dont have to redefine it multiple times. 
const getCurrentUser = async () => {
// async as it goes to the database and finds the current user. 

    try {
    const session = await getSession();

    if (!session?.user?.email) {
        // there is no active session using this email. 
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }

//   server action, not api route so it doesnt break the app
};

export default getCurrentUser;

// make sure to return the current user