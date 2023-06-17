
import { useEffect, useState } from "react";
import useActiveList from "./useActiveList";
import {Channel, Members} from 'pusher-js'
import { pusherClient } from "../libs/pusher";

const useActiveChannel =()=>{

// destruct from our store. 
const {set,add,remove} = useActiveList();

const[activeChannel, setActiveChannel] = useState<Channel | null>(null);


useEffect(() => {
    let channel = activeChannel;
                    // get our channel, have to name it a presence channel
    if (!channel) {
      channel = pusherClient.subscribe('presence-messenger');
      setActiveChannel(channel);
    }

        // 
    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) => initialMembers.push(member.id));

    //   members is not a normal array
      set(initialMembers);
    });
            // member id, we save it in our auth.ts. It is an email
    channel.bind("pusher:member_added", (member: Record<string, any>) => {

        // adds our member to the channel
      add(member.id)
    });

    channel.bind("pusher:member_removed", (member: Record<string, any>) => {

      remove(member.id);
        });

        return () => {
        if (activeChannel) {
            pusherClient.unsubscribe('presence-messenger');
            setActiveChannel(null);
        }
        }
    }, [activeChannel, set, add, remove]);
    }

    export default useActiveChannel;