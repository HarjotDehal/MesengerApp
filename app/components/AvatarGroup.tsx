'use client'


import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
  users?: User[];
};

        const AvatarGroup: React.FC<AvatarGroupProps> = ({ 
        users = [] 
        }) => {
        const slicedUsers = users.slice(0, 3);
        //   just pick the first 3 users from our group. 
        const positionMap = {
            0: 'top-0 left-[12px]',
            1: 'bottom-0',
            2: 'bottom-0 right-0'
        }
        // this positions each of the 3 avatars

    return (
        <div className="relative h-11 w-11">


        {slicedUsers.map((user, index) => (


            <div 
            key={user.id} 
            className={`
                absolute
                inline-block 
                rounded-full 
                overflow-hidden
                h-[21px]
                w-[21px]
                ${positionMap[index as keyof typeof positionMap]}
            `}>
                    {/* this looks at index and assigns it position map index above so it has corresp styles */}

                        {/* puts the image there on left side */}
                <Image
                fill
                src={user?.image || '/images/placeholder.jpg'}
                alt="Avatar"
                />
                </div>
            ))}
            </div>
            );
        }

export default AvatarGroup;