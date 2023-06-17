import {useParams} from 'next/navigation'
import { useMemo } from 'react'




const useConversation=() =>{

const params=useParams();

const conversationId = useMemo(() =>{

    if(!params?.conversationId){
        return "";
    }

        return params.conversationId as string;
},[params?.conversationId]);

    const isOpen = useMemo(() => !!conversationId,[conversationId])
    // use 2 exclamation points to turn it into a boolean

    return useMemo(() =>({
        isOpen,
        conversationId
    }), [isOpen, conversationId]);
};

export default useConversation;