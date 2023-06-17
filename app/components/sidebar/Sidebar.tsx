import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

async function Sidebar({children}:{

children:React.ReactNode,


}){

    const currentUser= await getCurrentUser();

    return(

<div className="h-full ">
    
    <DesktopSidebar currentUser={currentUser!}/>
{/* ! allows username to also be null.  */}
    <MobileFooter/>
    {/* create mobile cersion as it doesnt work for small screen. */}
    <main className="lg:pl-20 h-full">
    {children}
    
    </main>
    </div>
        
    )
}


export default Sidebar;