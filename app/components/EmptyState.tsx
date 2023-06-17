import Mode from "../conversations/[conversationId]/components/Mode";

const EmptyState = () => {

    return ( 
    
    // empty screen area, light/dark
    
<div id="emp" className="
px-4
py-10
sm:px-6
lg:px-8
lg:py-6
h-full
flex
justify-center
items-center
bg-gray-100">

{/* this creates our two different colors for chat and different contacts essentially */}


<Mode />


<div className="text-center items-center flex flex-col">
    <h3 id="empty"
    className="mt-2
    text-2xl
    font-semibold
    text-gray-900">Select a chat or start a new conversation</h3>
</div>

</div>    
    
    
    
    
    
    
    );
}
 
export default EmptyState;