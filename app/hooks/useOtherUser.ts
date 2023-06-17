import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (conversation: FullConversationType | { 
    users: User[] 
}) => {
  const session = useSession();
// this will get our session
  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;
            // get our own users email and then filter and find other user below
    const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail);
            // this will get and return our other user from our session. 
    return otherUser[0];
    // gets a single user which is what we need. 
  }, [session.data?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;