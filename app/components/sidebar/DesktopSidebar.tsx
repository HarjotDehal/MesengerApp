
'use client'

import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";




interface DesktopSidebarProps{
    currentUser:User
    // from our prisma.
}


const DesktopSidebar: React.FC<DesktopSidebarProps>= ({
    currentUser
}) => {


    
    const routes = useRoutes();
    const [isOpen,setIsOpen] = useState(false);


    // console.log({currentUser});
    
    //  use this for our model. opening a chat
    return ( 
    
    <>

    <SettingsModal 
    currentUser={currentUser}
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    />
    
    
        <div id="loads" className="
        hidden 
        lg:fixed 
        lg:inset-y-0 
        lg:left-0 
        lg:z-40 
        lg:w-20 
        xl:px-6
        lg:overflow-y-auto 
      lg:bg-green-500
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
      ">

        <nav className="mt-4 flex flex-col justify-between">

<ul role="list" className="flex flex-col items-center space-y-1">

{routes.map((item) => (
    <DesktopItem
    key={item.label}
    href={item.href}
    label={item.label}
    icon={item.icon}
    active={item.active? true : false}
    onClick={item.onClick}/>
))}

{/* change active = back to just item.active */}



</ul>

        </nav>

        <nav className="mt-4 flex flex-col justify-between items-center">

            <div 
            onClick={() =>setIsOpen(true)}
            className="
            cursor-pointer
            hover:opacity-75
            transition    
            "
            >
                <Avatar user={currentUser}/>
{/* shows up at bottom left. its our profile  */}

            </div>
        </nav>



    </div> 
    
    
    </>
    );
}
 
export default DesktopSidebar;