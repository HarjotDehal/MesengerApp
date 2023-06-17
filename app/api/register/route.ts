import bcrypt from 'bcrypt'

import prisma from '@/app/libs/prismadb'

import {NextResponse} from 'next/server'
import { log } from 'console';


export async function POST(

    request: Request
    // built into next
){

    try{
    const body = await request.json();
    const{
        email,
        name,
        password
    } = body



    if(!email || !name || !password){
        // this makes sure the user gives all the info required. 
        return new NextResponse('Missing info',{status:400})
    }

    // never store plain text passwords so encrypt. 
    const hashedPassword = await bcrypt.hash(password,12);

    const user = await prisma.user.create({
        data:{
            email,
            name,
            hashedPassword
        }
    });

    return NextResponse.json(user);}


        catch(error:any){
console.log(error, 'registration error');
            return new NextResponse('Internal Error',{status:500});
            // must say new cuz its not a json. 
        }
}