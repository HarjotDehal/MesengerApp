import { NextResponse } from "next/server";

    import getCurrentUser from "@/app/actions/getCurrentUser";
    import prisma from "@/app/libs/prismadb";

        export async function POST(
        request: Request,


        ) {
        try {
            const currentUser = await getCurrentUser();
                    // gets our user and then our message body
            const body = await request.json();
            const {

                // gets our user name and user image
            name,
            image,
            } = body;

            if (!currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
            }

            const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {

                // this updates our profile data
                image: image,
                name: name
            },
            });


                    // this displays our new user and if an error shows an error described below
            return NextResponse.json(updatedUser)
        } catch (error) {
            console.log(error, 'ERROR_MESSAGES')
            return new NextResponse('Error', { status: 500 });
        }
        }