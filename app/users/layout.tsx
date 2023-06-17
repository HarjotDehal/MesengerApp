
import getUsers from '../actions/getUsers';
import Sidebar from '../components/sidebar/Sidebar'
import UserList from './components/UserList';
export default async function UsersLayout({

// we have made a common layout for all of our users. 
// async as it will fetch users from the database

    children
}:{
    children:React.ReactNode;
}){

    const users= await getUsers();
    // can use this and do not need an api call. 


    return(
        // @ts-expect-error Server Component 
<Sidebar>
    {/* this gets rid of our error.  */}
        <div className="h-full"> 

            <UserList items={users}/>
            {/* now make a user list of the contacts.  */}
            {children}
        </div>
        </Sidebar>
    )
}