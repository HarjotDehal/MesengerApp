import { getServerSession } from "next-auth";


import { authOptions } from "../api/auth/[...nextauth]/route";
// this is our credentials and their secrets 

// This is essentially one server session. 
export default async function getSession(){

    return await getServerSession(authOptions);
}
