'use client'

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";


const MobileFooter = () => {

    const routes = useRoutes();
    const {isOpen} = useConversation();
    // we want to extract open conversation. . 


    if(isOpen){
        return null;

        // we want mobile users to either have all contacts show or 1 chat screen. 
    }


    return (
        
        
       <div className="
       fixed 
       justify-between
       w-full bottom-0
       z-40
       flex items-center
       bg-white
       border-t-[1px]
       lg:hidden
       ">

{routes.map((route) => (
    // render mobile icon similar to how we did desktop item
   <MobileItem
    key={route.href}
    href={route.href}
    active={route.active}
    icon={route.icon}
    onClick={route.onClick}/>
))}


       </div>
        
        
        
        
        );
}
 
export default MobileFooter;