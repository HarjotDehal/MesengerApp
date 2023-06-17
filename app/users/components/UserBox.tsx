
"use client"

import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {  User } from "@prisma/client";

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
// import LoadingModal from "@/app/components/modals/LoadingModal";

interface UserBoxProps {
  data: User
}

const UserBox: React.FC<UserBoxProps> = ({ 
  data
}) => {

    const router = useRouter();
    const[isLoading, setIsLoading] = useState(false);


    const handleClick = useCallback(() =>{

        setIsLoading(true);

        axios.post('/api/conversations',{userId: data.id})
                // initialize a axios post url which allows the conversation to have an id. 
        .then((data) =>{
            router.push(`/conversations/${data.data.id}`)
        })
        .finally(() =>setIsLoading(false));
    },[data,router])

    return (
    
    <>
{   isLoading &&( <LoadingModal/>
)}

    {/* this gives a active loading modal which covers blurs the screen till dynamically rendered */}
            {/* use isloading feature */}

    <div  
        onClick={handleClick}
        
        className=" username w-full relative flex items-center space-x-3  p-3 hover:bg-gray-300 rounded-lg transition cursor-pointer"
>           
{/* allows a click and then user sends data.  */}
        <Avatar user={data}/>
{/* this puts the persons avatar in the people area.  */}
        <div className="min-w-0 flex-1">

                <div className="focus:outline-none">
                            <div className="flex justify-between itsems-center mb-1">
                                
                                <p  className=" people text-sm font-medium text-gray-900"> {data.name} </p>
                                        {/* this puts the name of the user we are talking to.  */}
                            </div>

                </div>
        </div>
    </div> 
    
    
    </>
    );
}
 
export default UserBox;