// this will be our page for a conversation



import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";

// import Header from "./components/Header";
// import Body from "./components/Body";
// import Form from "./components/Form";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import Mode from './components/Mode'
interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
//   we get these 2 from our action files. Have to await as we wait for them from database
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    // if no conversations, then we return a div which has the empty state
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }

  return ( 
    <div id="main" className="lg:pl-80 h-full ">

    <Mode />

      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
{/* this will show our other users name at the top among other things.  */}

        <Body initialMessages={messages} />
        {/* this dynamically adds every message once we incorporate pusher */}
        <Form />
        {/* Conversation ID! */}
      </div>
    </div>
  );
}

export default ConversationId;